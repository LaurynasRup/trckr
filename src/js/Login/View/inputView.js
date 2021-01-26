export const clearFields = (arr) => {
    arr.forEach(input => {
        input.firstElementChild.value = '';
        input.lastElementChild.innerText = '';
    });
};