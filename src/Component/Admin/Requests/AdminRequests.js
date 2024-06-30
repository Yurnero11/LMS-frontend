import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';

import './Requests.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import Pagination from "react-bootstrap/Pagination";

const AdminRequests = () => {
    const [requests, setRequests] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [users, setUsers] = useState({});
    const [courses, setCourses] = useState({});
    const [usersLoaded, setUsersLoaded] = useState(false);
    const [coursesLoaded, setCoursesLoaded] = useState(false);
    const [buttonsClicked, setButtonsClicked] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [requestsPerPage] = useState(10);

    const [searchTerm, setSearchTerm] = useState('');

    const indexOfLastRequest = currentPage * requestsPerPage;
    const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
    const currentRequests = requests.slice(indexOfFirstRequest, indexOfLastRequest);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => {
        fetchRequests();
        fetchUsers();
        fetchCourses();
    }, []);

    const fetchRequests = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://localhost:8080/admin/requests', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const initialButtonsState = {};
            response.data.forEach(request => {
                initialButtonsState[request.id] = {
                    approveClicked: false,
                    rejectClicked: false
                };
            });
            setButtonsClicked(initialButtonsState);
            setRequests(response.data);
        } catch (error) {
            console.error('Error fetching requests', error);
        }
    };

    const fetchUsers = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://localhost:8080/admin/users', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const usersData = {};
            response.data.forEach(user => {
                usersData[user.id] = user;
            });
            setUsers(usersData);
            setUsersLoaded(true);
        } catch (error) {
            console.error('Error fetching users', error);
        }
    };

    const fetchCourses = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://localhost:8080/admin/courses', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const coursesData = {};
            response.data.forEach(course => {
                coursesData[course.id] = course;
            });
            setCourses(coursesData);
            setCoursesLoaded(true);
        } catch (error) {
            console.error('Error fetching courses', error);
        }
    };

    const handleStatusChange = async (id, status) => {
        const token = localStorage.getItem('token');
        try {
            await axios.get(`http://localhost:8080/admin/requests/${id}/${status}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            fetchRequests();
            setButtonsClicked({
                ...buttonsClicked,
                [id]: {
                    ...buttonsClicked[id],
                    [status === 'APPROVED' ? 'approveClicked' : 'rejectClicked']: true
                }
            });
        } catch (error) {
            console.error('Error changing status', error);
        }
    };

    const openModal = (request) => {
        setSelectedRequest(request);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedRequest(null);
    };

    // Check if user and course data are loaded
    if (!usersLoaded || !coursesLoaded) {
        return <div>Loading...</div>;
    }


    const filteredRequests = requests.filter(request => {
        const courseName = courses[request.courseId] ? courses[request.courseId].name.toLowerCase() : '';
        const userName = users[request.userId] ? users[request.userId].name.toLowerCase() : '';
        const status = request.courseBookStatus.toLowerCase();
        const search = searchTerm.toLowerCase();

        return courseName.includes(search) || userName.includes(search) || status.includes(search);
    });

    return (
        <div className="container">
            <h1 className='text-center'>Course Registration Requests</h1>
            <input
                type="text"
                className="form-control my-3"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{maxWidth: '300px'}}
            />
            <hr/>
            <table className='table table-striped table-bordered' style={{ fontSize: '1.0rem' }}>
                <thead>
                <tr>
                    <th scope="col">Course Name</th>
                    <th scope="col">User Name</th>
                    <th scope="col">Status</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {filteredRequests.map(request => (
                    <tr key={request.id}>
                        <td>{courses[request.courseId] ? courses[request.courseId].name : 'Loading...'}</td>
                        <td>{users[request.userId] ? users[request.userId].email : 'Loading...'}</td>
                        <td>{request.courseBookStatus}</td>
                        <td>
                            <Button variant="success" className='mr-2'
                                    onClick={() => handleStatusChange(request.id, 'APPROVED')}
                                    disabled={buttonsClicked[request.id]?.approveClicked}>
                                <FontAwesomeIcon icon={faCheck}/>
                            </Button>
                            <Button variant="danger" className='mr-2'
                                    onClick={() => handleStatusChange(request.id, 'REJECTED')}
                                    disabled={buttonsClicked[request.id]?.rejectClicked}>
                                <FontAwesomeIcon icon={faTimes}/>
                            </Button>
                            <Button variant="info" onClick={() => openModal(request)}>
                                <FontAwesomeIcon icon={faInfoCircle}/>
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <hr/>

            <Pagination className='justify-content-center'>
                {[...Array(Math.ceil(requests.length / requestsPerPage)).keys()].map(number => (
                    <Pagination.Item key={number + 1} active={number + 1 === currentPage}
                                     onClick={() => paginate(number + 1)}>
                        {number + 1}
                    </Pagination.Item>
                ))}
            </Pagination>

            {selectedRequest && (
                <Modal show={showModal} onHide={closeModal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Request Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h5>Course
                            Name: {courses[selectedRequest.courseId] ? courses[selectedRequest.courseId].name : 'Loading...'}</h5>
                        <p><strong>User
                            Name:</strong> {users[selectedRequest.userId] ? users[selectedRequest.userId].email : 'Loading...'}
                        </p>
                        <p><strong>Status:</strong> {selectedRequest.courseBookStatus}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};

export default AdminRequests;