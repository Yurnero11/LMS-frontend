import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const AddUserModal = ({ onClose, onAddUser }) => {
    const [user, setUser] = useState({
        name: '',
        lastName: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddUser(user);
    };

    return (
        <Modal show={true} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" className="form-control" id="name" name="name" value={user.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name:</label>
                        <input type="text" className="form-control" id="lastName" name="lastName" value={user.lastName} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" className="form-control" id="email" name="email" value={user.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" className="form-control" id="password" name="password" value={user.password} onChange={handleChange} required />
                    </div>
                    <br/>
                    <Button variant="secondary" className="md-2" onClick={onClose}>Cancel</Button>
                    <Button variant="primary" className="mx-2" type="submit">Add</Button>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default AddUserModal;