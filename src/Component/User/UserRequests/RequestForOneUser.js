import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RequestForOneUser = () => {
    const [userId, setUserId] = useState(localStorage.getItem('userId'));
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:8080/user/my_courses/bookings/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setCourses(response.data);
            } catch (error) {
                setError('Error fetching user courses');
            }
        };

        if (userId) {
            fetchCourses();
        }
    }, [userId]);

    return (
        <div className="container">
            <h1 className='text-center'>My Courses</h1>
            {error && <p>{error}</p>}
            <table className='table table-striped table-bordered'>
                <thead>
                <tr>
                    <th scope="col">Course Name</th>
                    <th scope="col">Status</th>
                </tr>
                </thead>
                <tbody>
                {courses.map(course => (
                    course.courseBookStatus !== 'REJECTED' && (
                        <tr key={course.id}>
                            <td>
                                {course.courseBookStatus === 'PENDING' ? (
                                    <span>{course.courseName}</span>
                                ) : (
                                    <Link to={`/user/my_courses/course/${course.userId}`}>{course.courseName}</Link>
                                )}
                            </td>
                            <td>{course.courseBookStatus}</td>
                        </tr>
                    )
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default RequestForOneUser;