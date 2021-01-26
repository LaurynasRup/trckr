export const fetchDbData = async (mail) => {
    const response = await fetch(`http://localhost:5000/getItem/${mail}`);
    const data = await response.json();
    if (data.data.length === 0) {
        return false;
    } else {
        return true;
    }
};

export const storeUserData = async (obj) => {
    const response = await fetch('http://localhost:5000/insert', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            name: obj.userName,
            email: obj.userEmail,
            password: obj.pass
        })
    });
    const data = await response.json();
}