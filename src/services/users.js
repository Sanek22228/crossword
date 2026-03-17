import axios from "axios";
import { use } from "react";

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

export const hello = async () => {
    try{
        var response = await axios.post("http://localhost:5298/user");
        console.log(response.data);
    }
    catch(e){
        console.error(e);
    }
}