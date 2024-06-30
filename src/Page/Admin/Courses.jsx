import React from 'react'
import SideBar from '../../Component/Admin/SideBar'
import Box from '@mui/material/Box';
import CourseList from "../../Component/Admin/Courses/CourseList";


export default function Courses() {
  return (
        <Box sx={{display:'flex'}}>
          <SideBar />
          <Box component="main" sx={{ flexGrow: 1, p: 3 ,marginTop:"55px"}}>
            <CourseList />
          </Box>
        </Box>
  )
}
