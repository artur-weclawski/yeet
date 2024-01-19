import Create from "../Components/CRUD/Insecure/Create";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import TextField from "@mui/material/TextField";
import * as React from "react";

function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
}

function RegisterCard() {

    const {
        handleCreate
    } = Create()

    const navigate = useNavigate();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const [error, setError] = useState("")
    const [isError, setIsError] = useState(false)
    const handleRegister = async (event) => {
        event.preventDefault()
        if(password.length < 8){
            setError('Password is to short.')
            setIsError(true)
        }
        else if(!validatePassword(password)){
            setError('Passwords should contains at least one small and big letter and one number.')
            setIsError(true)
        }
        else if(password !== repeatPassword){
            setError('Passwords are different.')
            setIsError(true)
        }else{
            const response = await handleCreate({name, email, password}, "auth/register")
            if (response.hasOwnProperty("token")) {
                navigate("/login")
            } else {
                console.log(response)
                setError(response.message)
                setIsError(true)
            }
        }

    }
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>

            <Card sx={{ minWidth: 500, display: "flex", alignItems:'center', justifyContent:'center'}}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" style={{textAlign: 'center'}}>
                        Register
                    </Typography>
                    <form onSubmit={handleRegister} style={{display:'flex', alignItems:'center', flexDirection:'column'}}>
                        <div style={{display: isError, color:'red', fontSize:'0.8rem'}}> {error} </div>
                        <TextField id="name" label="Name" variant="standard" error={isError} onChange={(e) => setName(e.target.value)}/>
                        <TextField id="email" label="Email" variant="standard" error={isError} onChange={(e) => setEmail(e.target.value)}/>
                        <TextField id="password" label="Password" variant="standard" type={'password'} error={isError} onChange={(e) => setPassword(e.target.value)}/>
                        <TextField id="repeatPassword" label="Repeat Password" variant="standard" type={'password'} error={isError} onChange={(e) => setRepeatPassword(e.target.value)}/>

                        <CardActions style={{display:'flex', flexDirection:'column'}}>
                            <div>Already have account? <Link to={"/login"} style={{textDecoration: 'underline', color: 'inherit'}}>Login.</Link></div>
                            <Button size="small" type="submit" style={{marginTop:'20px'}}>Register</Button>
                        </CardActions>
                    </form>

                </CardContent>
            </Card>
        </div>
    );
}


const RegisterPage = () => {
    return(
        <RegisterCard />
    )

}

export default RegisterPage