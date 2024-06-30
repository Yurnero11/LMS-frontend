import React, { useState } from 'react';

const MaterialForm = ({ courses, onAddMaterial }) => {
    const [newMaterialName, setNewMaterialName] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [courseId, setCourseId] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (newMaterialName && selectedFile && courseId) {
            const formData = new FormData();
            formData.append('name', newMaterialName);
            formData.append('file', selectedFile);
            formData.append('courseId', courseId);
            onAddMaterial(formData);
        } else {
            setErrorMessage('Please provide a name, select a file, and select a course for the material.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={newMaterialName}
                onChange={(e) => setNewMaterialName(e.target.value)}
                placeholder="Enter material name"
            />
            <select value={courseId} onChange={(e) => setCourseId(e.target.value)}>
                <option value="">Select a course</option>
                {courses.map(course => (
                    <option key={course.id} value={course.id}>{course.name}</option>
                ))}
            </select>
            <input type="file" onChange={handleFileChange} />
            <button type="submit">Upload Material</button>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </form>
    );
};

export default MaterialForm;