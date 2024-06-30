import React from 'react';
import Box from "@mui/material/Box";
import UserSideBar from "../../Component/User/UserSideBar";
import TeacherSidebar from "../../Component/Teacher/TeacherSidebar";
import CourseList from "../../Component/Teacher/Courses/CourseList";


const MainPage = () => {
    return(
        <Box sx={{display:'flex'}}>
            <TeacherSidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 ,marginTop:"55px"}}>
                <CourseList />
            </Box>
        </Box>
    )
}

export default MainPage;