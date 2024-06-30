import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '@fortawesome/fontawesome-free/css/all.min.css';

const CourseCard = ({course, onDelete, onEdit, users}) => {

    const [showViewModal, setShowViewModal] = useState(false);



    const openViewModal = () => {
        setShowViewModal(true);
    };

    return (
        <div className="card border-primary mb-3">
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{course.name}</h5>
                <hr/>
                <h6 className="card-subtitle mb-2 text-muted">{course.title}</h6>
                <div className="mt-2">
                    <button className="btn btn-info mr-2" onClick={openViewModal}>
                        <i className="fas fa-eye"></i>
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