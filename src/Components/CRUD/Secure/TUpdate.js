import Variables from "../../Globals/Variables";


const TUpdate = () => {
    const handleUpdate = async (token, body, endpoint) => {

        const response = await fetch(Variables.API + endpoint, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        console.log(response)
        return await response.json()

    }

    return {
        handleUpdate
    }
}
export default TUpdate;