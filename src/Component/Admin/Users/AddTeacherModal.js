import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const AddTeacherModal = ({ onClose, onAddTeacher }) => {
    const [teacher, setTeacher] = useState({
        name: '',
        lastName: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTeacher(prevTeacher => ({
            ...prevTeacher,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddTeacher(teacher);
    };

    return (
        <Modal show={true} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add Teacher</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" className="form-control" id="name" name="name" value={teacher.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name:</label>
                        <input type="text" className="form-control" id="lastName" name="lastName" value={teacher.lastName} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" className="form-control" id="email" name="email" value={teacher.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" className="form-control" id="password" name="password" value={teacher.password} onChange={handleChange} required />
                    </div>
                    <br/>
                    <Button variant="secondary" className="md-2" onClick={onClose}>Cancel</Button>
                    <Button variant="primary" className="mx-2" type="submit">Add</Button>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default AddTeacherModal;