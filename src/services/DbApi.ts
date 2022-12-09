import axios from "axios";
import { Business } from "../models/Business";

export const getFavoritesList = ():Promise<Business[]> => {
    return axios.get<Business[]>("http://127.0.0.1:5001/final-d9541/us-central1/api/db/list").then((response) => {
        return response.data;
    })
}

export const postToFavorites = (place: Business):Promise<Business> => {
    return axios.post<Business>("http://127.0.0.1:5001/final-d9541/us-central1/api/db/list", place).then((response) => {
        return response.data;
    })
}

export const deleteFromFavorites = (place: Business):Promise<Business> => {
    return axios.delete<Business>("http://127.0.0.1:5001/final-d9541/us-central1/api/db/list", place).then((response) => {
        return response.data;
    })
}