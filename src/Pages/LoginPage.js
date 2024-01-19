import Create from "../Components/CRUD/Insecure/Create";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
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
        const response = await handleCreate({name, password}, "auth/login")
        if (response.hasOwnProperty("token")) {
            setUser(response.user)
            setToken(response.token)
            navigate("/")
        } else {
            setError("Wrong data provided.")
            setIsError(true)
        }
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>

        <Card sx={{ minWidth: 500, display: "flex", alignItems:'center', justifyContent:'center'}}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" style={{textAlign: 'center'}}>
                    Login
                </Typography>
                <form onSubmit={ handleLogin } style={{display:'flex', alignItems:'center', flexDirection:'column'}}>
                    <div style={{display: isError ? 'block' : 'none', color:'red', fontSize:'0.8rem'}}> {error} </div>
                    <TextField id="name" label="Name" variant="standard" error={isError} style={{alignSelf: 'center'}} onChange={(e) => setName(e.target.value)} />
                    <TextField id="password" label="Password" variant="standard" type={'password'} error={isError} onChange={(e) => setPassword(e.target.value)}/>

                    <CardActions style={{display:'flex', flexDirection:'column'}}>
                        <div>New here? <Link to={"/register"} style={{textDecoration: 'underline', color: 'inherit'}}>Register.</Link></div>
                        <Button size="small" type="submit" style={{marginTop:'20px'}}>Login</Button>
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