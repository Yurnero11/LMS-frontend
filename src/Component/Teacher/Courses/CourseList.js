import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CourseCard from './CourseCard';
import MaterialList from '../Materials/MaterialList'; // Import MaterialList component

const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 12;
    const [selectedCourseId, setSelectedCourseId] = useState(null); // State to store selected course ID

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId'); // Get userId from localStorage

        // Check if userId exists in localStorage
        if (!userId) {
            console.error('User ID not found in localStorage');
            return;
        }

        const TEACHER_COURSES_API_URL = `http://localhost:8080/teacher/teacher_courses/${userId}`; // Updated URL for fetching teacher's courses

        axios.get(TEACHER_COURSES_API_URL, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setCourses(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the courses!', error);
            });
    }, []);

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = courses.slice(indexOfFirstCard, indexOfLastCard);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleCourseSelect = (courseId) => {
        setSelectedCourseId(courseId); // Update selectedCourseId state when a course is selected
    };

    return (
        <div className="container">
            <h1 className='text-center'>Courses</h1>
            <hr />
            <div className="row">
                {currentCards.map(course => (
                    <div className="col-md-2 mb-4 d-flex" key={course.id}>
                        <CourseCard
                            course={course}
                            onSelect={() => handleCourseSelect(course.id)} // Pass onSelect handler to CourseCard component
                        />
                    </div>
                ))}
            </div>
            <hr />
            <nav>
                <ul className="pagination justify-content-center">
                    {[...Array(Math.ceil(courses.length / cardsPerPage)).keys()].map(number => (
                        <li key={number + 1} className={`page-item ${number + 1 === currentPage ? 'active' : ''}`}>
                            <button onClick={() => paginate(number + 1)} className="page-link">{number + 1}</button>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Render MaterialList component with selectedCourseId passed as prop */}
            {selectedCourseId !== null && (
                <MaterialList selectedCourseId={selectedCourseId} />
            )}
        </div>
    );
};

export default CourseList;