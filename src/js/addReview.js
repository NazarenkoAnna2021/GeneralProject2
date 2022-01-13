import { URL } from "./constants";
import axios from "axios";

async function getResponseMoviePage(setOfParams) {
    try {
        console.log(localStorage.getItem('token'));
        await axios.post(`${URL.URL}/review`, {
            headers: { 'Authorization': localStorage.getItem('token') },
            body: setOfParams
        });
    }
    catch (error) {
       console.log(error);
    }
}

export async function addReview(id, content) {
    await getResponseMoviePage({
        movie_id: id,
        content: content
    });
}