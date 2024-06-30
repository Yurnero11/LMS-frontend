import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const DashboardComponent = () => {
    const [userCount, setUserCount] = useState(0);
    const [teacherCount, setTeacherCount] = useState(0);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const token = localStorage.getItem('token');
                const userResponse = await axios.get('http://localhost:8080/admin/users', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUserCount(userResponse.data.length);

                const teacherResponse = await axios.get('http://localhost:8080/admin/users/teachers', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setTeacherCount(teacherResponse.data.length);
            } catch (error) {
                console.error('Error fetching user and teacher count:', error);
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
                console.error('Error fetching courses:', error);
            }
        };

        fetchCounts();
        fetchCourses();
    }, []);

    const data = [
        { name: 'Users', count: userCount },
        { name: 'Teachers', count: teacherCount }
    ];

    const latestCourses = courses.slice().sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate)).slice(0, 4);

    return (
        <div>
            <h2 className='text-center'>User and Teacher Chart</h2>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5
                    }}
                >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
            <h2 className='text-center'>Latest Courses</h2>
            <table className='table table-striped table-bordered'>
                <thead>
                <tr>
                    <th>Course Name</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Creation Date</th>
                </tr>
                </thead>
                <tbody>
                {latestCourses.map(course => (
                    <tr key={course.id}>
                        <td>{course.name}</td>
                        <td>{course.title}</td>
                        <td>{course.description}</td>
                        <td>{new Date(course.creationDate).toLocaleDateString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default DashboardComponent;