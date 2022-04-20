import { Grid } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import Alldata from './components/Alldata'
import Form from './components/Form'
import io from 'socket.io-client' 

const App = () => {
  const socket = useRef();
  useEffect(()=>{
    socket.current = io.connect("http://localhost:5000");
  },[])
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