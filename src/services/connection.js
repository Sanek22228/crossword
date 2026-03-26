import axios from "axios";

export async function fethcHealth(){
    var response = await axios.get("http://localhost:5298/health");
    return response.data;
}