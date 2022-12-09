import axios from "axios"
import { Business } from "../models/Business";

export const getFavoritesList = ():Promise<Business[]> => {
    return axios.get<Business[]>('http://127.0.0.1:5001/gc-project-66a56/us-central1/api/db').then((response) => {
        return response.data;
    })
};

export const postToFavorites = (place: Business):Promise<Business> => {
    return axios.post<Business>('http://127.0.0.1:5001/gc-project-66a56/us-central1/api/db', place).then((response) => {
        return response.data;
    })
};

export const deleteFromFavorites = (place: Business):Promise<Business> => {
    return axios.delete<Business>('http://127.0.0.1:5001/gc-project-66a56/us-central1/api/db', place).then((response) => {
        return response.data;
    })
};