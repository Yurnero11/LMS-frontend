import React from 'react';
import Box from "@mui/material/Box";
import TeacherSidebar from "../../Component/Teacher/TeacherSidebar";
import MaterialList from "../../Component/Teacher/Materials/MaterialList";


const MainPage = () => {
    return(
        <Box sx={{display:'flex'}}>
            <TeacherSidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 ,marginTop:"55px"}}>
                <MaterialList />
            </Box>
        </Box>
    )
}

export default MainPage;