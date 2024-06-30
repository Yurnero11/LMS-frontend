import React from 'react'
import SideBar from '../../Component/Admin/SideBar'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AdminRequests from "../../Component/Admin/Requests/AdminRequests";


export default function Requests() {
  return (
    <Box sx={{display:'flex'}}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 ,marginTop:"55px"}}>
            <Typography variant="h5">
                <AdminRequests />
            </Typography>
          
          </Box>
    </Box>
  )
}
