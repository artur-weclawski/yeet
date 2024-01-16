import Variables from "../../Globals/Variables";


const Create = () => {
    const handleCreate = async (data, endpoint) => {
        const response = await fetch(Variables.API + endpoint, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return await response.json()
    }
    return {
        handleCreate
    }
}
export default Create;