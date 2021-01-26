export const fetchData = async (email) => {
    const response = await fetch(`http://localhost:5000/getLeagues/${email}`);
    const data = response.json();

    return data;
};