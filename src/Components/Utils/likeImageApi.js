
import { getLocalStroage } from "../lib/windowError";
import axios from "axios";
export const LikeImageApi = async ({ id }) => {
    alert(id)
    if (!getLocalStroage()) {
        alert("login first")
    } else {

        const response = await axios.put(process?.env?.REACT_APP_GPT5_IMAGE_OJ + `likeImages/` + `${id}`, {
            Like_user: getLocalStroage(),
            createdAt: Date.now(),
        });
        console.log("liker", response.data)
    }
}