import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const UpdateUserModal = ({ user, onClose, onUpdateUser }) => {
    const [updatedUser, setUpdatedUser] = useState({ ...user });
    const [password, setPassword] = useState('');

    useEffect(() => {
        setUpdatedUser({ ...user });
        setPassword('');
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUser(prevUser => ({ ...prevUser, [name]: value }));
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const userToUpdate = { ...updatedUser };
        if (password) {
            userToUpdate.password = password;
        }
        onUpdateUser(userToUpdate);
    };

    return (
        <Modal show={true} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Update User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" className="form-control" id="name" name="name" value={updatedUser.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name:</label>
                        <input type="text" className="form-control" id="lastName" name="lastName" value={updatedUser.lastName} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" className="form-control" id="email" name="email" value={updatedUser.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" className="form-control" id="password" name="password" value={password} onChange={handlePasswordChange} />
                    </div>
                    <br/>
                    <Button variant="secondary" className="md-2" onClick={onClose}>Cancel</Button>
                    <Button variant="primary" className="mx-2" type="submit">Update</Button>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default UpdateUserModal;