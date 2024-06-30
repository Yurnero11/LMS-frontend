import React from 'react'
import Box from '@mui/material/Box';
import CourseDetails from "../../Component/User/UserRequests/CourseDetails";
import UserSideBar from "../../Component/User/UserSideBar";


export default function CourseDetailsPage() {
    return (
        <Box sx={{display:'flex'}}>
            <UserSideBar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 ,marginTop:"55px"}}>
                <CourseDetails />
            </Box>
        </Box>
    )
}
