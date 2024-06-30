import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '@fortawesome/fontawesome-free/css/all.min.css';

const CourseCard = ({course, onDelete, onEdit, users}) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [editedCourse, setEditedCourse] = useState({
        name: course.name,
        title: course.title,
        description: course.description,
        userId: course.userId
    });

    const confirmDelete = () => {
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = () => {
        onDelete(course.id);
        setShowDeleteModal(false);
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setEditedCourse({...editedCourse, [name]: value});
    };

    const handleEditConfirm = () => {
        onEdit(course.id, editedCourse);
        setShowEditModal(false);
    };

    const openViewModal = () => {
        setShowViewModal(true);
    };

    return (
        <div className="card border-primary mb-3">
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{course.name}</h5>
                <hr/>
                <h6 className="card-subtitle mb-2 text-muted">{course.title}</h6>
                <hr/>
                <p className="card-text mt-auto"><strong>Teacher:</strong> {course.userName}</p>
                <hr/>
                <div className="mt-2">
                    <button className="btn btn-info mr-2" onClick={openViewModal}>
                        <i className="fas fa-eye"></i>
                    </button>
                    <button className="btn btn-primary mr-2" onClick={() => setShowEditModal(true)}>
                        <i className="fas fa-edit"></i>
                    </button>
                    <button className="btn btn-danger" onClick={confirmDelete}>
                        <i className="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this course?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDeleteConfirm}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Course</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label htmlFor="editName">Name</label>
                            <input type="text" className="form-control" id="editName" name="name"
                                   value={editedCourse.name} onChange={handleChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="editTitle">Title</label>
                            <input type="text" className="form-control" id="editTitle" name="title"
                                   value={editedCourse.title} onChange={handleChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="editDescription">Description</label>
                            <textarea className="form-control" id="editDescription" name="description"
                                      value={editedCourse.description} onChange={handleChange}></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="editTeacher">Teacher</label>
                            <select className="form-control" id="editTeacher" name="userId" value={editedCourse.userId}
                                    onChange={handleChange}>
                                <option value="" disabled>Select a teacher</option>
                                {users.map(user => (
                                    <option key={user.id} value={user.id}>{user.name}</option>
                                ))}
                            </select>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleEditConfirm}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
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
        </div>
    );
};

export default CourseCard;