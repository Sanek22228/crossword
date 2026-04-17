import axios from "axios";

export async function fetchHealth(){
    var response = await axios.get("http://localhost:5298/health");
    return response.data;
}