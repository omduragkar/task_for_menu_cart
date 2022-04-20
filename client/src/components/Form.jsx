import React, { useState } from 'react'
import Stack from '@mui/material/Stack';
import { Box, Button, TextField, Typography } from '@mui/material'
import axios, {} from 'axios';
const Form = ({socket}) => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);

    const datahandler = (e)=>{
        setData(prev=>({
            ...prev,
            [e.target.name]:e.target.value
        }))
    }
    const submithandler = (e)=>{
        setLoading(true);
        e.preventDefault();
        axios.post(process.env.REACT_APP_CREATEUSER,data, {
            headers:{
                'Content-Type':"application/json"
            }
        }).then(res=>{
            setData({});
            setLoading(false);
            socket.current.emit("sent_data", (res.data && res.data.added_user)?res.data.added_user:res.data);
            
            
        }).catch(err=>{
            setLoading(false);
            console.log(err);
        })
    }
  return (
    <Box sx={{position:{xs:"static",md:"fixed"},top:{xs:'5%',md:"15%"}, width:{xs:"100%",md:"30%"}}}>
        <Typography variant='h3' textAlign={'center'} my={1}>Add Data</Typography>
        <Stack rowGap={3} m={2} >
            <TextField id="outlined-basic" label="Name" value={data.name || ""} onChange={e=>datahandler(e)} name='name' variant="outlined" />
            <TextField id="outlined-basic" label="Email" value={data.email || ""} onChange={e=>datahandler(e)} name='email' variant="outlined" />
            <TextField id="outlined-basic" label="Address" value={data.address || ""} onChange={e=>datahandler(e)} name='address' variant="outlined" />
            <TextField id="outlined-basic" label="Age" value={data.age || ""} onChange={e=>datahandler(e)} name='age' variant="outlined" />
            <TextField id="outlined-basic" label="Occupation" value={data.occupation || ""} onChange={e=>datahandler(e)} name='occupation' variant="outlined" />
            <Button variant='contained' disabled={loading && true} onClick={e=>{
                if(!loading){
                    submithandler(e)
                }
            }}>{loading?"LOADING... ":"SAVE"}</Button>

        </Stack>
    </Box>
  )
}

export default Form