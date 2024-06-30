import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CourseCard from './CourseCard';
import AddCourseModal from './AddCourseModal';

const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const cardsPerPage = 12;

    const REST_API_BASE_URL = 'http://localhost:8080/admin/courses';
    const USERS_API_URL = 'http://localhost:8080/admin/users/teachers';

    useEffect(() => {
        const token = localStorage.getItem('token');

        axios.get(REST_API_BASE_URL, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setCourses(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the courses!', error);
            });

        axios.get(USERS_API_URL, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the users!', error);
            });
    }, []);

    const handleDelete = (id) => {
        const token = localStorage.getItem('token');
        axios.delete(`${REST_API_BASE_URL}/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(() => {
                const updatedCourses = courses.filter(course => course.id !== id);
                setCourses(updatedCourses);
                const lastPage = Math.ceil(updatedCourses.length / cardsPerPage);
                if (currentPage > lastPage) {
                    setCurrentPage(lastPage);
                }
            })
            .catch(error => {
                console.error('There was an error deleting the course!', error);
            });
    };

    const handleEdit = (id, editedCourse) => {
        const token = localStorage.getItem('token');
        axios.put(`${REST_API_BASE_URL}/${id}`, editedCourse, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                const updatedCourses = courses.map(course => (course.id === id ? response.data : course));
                setCourses(updatedCourses);
            })
            .catch(error => {
                console.error('There was an error updating the course!', error);
            });
    };

    const handleAddCourse = (course) => {
        setCourses([...courses, course]);
    };

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = courses.slice(indexOfFirstCard, indexOfLastCard);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container">
            <h1 className='text-center'>Courses</h1>
            <button onClick={() => setShowModal(true)} className='btn btn-primary md-2'>Add Course</button>
            <hr />
            <div className="row">
                {currentCards.map(course => (
                    <div className="col-md-2 mb-4 d-flex" key={course.id}>
                        <CourseCard
                            course={course}
                            onDelete={handleDelete}
                            onEdit={handleEdit}
                            users={users}
                        />
                    </div>
                ))}
            </div>
            <hr />
            <nav>
                <ul className="pagination justify-content-center">
                    {[...Array(Math.ceil(courses.length / cardsPerPage)).keys()].map(number => (
                        <li key={number + 1} className={`page-item ${number + 1 === currentPage ? 'active' : ''}`}>
                            <button onClick={() => paginate(number + 1)} className="page-link">{number + 1}</button>
                        </li>
                    ))}
                </ul>
            </nav>
            <AddCourseModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                onCourseAdded={handleAddCourse}
                users={users}
            />
        </div>
    );
};

export default CourseList;