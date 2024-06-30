import React from 'react'
import SideBar from '../../Component/Admin/SideBar'
import Box from '@mui/material/Box';
import MaterialListComponent from "../../Component/Admin/Materials/ListMaterialsComponent";


export default function Materials() {
    return (
        <Box sx={{display:'flex'}}>
            <SideBar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 ,marginTop:"55px"}}>
                <MaterialListComponent />
            </Box>
        </Box>
    )
}
