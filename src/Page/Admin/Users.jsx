import React from 'react'
import SideBar from '../../Component/Admin/SideBar'
import Box from '@mui/material/Box';
import ListUsersComponent from "../../Component/Admin/Users/ListUsersComponent";


export default function Users() {
  return (
    <Box sx={{display:'flex'}}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 ,marginTop:"55px"}}>
          <ListUsersComponent />
      </Box>
    </Box>
  )
}
