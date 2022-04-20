import {  Card,  CardContent, Stack, Typography } from '@mui/material'

const Onedata = ({userdata}) => {
    
  return (
    <Card>
      <CardContent>
        <Stack direction='row' justifyContent={"flex-start"} alignItems={'center'}>
            <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom flexGrow={1}>
                Name: {userdata.name}
            </Typography>
            <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom flexGrow={1}>
                Age: {userdata.age}
            </Typography>
        </Stack>
        <Stack direction='row' justifyContent={"space-between"} alignItems={'center'}>
            <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom flexGrow={1}>
                Email: {userdata.email}
            </Typography>
            <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom flexGrow={4}>
                Occupation: {userdata.occupation}
            </Typography>
           
        </Stack>
        <Stack direction='row' justifyContent={"space-between"} alignItems={'center'}>
            <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                Address: {userdata.address}
            </Typography>
           
        </Stack>
      </CardContent>
    </Card>
  )
}

export default Onedata