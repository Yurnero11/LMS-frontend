import React from 'react';
import Box from "@mui/material/Box";
import UserSideBar from "../../Component/User/UserSideBar";
import RequestForOneUser from "../../Component/User/UserRequests/RequestForOneUser";

const MyCourses = () => {
    return(
        <Box sx={{display:'flex'}}>
            <UserSideBar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 ,marginTop:"55px"}}>
                <RequestForOneUser />
            </Box>
        </Box>
    )
}

export default MyCourses;