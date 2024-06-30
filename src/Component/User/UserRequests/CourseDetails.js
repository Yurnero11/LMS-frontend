import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const CourseDetails = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:8080/user/my_courses/course/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setCourse(response.data);
            } catch (error) {
                setError('Error fetching course details');
            }
        };

        fetchCourseDetails();
    }, [id]);

    const downloadMaterial = async (filePath) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8080/user/my_courses/download/${filePath}`, {
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
            link.parentNode.removeChild(link);
        } catch (error) {
            console.error('Error downloading the file:', error);
            setError('Error downloading the file');
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Course Details</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            {course && (
                <div className="card">
                    <div className="card-body">
                        <h2 className="card-title">{course.name}</h2>
                        <p className="card-text"><strong>Description:</strong> {course.description}</p>
                        <h3 className="mt-4">Materials:</h3>
                        {course.materials && course.materials.length > 0 ? (
                            <table className="table table-striped">
                                <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {course.materials.map(material => (
                                    <tr key={material.id}>
                                        <td>{material.name}</td>
                                        <td>
                                            <button
                                                className="btn btn-primary btn-sm"
                                                onClick={() => downloadMaterial(material.filePath)}
                                            >
                                                Download
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No materials available for this course.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CourseDetails;