import * as React from 'react';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import {Box, Button, Card, CardActions, CardContent, CardMedia, Rating, Stack, Typography} from "@mui/material";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '500px',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function MediaCard({token, user}) {
    return (
        <Card sx={{ maxWidth: 800, maxHeight: 800, minWidth: 700, minHeight: 500 }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Lizard
                </Typography>
            </CardContent>
            <CardMedia
                sx={{ height: 500 }}
                image={"https://m.media-amazon.com/images/I/31Z2Tqw61JL._SY445_SX342_.jpg"}
                title="green iguana"
            />
            <CardActions>
                <Rating name="half-rating" defaultValue={2.5} precision={0.1} readOnly={user}/>
            </CardActions>
        </Card>
    );
}

function BasicStack(token, user) {
    return (
        <Box sx={{ width: '100%', position: 'absolute', display: 'flex', justifyContent: 'center'}}>
            <Stack spacing={2}>
                <MediaCard/>
                <MediaCard/>
                <MediaCard/>
            </Stack>
        </Box>
    );
}

function BasicModal({token, user}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <div style={{justifyContent: 'center', display: 'flex', margin: '5px'}}>
            <Button onClick={handleOpen} variant="contained" disabled={!user} style={{width: '50%'}}>Add meme</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mt: 2, color: 'white'}}>
                        Add your meme
                    </Typography>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' }
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField id="title" label="Title" variant="standard" />
                        <TextField id="url" label="Url" variant="standard" />
                    </Box>
                    <Button variant="outlined" >Add</Button>
                    <Button variant="outlined" onClick={handleClose}>Cancel</Button>

                </Box>
            </Modal>
        </div>
    );
}



const HomePage = ({token, setToken, user, setUser}) =>{
    return(
        <div>
            <BasicModal token={token} user={user}/>
            <BasicStack token={token} user={user}/>
        </div>
    )
}
export default HomePage;