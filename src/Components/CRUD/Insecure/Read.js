import Variables from "../../Globals/Variables";

const Read = () => {
    const handleRead = async (token, endpoint) => {
        const response = await fetch(Variables.API + endpoint, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        return await response.json()
    }
    return {
        handleRead
    }
}

export default Read