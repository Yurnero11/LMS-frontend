import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CourseCard from './CourseUserCard';
import 'bootstrap/dist/css/bootstrap.min.css';

const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const [registeredCourseIds, setRegisteredCourseIds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState('');
    const cardsPerPage = 12;

    const REST_API_BASE_URL = 'http://localhost:8080/user/courses';
    const REGISTERED_COURSES_URL = 'http://localhost:8080/user/courses/registered';

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        // Получение всех курсов
        axios.get(REST_API_BASE_URL, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setCourses(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the courses!', error);
                setError('Error fetching courses');
            });

        // Получение зарегистрированных курсов
        axios.get(`${REGISTERED_COURSES_URL}?userId=${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setRegisteredCourseIds(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the registered courses!', error);
                setError('Error fetching registered courses');
            });
    }, []);

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = courses.slice(indexOfFirstCard, indexOfLastCard);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container">
            <h1 className='text-center'>Courses</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="row">
                {currentCards.map(course => (
                    <div className="col-md-4 mb-4 d-flex" key={course.id}>
                        <CourseCard
                            course={course}
                            isRegistered={registeredCourseIds.includes(course.id)}
                        />
                    </div>
                ))}
            </div>
            <nav>
                <ul className="pagination justify-content-center">
                    {[...Array(Math.ceil(courses.length / cardsPerPage)).keys()].map(number => (
                        <li key={number + 1} className={`page-item ${number + 1 === currentPage ? 'active' : ''}`}>
                            <button onClick={() => paginate(number + 1)} className="page-link">{number + 1}</button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default CourseList;