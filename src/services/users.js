import axios from "axios";

export const fetchLogin = async (user) => {
    try {
        var response = await axios.post("http://localhost:5298/user/login", user);
        return response.data;
    }
    catch(e){
        console.error(e);
    }
}

export const fetchRegister = async (user) => {
    try {
        var response = await axios.post("http://localhost:5298/user/register", user);
        return response.data;
    }
    catch(e){
        console.error(e);
    }
}

export const fetchUserStatistics = async (user) => {
    try{
        var response = await axios.get(`http://localhost:5298/user/${user.id}`);
        return response.data;
    }
    catch(e){
        console.error(e);
    }
}

export const updateUser = async (user, data) => {
    try{
        var response = await axios.put(`http://localhost:5298/user/${user.id}`, data);
        return response.data;
    }
    catch(e){
        console.error(e)
    }
}