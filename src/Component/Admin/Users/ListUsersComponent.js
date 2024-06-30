import React, { useEffect, useState } from 'react';
import { listUsers, createUser, updateUser, deleteUser, createTeacher } from "../../Services/Admin/UserService";
import AddUserModal from "./AddUserModal";
import UpdateUserModal from "./UpdateUserModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal"; // Импорт нового компонента
import Pagination from 'react-bootstrap/Pagination';
import AddTeacherModal from "./AddTeacherModal";

const ListUsersComponent = () => {
    const [users, setUsers] = useState([]);
    const [showAddUserModal, setShowAddUserModal] = useState(false);
    const [showAddTeacherModal, setShowAddTeacherModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(4);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        listUsers()
            .then((response) => {
                setUsers(response.data);
                setFilteredUsers(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        const filtered = users.filter(user => {
            return user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase());
        });
        setFilteredUsers(filtered);
    }, [users, searchTerm]);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleCloseAddUserModal = () => {
        setShowAddUserModal(false);
    };

    const handleCloseAddTeacherModal = () => {
        setShowAddTeacherModal(false);
    };

    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
        setCurrentUser(null);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setCurrentUser(null);
    };

    const handleAddUser = async (userData) => {
        try {
            await createUser(userData);
            const response = await listUsers();
            setUsers(response.data);
            setShowAddUserModal(false);
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    const handleAddTeacher = async (userData) => {
        try {
            await createTeacher(userData);
            const response = await listUsers();
            setUsers(response.data);
            setShowAddTeacherModal(false);
        } catch (error) {
            console.error('Error adding teacher:', error);
        }
    };

    const handleUpdateUser = async (userData) => {
        try {
            await updateUser(userData);
            const response = await listUsers();
            setUsers(response.data);
            setShowUpdateModal(false);
            setCurrentUser(null);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleDeleteUser = async () => {
        try {
            await deleteUser(currentUser.id);
            const updatedUsers = users.filter(user => user.id !== currentUser.id);
            setUsers(updatedUsers);
            const remainingUsers = updatedUsers.slice(usersPerPage * (currentPage - 1), usersPerPage * currentPage);
            if (remainingUsers.length === 0 && currentPage > 1) {
                setCurrentPage(currentPage - 1);
            }
            setShowDeleteModal(false);
            setCurrentUser(null);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    return (
        <div className='container'>
            <h1 className='text-center'>List users</h1>
            <button className='btn btn-primary md-2' onClick={() => setShowAddUserModal(true)}>Add User</button>
            <button className='btn btn-primary mx-2' onClick={() => setShowAddTeacherModal(true)}>Add Teacher</button>
            <input
                type="text"
                className="form-control my-3"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{maxWidth: '300px'}}
            />
            <hr/>
            <table className='table table-striped table-bordered'>
                <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Last name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                {currentUsers.map(user =>
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.lastName}</td>
                        <td>{user.email}</td>
                        <td>
                            {user.userRole === "USER" ?
                                <span className="badge bg-success">User</span> :
                                user.userRole === "TEACHER" ?
                                    <span className="badge bg-primary">Teacher</span> :
                                    <span className="badge bg-secondary">Unknown</span>
                            }
                        </td>
                        <td>
                            <button className='btn btn-info md-2' onClick={() => {
                                setCurrentUser(user);
                                setShowUpdateModal(true);
                            }}>Update
                            </button>
                            <button className='btn btn-danger mx-2' onClick={() => {
                                setCurrentUser(user);
                                setShowDeleteModal(true);
                            }}>Delete
                            </button>
                        </td>
                    </tr>)
                }
                </tbody>
            </table>
            <hr/>

            <Pagination>
                <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}/>
                {[...Array(Math.ceil(filteredUsers.length / usersPerPage)).keys()].map(number => (
                    <Pagination.Item key={number + 1} onClick={() => paginate(number + 1)}
                                     active={number + 1 === currentPage}>
                        {number + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => paginate(currentPage + 1)}
                                 disabled={currentPage === Math.ceil(filteredUsers.length / usersPerPage)}/>
            </Pagination>

            {showAddUserModal && <AddUserModal onClose={handleCloseAddUserModal} onAddUser={handleAddUser}/>}
            {showAddTeacherModal && <AddTeacherModal onClose={handleCloseAddTeacherModal} onAddTeacher={handleAddTeacher} />}

            {showUpdateModal &&
                <UpdateUserModal user={currentUser} onClose={handleCloseUpdateModal} onUpdateUser={handleUpdateUser}/>}
            {showDeleteModal &&
                <ConfirmDeleteModal show={showDeleteModal} onHide={handleCloseDeleteModal} onConfirm={handleDeleteUser}
                                    userName={currentUser?.name}/>}
        </div>
    );
};

export default ListUsersComponent;