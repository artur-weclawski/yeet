import * as React from 'react';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import {Box, Button, Card, CardActions, CardContent, CardMedia, Rating, Stack, Typography} from "@mui/material";
import Read from "../Components/CRUD/Insecure/Read";
import {useEffect, useState} from "react";
import TCreate from "../Components/CRUD/Secure/TCreate";
import {Link} from "react-router-dom";

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

function MediaCard({token, user, name, mean, title, url, meme_id}) {
    const {
        handleCreate
    } = TCreate()

    const handleAddScore = async (event, newScore) => {
        event.preventDefault()
        await handleCreate({meme_id: meme_id, user_id: user.id, score: newScore}, "score", token)
    }
    return (
        <Card sx={{ minWidth: 700, minHeight: 800 }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    <Link to={"/meme/"+ meme_id } style={{textDecoration: 'none', color: 'inherit'}}>{title}</Link>
                </Typography>
                <Typography gutterBottom variant="h8" component="div">
                    {name}
                </Typography>
            </CardContent>
            <CardMedia
                sx={{ height: 700}}
                image={url}
                title={title}
            />
            <CardActions>
                <Rating id='score' name="half-rating" defaultValue={mean} precision={0.5} readOnly={(token === null)} onChange={handleAddScore} />
            </CardActions>
        </Card>
    );
}

function BasicStack({token, user}) {
    const {
        handleRead
    } = Read()

    const [data, setData] = useState()
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        const fetchData = async () =>{
            const response = await handleRead(token, "")
            const data = await response
            setData(data.slice().reverse())
            setIsLoaded(true)
        }
        fetchData();
    }, []);

    if(isLoaded){
    return (
        <Box sx={{ width: '100%', position: 'absolute', display: 'flex', justifyContent: 'center'}}>
            <Stack spacing={2}>
                {
                    data.map(res => {
                    return (
                        <MediaCard token={token} user={user} name={res.user.name} mean={res.mean} title={res.title} url={res.url} meme_id={res.id}/>
                    );
                })}
            </Stack>
        </Box>
    );}
}

function BasicModal({token, user}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        setIsError(false)
        setError("")
    };

    const [title, setTitle] = useState("")
    const [url, setUrl] = useState("")
    const [error, setError] = useState("")
    const [isError, setIsError] = useState(false)
    const {
        handleCreate
    } = TCreate()

    const handleAddPost = async (event) => {
        event.preventDefault()
        let isErrorInHandle = false
        if(title.length === 0 || title.length > 255 || url.length === 0 || url.length > 255){
            setError("Wrong data provided.")
            setIsError(true)
            isErrorInHandle = true
        }
        if(!isErrorInHandle){
            await handleCreate({title: title, url: url, user_id: user.id}, "meme", token)
            window.location.reload(false)
        }else{
        }
    }
    return (
        <div style={{justifyContent: 'center', display: 'flex', margin: '5px'}}>
            <Button onClick={handleOpen} variant="contained" disabled={!user} style={{width: '50%', backgroundColor:'rgba(255, 255, 255, 0.09)', color:'white'}}>Add meme</Button>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mt: 2, color: 'white'}}>
                        Add your meme
                    </Typography>
                    <div style={{display: isError ? 'block' : 'none', color:'red', fontSize:'0.8rem'}}> {error} </div>
                    <Box
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' }
                        }}
                        autoComplete="off"
                    >
                        <form onSubmit={ handleAddPost }>
                            <TextField id="title" label="Title" variant="standard" error={isError} onChange={(e) => setTitle(e.target.value)}/>
                            <TextField id="url" label="Url" variant="standard" error={isError} onChange={(e) => setUrl(e.target.value)}/>
                            <Button variant="outlined" type="submit" style={{marginTop: '10px', marginLeft: '60px'}}>Add</Button>
                        </form>
                    </Box>
                    <Button variant="outlined" style={{marginLeft:'330px'}} onClick={handleClose} >Cancel</Button>

                </Box>
            </Modal>
        </div>
    );
}



const HomePage = ({token, user}) =>{
    return(
        <div>
            <BasicModal token={token} user={user}/>
            <BasicStack token={token} user={user}/>
        </div>
    )
}
export default HomePage;