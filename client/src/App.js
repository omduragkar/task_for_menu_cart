import { Grid } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import Alldata from './components/Alldata'
import Form from './components/Form'
import io from 'socket.io-client' 

const App = () => {
  const socket = useRef();
  // Initializing socket
  useEffect(()=>{
    socket.current = io.connect(process.env.REACT_APP_SOCKET_URL);
    console.log(socket.current, process.env.REACT_APP_SOCKET_URL);
  },[])

  // This grid contains two tabs One for form another for data fetching 
  return (
    <Grid container>
        <Grid item xs={12} md={4}>
          <Form socket={socket}/>
        </Grid>
        <Grid item xs={12} md={8}>
          <Alldata socket={socket}/>
        </Grid>
    </Grid>
  )
}

export default App