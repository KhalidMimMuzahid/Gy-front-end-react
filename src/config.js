// local storage config
export const GET_LOCALSTORAGE_DATA = (key) =>{
    return JSON.parse(localStorage.getItem(key))
}