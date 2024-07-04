
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

axios.defaults.baseURL = API_URL;
const user = localStorage.getItem('token')
if(user) {
    const {token} = JSON.parse(user)
    if(!token) {
        console.log("please provide a token");
    }
    axios.defaults.headers.common = {'Authorization': `bearer ${token}`}

}

export default axios;