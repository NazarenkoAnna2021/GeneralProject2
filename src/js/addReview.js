import { URL } from "./constants";
import { hideShowElement } from "./visibility";
import axios from "axios";
import { DOM_PAGE } from "./pageDom";

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
    changeVisibilityEdding();
}

export function changeVisibilityEdding(){
    hideShowElement(DOM_PAGE.reviewsAdd);
    hideShowElement(DOM_PAGE.reviewArea);
}