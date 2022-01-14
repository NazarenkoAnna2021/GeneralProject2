import { pathmames, URL } from "./constants";
import { hideShowElement } from "./visibility";
import axios from "axios";
import { DOM_PAGE } from "./pageDom";

async function getResponseMoviePage(id, content) {
    try {
        const response = await axios.post(`${URL.URL}${pathmames.review}`,
            { movie_id: id, content: content },
            {
                headers: { 'Authorization': localStorage.getItem('token') },
            });
    }
    catch (error) {
        console.dir(error.response.data.error);
    }
}

export async function addReview(id, content) {
    await getResponseMoviePage(id, content);
    changeVisibilityEdding();
    location.reload()
}

export function changeVisibilityEdding() {
    hideShowElement(DOM_PAGE.reviewsAdd);
    hideShowElement(DOM_PAGE.reviewArea);
}