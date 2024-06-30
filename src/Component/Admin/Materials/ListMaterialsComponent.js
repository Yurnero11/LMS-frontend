import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';

const MaterialListComponent = () => {
    const [materials, setMaterials] = useState([]);
    const [newMaterialName, setNewMaterialName] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [courseId, setCourseId] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [courses, setCourses] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [viewMaterial, setViewMaterial] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [materialToDelete, setMaterialToDelete] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [materialsPerPage] = useState(5); // Number of materials per page

    useEffect(() => {
        fetchMaterials();
        fetchCourses();
    }, []);

    const REST_API_BASE_URL = 'http://localhost:8080/admin/materials';

    const fetchMaterials = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(REST_API_BASE_URL, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setMaterials(response.data);
        } catch (error) {
            console.error('Failed to fetch materials:', error);
        }
    };

    const fetchCourses = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8080/admin/courses', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setCourses(response.data);
        } catch (error) {
            console.error('Failed to fetch courses:', error);
        }
    };

    const uploadMaterial = async () => {
        const formData = new FormData();
        formData.append('name', newMaterialName);
        formData.append('file', selectedFile);
        formData.append('courseId', courseId);

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(REST_API_BASE_URL + '/upload', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Material uploaded successfully:', response.data);
            setErrorMessage('');
            fetchMaterials();
            setShowModal(false);
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setErrorMessage('A material with this name already exists.');
            } else {
                console.error('Failed to upload material:', error);
            }
        }
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleAddMaterial = () => {
        if (newMaterialName && selectedFile && courseId) {
            const duplicate = materials.some(material => material.name === newMaterialName);
            if (duplicate) {
                setErrorMessage('A material with this name already exists.');
            } else {
                uploadMaterial();
            }
        } else {
            setErrorMessage('Please provide a name, select a file, and select a course for the material.');
        }
    };

    const openViewModal = (material) => {
        setViewMaterial(material);
        setShowModal(true);
    };

    const openViewModal2 = (material) => {
        setViewMaterial(material);
    };

    const closeViewModal = () => {
        setViewMaterial(null);
        setShowModal(false);
    };

    const openDeleteModal = (material) => {
        setMaterialToDelete(material);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setMaterialToDelete(null);
        setShowDeleteModal(false);
    };

    const deleteMaterial = async () => {
        if (materialToDelete) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`${REST_API_BASE_URL}/${materialToDelete.id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setMaterials(materials.filter(material => material.id !== materialToDelete.id));
                closeDeleteModal();
            } catch (error) {
                console.error('Failed to delete material:', error);
            }
        }
    };

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const offset = currentPage * materialsPerPage;
    const currentMaterials = materials.slice(offset, offset + materialsPerPage);

    return (
        <div className='container'>
            <h1 className='text-center'>Material List</h1>
            <Button onClick={() => setShowModal(true)}>Add Material</Button>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Material</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                        type="text"
                        value={newMaterialName}
                        onChange={(e) => setNewMaterialName(e.target.value)}
                        placeholder="Enter material name"
                        className="form-control" // Add Bootstrap form-control class
                    />
                    <br/>
                    <br/>
                    <select
                        value={courseId}
                        onChange={(e) => setCourseId(e.target.value)}
                        className="form-select" // Add Bootstrap form-select class
                    >
                        <option value="">Select a course</option>
                        {courses.map(course => (
                            <option key={course.id} value={course.id}>{course.name}</option>
                        ))}
                    </select>
                    <br/>
                    <br/>
                    <div className="mb-3">
                        <input
                            type="file"
                            className="form-control"
                            id="formFile"
                            onChange={handleFileChange}
                        />
                        <label className="form-label" htmlFor="formFile"></label>
                    </div>
                    {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleAddMaterial}>Upload Material</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={viewMaterial !== null} onHide={closeViewModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>View Material</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p><strong>Name: </strong>{viewMaterial && viewMaterial.name}</p>
                    <p><strong>Course: </strong>{viewMaterial && viewMaterial.courseName}</p>
                </Modal.Body>
            </Modal>

            <Modal show={showDeleteModal} onHide={closeDeleteModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete the material <strong>{materialToDelete && materialToDelete.name}</strong>?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeDeleteModal}>Cancel</Button>
                    <Button variant="danger" onClick={deleteMaterial}>Delete</Button>
                </Modal.Footer>
            </Modal>

            <hr/>

            <table className="table table-striped table-bordered">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Download</th>
                    <th>Course name</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {currentMaterials.map((material) => (
                    <tr key={material.id}>
                        <td>{material.name}</td>
                        <td>
                            <div>
                                <a
                                    href={`${REST_API_BASE_URL}/download/${material.filePath}`}
                                    download
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const token = localStorage.getItem('token');
                                        axios.get(`${REST_API_BASE_URL}/download/${material.filePath}`, {
                                            headers: {
                                                'Authorization': `Bearer ${token}`
                                            },
                                            responseType: 'blob'
                                        })
                                            .then((response) => {
                                                const url = window.URL.createObjectURL(new Blob([response.data]));
                                                const link = document.createElement('a');
                                                link.href = url;
                                                link.setAttribute('download', material.filePath);
                                                document.body.appendChild(link);
                                                link.click();
                                            })
                                            .catch((error) => {
                                                console.error('Failed to download file:', error);
                                            });
                                    }}
                                >
                                    Download
                                </a>
                            </div>
                        </td>
                        <td>{material.courseName}</td>
                        <td>
                            <Button variant="info mr-2" onClick={() => openViewModal2(material)}> <i
                                className="fas fa-eye"></i></Button>
                            <button className="btn btn-danger" onClick={() => openDeleteModal(material)}>
                                <i className="fas fa-trash-alt"></i>
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <hr/>

            <ReactPaginate
                previousLabel={'\u2190'}
                nextLabel={'\u2192'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={Math.ceil(materials.length / materialsPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
                previousClassName={'page-item'}
                nextClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextLinkClassName={'page-link'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                breakLinkClassName={'page-link'}
            />
        </div>
    );
};

export default MaterialListComponent;