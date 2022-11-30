import axios from 'axios';
import { Business, Businesses } from '../models/Business';
import { Reviews, Review } from '../models/Reviews';
import { BusinessInfo } from '../models/Details';

const url = "http://127.0.0.1:5001/final-d9541/us-central1/api/search";

export const getHotels = (query: string): Promise<Businesses> => {
    return axios.get<Businesses>((url), {
        params: {
            location: query,
            categories: "hotels"
        }
    }).then((response) => {
        return response.data;
    })
};

export const getResturants = (query: string): Promise<Businesses> => {
    return axios.get<Businesses>((url), {
        params: {
            location: query,
            categories: "food"
        }
    }).then((response) => {
        return response.data;
    })
};


export const getReviews = (id: string): Promise<Reviews> => {
    return axios.get<Reviews>(`http://127.0.0.1:5001/final-d9541/us-central1/api/reviews/${id}`).then((response) => {
        return response.data;
    })
};

export const getDetails = (id: string): Promise<BusinessInfo> => {
    return axios.get<BusinessInfo>(`http://127.0.0.1:5001/final-d9541/us-central1/api/reviews/${id}`).then((response) => {
        return response.data;
    })
};



