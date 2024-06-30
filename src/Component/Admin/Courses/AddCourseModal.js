import React, {useState} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import axios from 'axios';

const AddCourseModal = ({show, handleClose, onCourseAdded, users}) => {
    const [course, setCourse] = useState({
        name: '',
        title: '',
        description: '',
        userId: '',
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setCourse({...course, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        axios.post('http://localhost:8080/admin/courses/create', course, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                onCourseAdded(response.data);
                handleClose();
                setCourse({
                    name: '',
                    title: '',
                    description: '',
                    userId: '',
                });
            })
            .catch(error => {
                console.error('There was an error creating the course!', error);
            });
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Add Course</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={course.name}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={course.title}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="description"
                            value={course.description}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formUserId">
                        <Form.Label>User</Form.Label>
                        <Form.Control
                            as="select"
                            name="userId"
                            value={course.userId}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>Select a user</option>
                            {users.map(user => (
                                <option key={user.id} value={user.id}>{user.name}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Add Course
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddCourseModal;