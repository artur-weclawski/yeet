import Variables from "../../Globals/Variables";

const TDelete = () => {
    const handleDelete = async (token, endpoint) => {
        const response = await fetch(Variables.API + endpoint, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        return await response.json()
    }
    return{
        handleDelete
    }
}
export default TDelete;