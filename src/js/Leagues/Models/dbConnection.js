export const fetchData = async (email) => {
    const response = await fetch(`http://localhost:5000/getLeagues/${email}`);
    const data = await response.json();

    if(!data.data[0].liked_leagues) {
        return false;
    } else {
        return data.data[0].liked_leagues;
    };

};  

export const storeData = async (str, email) => {
    const response = await fetch(`http://localhost:5000/storeLeagues`, {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            email: email,
            str: str
        })
    });
    const data = await response.json(); 
}