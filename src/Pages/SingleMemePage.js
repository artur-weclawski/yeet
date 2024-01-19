import {useParams} from "react-router-dom";
import TCreate from "../Components/CRUD/Secure/TCreate";
import {Box, Card, CardActions, CardContent, CardMedia, Rating, Stack, Typography} from "@mui/material";
import * as React from "react";
import Read from "../Components/CRUD/Insecure/Read";
import {useEffect, useState} from "react";

const SingleMemePage = ({token, user}) =>{

    function MediaCard({token, user, name, mean, title, url, meme_id}) {
        const {
            handleCreate
        } = TCreate()

        const handleAddScore = async (event, newScore) => {
            event.preventDefault()
            await handleCreate({meme_id: meme_id, user_id: user.id, score: newScore}, "score", token)
        }
        return (
            <Card sx={{ maxWidth: 800, maxHeight: 800, minWidth: 700, minHeight: 500 }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
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
                const response = await handleRead(token, `meme/${meme_id}`)
                const data = await response
                setData(data)
                setIsLoaded(true)
            }
            fetchData();
        }, []);

        if(isLoaded){
            return (
                <Box sx={{ width: '100%', position: 'absolute', display: 'flex', justifyContent: 'center', top: '50%',
                        left: '50%', transform: 'translate(-50%, -50%)'}}>
                    <Stack spacing={2}>
                        <MediaCard token={token} user={user} name={data.user.name} mean={data.mean} title={data.title} url={data.url} meme_id={data.id}/>
                    </Stack>
                </Box>
            );}
    }

    const {meme_id} = useParams()
    return(
        <div>
            <BasicStack token={token} user={user}/>
        </div>
    )
}
export default SingleMemePage