import React from 'react'
import SideBar from '../../Component/Admin/SideBar'
import Box from '@mui/material/Box';
import DashboardComponent from "../../Component/Admin/Dashboard/DashboardComponent";


export default function Dashboard() {
  return (
    <Box sx={{display:'flex'}}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 ,marginTop:"55px"}}>
        <DashboardComponent />
      </Box>
    </Box>
  )
}
