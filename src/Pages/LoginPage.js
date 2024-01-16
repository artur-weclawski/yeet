import Create from "../Components/CRUD/Insecure/Create";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import TextField from "@mui/material/TextField";
import * as React from "react";

function LoginCard({setToken, setUser}) {

    const {
        handleCreate
    } = Create()

    const navigate = useNavigate();
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [isError, setIsError] = useState(false)
    const handleLogin = async (event) => {
        event.preventDefault()
        setName(event.target.name.value)
        setPassword(event.target.password.value)
        const response = await handleCreate({name, password}, "auth/login")
        if (response.hasOwnProperty("token")) {
            setUser(response.user)
            setToken(response.token)
            navigate("/")
        } else {
            setError(response.error)
            setIsError(true)
            console.log(response)
        }
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>

        <Card sx={{ maxWidth: 345 }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Login
                </Typography>
                <form onSubmit={handleLogin}>
                    <TextField id="name" label="Name" variant="standard" error={isError}/>
                    <TextField id="password" label="Password" variant="standard" type={'password'} error={isError}/>
                    <CardActions>
                        <Button size="small" type="submit" >Login</Button>
                    </CardActions>
                </form>
            </CardContent>
        </Card>
        </div>
    );
}


const LoginPage = ({setToken, setUser}) => {
    return(
            <LoginCard setToken={setToken} setUser={setUser}/>
    )

}

export default LoginPage