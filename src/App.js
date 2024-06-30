import React from 'react';
import {Routes, Route, BrowserRouter, Navigate, useLocation} from 'react-router-dom';
import Dashboard from './Page/Admin/Dashboard';

import Login from './Component/Auth/LoginAuth';
import Signup from './Component/Auth/SignUp';
import Courses from "./Page/Admin/Courses";
import Users from "./Page/Admin/Users";
import Requests from "./Page/Admin/Requests";
import AddCourseForm from "./Component/Admin/Courses/AddCourseModal";
import Materials from "./Page/Admin/Materials";
import MainPage from "./Page/User/MainPage";
import UserCourses from "./Page/User/UserCourses";
import MyCourses from "./Page/User/MyCourses";
import CourseDetailsPage from "./Page/User/CourseDetailsPage";
import TeacherCourse from "./Page/Teacher/TeacherCourse";
import TeacherMaterial from "./Page/Teacher/TeacherMaterial";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/admin/dashboard" element={<Dashboard />} role="ADMIN" />
                <Route path="/admin/courses" element={<Courses />} role="ADMIN" />
                <Route path="/admin/materials" element={<Materials />} role="ADMIN" />
                <Route path="/admin/users" element={<Users />} role="ADMIN" />
                <Route path="/admin/requests" element={<Requests />} role="ADMIN" />

                <Route path="/admin/add-course" component={AddCourseForm} />

                <Route path="/user/main_page" element={<MainPage />} role="USER" />
                <Route path="/user/courses" element={<UserCourses />} role="USER" />
                <Route path="/user/my_courses" element={<MyCourses />} role="USER" />
                <Route path="/user/my_courses/course/:id" element={<CourseDetailsPage />} />

                <Route path="/teacher/teacher_courses/:id" element={<TeacherCourse />} role="TEACHER" />
                <Route path="/teacher/teacher_materials/:id" element={<TeacherMaterial />} role="TEACHER" />


                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </BrowserRouter>
    );
};