import React from 'react';
import Box from "@mui/material/Box";
import UserSideBar from "../../Component/User/UserSideBar";


const MainPage = () => {
    return(
        <Box sx={{display:'flex'}}>
            <UserSideBar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 ,marginTop:"55px"}}>
                <div>Main page</div>
            </Box>
        </Box>
    )
}

export default MainPage;