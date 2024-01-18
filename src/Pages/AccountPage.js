import React, {useEffect, useState} from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Read from "../Components/CRUD/Insecure/Read";
import {CardMedia, IconButton, Rating, Stack} from "@mui/material";
import TCreate from "../Components/CRUD/Secure/TCreate";
import {Link, useNavigate} from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import TDelete from "../Components/CRUD/Secure/TDelete";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import TUpdate from "../Components/CRUD/Secure/TUpdate";

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
function BasicNameModal({token, setToken, user, setUser}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        setIsError(false)
        setError("")
    };

    const {
        handleUpdate
    } = TUpdate()
    const [newName, setNewName] = useState("")
    const [error, setError] = useState("")
    const [isError, setIsError] = useState(false)

    const handleUpdateName = async (event) =>{
        event.preventDefault()
        let isErrorInHandle = false
        if(user.name === newName || newName.length === 0){
            setError("Username taken")
            setIsError(true)
            isErrorInHandle = true
        }
        const response = await handleUpdate(token, null ,'user/changeName/' + user.name + '/' + newName)
        console.log(response.message)
        if(response.hasOwnProperty('message') || isErrorInHandle){
            setError("Username taken")
            setIsError(true)
            isErrorInHandle = true
        }else{
            setError("")
            setIsError(false)
            isErrorInHandle = false
        }

        if(!isErrorInHandle){
            localStorage.setItem('user', JSON.stringify(null));
            localStorage.setItem('token', JSON.stringify(null));
            setToken(null)
            setUser(null)
            handleClose()
            window.location.reload();
        }
    }

    return (
        <div style={{justifyContent: 'center', display: 'flex', margin: '5px'}}>
            <Button onClick={handleOpen} variant="contained" style={{backgroundColor:'rgba(255, 255, 255, 0.09)', color:'white'}}>Change Name</Button>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mt: 2, color: 'white'}}>
                        Chnage your name.
                    </Typography>
                    <div style={{display: isError ? 'block' : 'none', color:'red', fontSize:'0.8rem'}}> {error} </div>
                    <Box
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' }
                        }}
                        autoComplete="off"
                    >
                        <form onSubmit={ handleUpdateName }>
                            <TextField id="newName" label="New name" variant="standard" error={isError} onChange={(e) => setNewName(e.target.value)}/>
                            <Button variant="outlined" type="submit" style={{marginTop: '10px', marginLeft: '60px'}}>Change</Button>
                        </form>
                    </Box>
                    <Button variant="outlined" style={{marginLeft:'330px'}} onClick={handleClose} >Cancel</Button>

                </Box>
            </Modal>
        </div>
    );
}

function BasicPasswordModal({token, setToken, user, setUser}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        setIsError(false)
        setError("")
    };

    function validatePassword(password) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        console.log('a' + passwordRegex.test(password))
        return passwordRegex.test(password);
    }

    const {
        handleUpdate
    } = TUpdate()

    const [newPassword, setNewPassword] = useState("")
    const [error, setError] = useState("")
    const [isError, setIsError] = useState(false)

    const handleUpdateName = async (event) =>{
        event.preventDefault()
        let isErrorInHandle = false
        if(newPassword.length < 8 || !validatePassword(newPassword)){
            setError("Wrong password.")
            setIsError(true)
            isErrorInHandle = true
        }
        const response = await handleUpdate(token, null ,'user/changePassword/' + user.name + '/' + newPassword)
        console.log(response.message)
        if(response.hasOwnProperty('message') || isErrorInHandle){
            setError("Wrong password")
            setIsError(true)
            isErrorInHandle = true
        }else{
            setError("")
            setIsError(false)
            isErrorInHandle = false
        }

        if(!isErrorInHandle){
            localStorage.setItem('user', JSON.stringify(null));
            localStorage.setItem('token', JSON.stringify(null));
            setToken(null)
            setUser(null)
            handleClose()
            window.location.reload();
        }
    }

    return (
        <div style={{justifyContent: 'center', display: 'flex', margin: '5px'}}>
            <Button onClick={handleOpen} variant="contained" style={{backgroundColor:'rgba(255, 255, 255, 0.09)', color:'white'}}>Change Password</Button>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mt: 2, color: 'white'}}>
                        Chnage your password.
                    </Typography>
                    <div style={{display: isError ? 'block' : 'none', color:'red', fontSize:'0.8rem'}}> {error} </div>
                    <Box
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' }
                        }}
                        autoComplete="off"
                    >
                        <form onSubmit={ handleUpdateName }>
                            <TextField id="newPassword" label="New password" variant="standard" type={'password'} error={isError} onChange={(e) => setNewPassword(e.target.value)}/>
                            <Button variant="outlined" type="submit" style={{marginTop: '10px', marginLeft: '60px'}}>Change</Button>
                        </form>
                    </Box>
                    <Button variant="outlined" style={{marginLeft:'330px'}} onClick={handleClose} >Cancel</Button>

                </Box>
            </Modal>
        </div>
    );
}

