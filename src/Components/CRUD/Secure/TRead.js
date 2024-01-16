import Variables from "../../Globals/Variables";

const TRead = () => {

    const handleRead = async (token, endpoint) => {
        const response = await fetch(Variables.API + endpoint, {
            method: 'GET',
            // credentials: 'no-cors',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        console.log(response)
        return await response.json()
    }

    return{
        handleRead
    }
}
export default TRead;