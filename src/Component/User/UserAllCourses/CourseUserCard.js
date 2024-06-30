import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';

const CourseCard = ({ course, isRegistered }) => {
    const [showViewModal, setShowViewModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const openViewModal = () => {
        setShowViewModal(true);
    };

    const openConfirmModal = () => {
        setShowConfirmModal(true);
    };

    const handleConfirmRegister = async () => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        if (!userId) {
            alert('User ID not found in localStorage');
            return;
        }

        const bookCourseDto = {
            courseId: course.id,
            userId: parseInt(userId)
        };

        try {
            const response = await axios.post('http://localhost:8080/user/courses/book', bookCourseDto, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status === 201) {
                alert('Registration request sent successfully.');
            }
        } catch (error) {
            console.error('There was an error registering for the course!', error);
            alert('There was an error registering for the course!');
        } finally {
            setShowConfirmModal(false);
        }
    };

    return (
        <div className="card border-primary mb-3">
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{course.name}</h5>
                <hr />
                <h6 className="card-subtitle mb-2 text-muted">{course.title}</h6>
                <hr />
                <p className="card-text mt-auto"><strong>Teacher:</strong> {course.userName}</p>
                <hr />
                <div className="mt-2">
                    <button className="btn btn-info mr-2" onClick={openViewModal}>
                        <i className="fas fa-eye"></i>
                    </button>
                    <button
                        className="btn btn-primary mr-2"
                        onClick={openConfirmModal}
                        disabled={isRegistered}
                    >
                        <i className="fas fa-registered"></i>
                    </button>
                </div>
            </div>

            <Modal show={showViewModal} onHide={() => setShowViewModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Course Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>{course.name}</h5>
                    <p><strong>Title:</strong> {course.title}</p>
                    <p><strong>Description:</strong> {course.description}</p>
                    <p><strong>Teacher:</strong> {course.userName}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowViewModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Registration</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to register for the course "{course.name}"?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleConfirmRegister}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CourseCard;