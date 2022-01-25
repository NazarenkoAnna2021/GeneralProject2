import { pathmames, URL } from "./constants";
import { hideShowElement } from "./visibility";
import { appendReviewToDOM } from "./filmPageLogic";
import axios from "axios";
import { DOM_PAGE } from "./pageDom";

async function setReview(id, content) {
    try {
        await axios.post(`${URL.URL}${pathmames.review}`,
            { movie_id: id, content: content },
            {
                headers: { 'Authorization': localStorage.getItem('token') },
            });
    }
    catch (error) {
        console.dir(error.response.data.error);
    }
}

async function getReviews(id) {
    try {
        const response = await axios.get(`${URL.URL}${pathmames.review}`,
            {
                headers: { 'Authorization': localStorage.getItem('token') },
                params: { id: id }
            });
        return response.data.data
    }
    catch (error) {
        console.dir(error.response.data.error);
    }
}

export async function addReview(id, content = '') {
    await setReview(id, content);
    changeVisibilityEdding();
    const reviews = await getReviews(id);
    DOM_PAGE.reviewArea.innerHTML = '';
    if (reviews) appendReviewToDOM(reviews);
}

export function changeVisibilityEdding() {
    hideShowElement(DOM_PAGE.reviewsAdd);
    hideShowElement(DOM_PAGE.reviewArea);
}