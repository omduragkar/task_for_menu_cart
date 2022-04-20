import { Box, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios, {} from 'axios';
import Onedata from './Onedata'
const Alldata = ({socket}) => {
  const [userarr, setuarr] = useState([]);
  useEffect(()=>{
      axios.get(process.env.REACT_APP_GETUSER,{
          headers:{
              'Content-Type':"application/json"
          }
      }).then(res=>{
          console.log(res);
          setuarr([...res.data.total_user])
      }).catch(err=>{
          console.log(err)
      })
  },[])
  useEffect(()=>{
    if(socket.current){
      socket.current.on('recieve', function(data){
        console.log("hELLo", data);
        setuarr([data, ...userarr])
      })
    }
  })
  
  return (
    <Box>
      <Stack>
        <Typography variant='h3'>All Data: </Typography>
        <Stack rowGap={2} px={3}>
          {userarr && userarr.length>0 ? (userarr.map(udata=>(
            <Onedata userdata={udata}/>
          )))
          :
          <Typography variant={'h5'}>No data</Typography>
        }
        </Stack>
      </Stack>
    </Box>
  )
}

export default Alldata