function BasicCard({token, setToken, user, setUser}) {

    const {
        handleDelete
    } = TDelete()

    const handleDeleteAccount = async (event) => {
        event.preventDefault()
        await handleDelete(token, `user/${user.id}`)
        localStorage.setItem('user', JSON.stringify(null));
        localStorage.setItem('token', JSON.stringify(null));
        setToken(null)
        setUser(null)
        window.location.reload();
    }
    return (
        <Card sx={{ minWidth: 400 }}>
            <CardContent>
                <Typography variant="h5" color="text.secondary" gutterBottom>
                    Username
                </Typography>
                <Typography variant="h7" component="div">
                    {user.name}
                </Typography>
                <Typography variant="h5" color="text.secondary">
                    Email
                </Typography>
                <Typography variant="h7">
                    {user.email}
                </Typography>
            </CardContent>
            <CardActions>
                <BasicNameModal token={token} setToken={setToken} user={user} setUser={setUser} />
                <BasicPasswordModal token={token} setToken={setToken} user={user} setUser={setUser} />
                <Button size="small" onClick={ handleDeleteAccount } color="error">Delete account</Button>
            </CardActions>
        </Card>
    );
}
function MediaCard({token, user, name, mean, title, url, meme_id}) {
    const {
        handleCreate
    } = TCreate()
    const navigate = useNavigate();
    const {
        handleDelete
    } = TDelete()
    const handleDeleteMeme = async (event) => {
        event.preventDefault()
        await handleDelete(token, `meme/${meme_id}`)
        window.location.reload(false)
    }

    const handleAddScore = async (event, newScore) => {
        event.preventDefault()
        await handleCreate({meme_id: meme_id, user_id: user.id, score: newScore}, "score", token)
    }
    return (
        <Card sx={{ maxWidth: 500, maxHeight: 800, minWidth: 400, minHeight: 500 }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    <Link to={"/meme/"+ meme_id } style={{textDecoration: 'none', color: 'inherit'}}>{title}</Link>
                </Typography>
                <Typography gutterBottom variant="h8" component="div">
                    {name}
                </Typography>
            </CardContent>
            <CardMedia
                sx={{ height: 500 }}
                image={url}
                title={title}
            />
            <CardActions>
                <Rating id='score' name="half-rating" defaultValue={mean} precision={0.5} readOnly={(token === null)} onChange={handleAddScore} />
                <IconButton aria-label="RemovePost" style={{marginLeft: "300px"}} onClick = { handleDeleteMeme }>
                    <DeleteIcon />
                </IconButton >
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
            const response = await handleRead(token, `memes/user/${user.name}`)
            const data = await response
            setData(data.slice().reverse())
            console.log(data.slice().reverse())
            setIsLoaded(true)
        }
        fetchData();
    }, []);

    if(isLoaded){
        return (
            <Box sx={{ width: 'calc(100% - 400px)', position: 'absolute', display: 'flex', justifyContent: 'center'}}>
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
const AccountPage = ({token, setToken, user, setUser}) => {
    return (
        <Grid container spacing={0}>
            <Grid xs={2}>
                <BasicCard token={token} setToken={setToken}  user={user} setUser={setUser}/>
            </Grid>
            <Grid xd={10}>
                <BasicStack token={token} user={user}/>
            </Grid>
        </Grid>
    );
};

export default AccountPage;