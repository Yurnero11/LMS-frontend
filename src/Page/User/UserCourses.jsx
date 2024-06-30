import React from 'react';
import Box from "@mui/material/Box";
import UserSideBar from "../../Component/User/UserSideBar";
import AllCourseList from "../../Component/User/UserAllCourses/AllCourseList";

const UserCourses = () => {
    return(
        <Box sx={{display:'flex'}}>
            <UserSideBar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 ,marginTop:"55px"}}>
                <AllCourseList />
            </Box>
        </Box>
    )
}

export default UserCourses;