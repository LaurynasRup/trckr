export const deleteLeague = (el,arr) => {
    const index = arr.indexOf(el);
    if(index > -1) {
        arr.splice(index,1);
    };
};

export const addleague = (el, arr) => {
    arr.push(el);
};