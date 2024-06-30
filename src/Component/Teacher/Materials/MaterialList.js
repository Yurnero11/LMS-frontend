import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { Modal, Button } from 'react-bootstrap';

const MaterialList = () => {
    const [materials, setMaterials] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [newMaterialName, setNewMaterialName] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [courseId, setCourseId] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [courses, setCourses] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [materialToDelete, setMaterialToDelete] = useState(null);
    const materialsPerPage = 5;
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchMaterials();
        fetchCourses();
    }, []);

    useEffect(() => {
        console.log('Materials updated:', materials); // Log updated materials
    }, [materials]);

    const REST_API_BASE_URL = 'http://localhost:8080/teacher/teacher_materials';
    const REST_API_BASE_URL_UPLOAD = 'http://localhost:8080/teacher';
    const REST_API_BASE_URL_COURSES = 'http://localhost:8080/teacher/teacher_courses';
    const REST_API_BASE_URL_DOWNLOAD = 'http://localhost:8080/teacher';
    const DELETE_API = 'http://localhost:8080/teacher/teacher_materials/delete';

    const fetchMaterials = async () => {
        try {
            const userId = localStorage.getItem('userId');
            const token = localStorage.getItem('token');
            console.log('Fetching materials for userId:', userId); // Log userId
            const response = await axios.get(`${REST_API_BASE_URL}/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Response data:', response.data); // Log response data
            setMaterials(response.data);
        } catch (error) {
            console.error('Failed to fetch materials:', error);
        }
    };

    const fetchCourses = async () => {
        try {
            const userId = localStorage.getItem('userId');
            const token = localStorage.getItem('token');
            const response = await axios.get(`${REST_API_BASE_URL_COURSES}/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setCourses(response.data);
        } catch (error) {
            console.error('Failed to fetch courses:', error);
        }
    };

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(0); // Reset to the first page on search
    };

    const filteredMaterials = materials.filter(material =>
        material.materialDto.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const offset = currentPage * materialsPerPage;
    const currentMaterials = filteredMaterials.slice(offset, offset + materialsPerPage);

    const handleDownload = async (filePath) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${REST_API_BASE_URL_DOWNLOAD}/download/${filePath}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                responseType: 'blob'
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filePath);
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Failed to download file:', error);
        }
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const uploadMaterial = async () => {
        const formData = new FormData();
        formData.append('name', newMaterialName);
        formData.append('file', selectedFile);
        formData.append('courseId', courseId);

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${REST_API_BASE_URL_UPLOAD}/upload`, formData, {
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

    const handleAddMaterial = () => {
        if (newMaterialName && selectedFile && courseId) {
            const duplicate = materials.some(material => material.materialDto.name === newMaterialName);
            if (duplicate) {
                setErrorMessage('A material with this name already exists.');
            } else {
                uploadMaterial();
            }
        } else {
            setErrorMessage('Please provide a name, select a file, and select a course for the material.');
        }
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
                await axios.delete(`${DELETE_API}/${materialToDelete.id}`, {
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

    return (
        <div className='container'>
            <h1 className='text-center'>Material List</h1>
            <Button onClick={() => setShowModal(true)}>Add Material</Button>
            <hr/>

            <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search materials"
                className="form-control mb-3"
            />
            <hr/>

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
                        className="form-control"
                    />
                    <br/>
                    <br/>
                    <select
                        value={courseId}
                        onChange={(e) => setCourseId(e.target.value)}
                        className="form-select"
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

            <Modal show={showDeleteModal} onHide={closeDeleteModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete the material <strong>{materialToDelete && materialToDelete.materialDto.name}</strong>?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeDeleteModal}>Cancel</Button>
                    <Button variant="danger" onClick={deleteMaterial}>Delete</Button>
                </Modal.Footer>
            </Modal>

            {filteredMaterials.length === 0 ? (
                <p>No materials found</p>
            ) : (
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
                            <td>{material.materialDto.name}</td>
                            <td>
                                <div>
                                    <a
                                        href={`${REST_API_BASE_URL}/download/${material.materialDto.filePath}`}
                                        download
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleDownload(material.materialDto.filePath);
                                        }}
                                    >
                                        Download
                                    </a>
                                </div>
                            </td>
                            <td>{material.materialDto.courseName}</td>
                            <td>
                                <button className="btn btn-danger" onClick={() => openDeleteModal(material)}>
                                    <i className="fas fa-trash-alt"></i> Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
            <hr/>
            <ReactPaginate
                previousLabel={'\u2190'}
                nextLabel={'\u2192'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                subContainerClassName={'pages pagination'}
                pageCount={Math.ceil(materials.length / materialsPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
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

export default MaterialList;