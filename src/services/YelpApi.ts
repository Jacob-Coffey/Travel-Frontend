import axios from 'axios';
import { Business, Businesses } from '../models/Business';
import { Reviews, Review } from '../models/Reviews';
import { BusinessInfo } from '../models/Details';

 const url = "http://127.0.0.1:5001/final-d9541/us-central1/api/search"

export const getHotels = (location: string, price: number): Promise<Businesses> => {
   console.log(location);
   console.log(price);
    return axios.get<Businesses>((url), {
        params: {
            location: location,
            categories: "hotels",
            price: price

        }
    }).then((response) => {
        console.log(response.data);
        return response.data;

    })
};

export const getResturants = (location: string,price: number): Promise<Businesses> => {
    console.log(location);
   console.log(price);

    return axios.get<Businesses>((url), {
        params: {
            location: location,
            categories: "food",
            price: price 
        

        }
    }).then((response) => {
        return response.data;
    })
};

export const getNightlife = (location: string, price: number): Promise<Businesses> => {
    return axios.get<Businesses>((url), {
        params: {
            location: location,
            categories: "nightlife",
            price: price
        }
    }).then((response) => {
        return response.data;
    })
};

export const getBeautySpas = (location: string, price: number): Promise<Businesses> => {
    return axios.get<Businesses>((url), {
        params: {
            location: location,
            categories: "beautysvc",
            price: price
        }
    }).then((response) => {
        return response.data;
    })
};

export const getShopping = (location: string, price: number): Promise<Businesses> => {
    return axios.get<Businesses>((url), {
        params: {
            location: location,
            categories: "shopping",
            price: price
        }
    }).then((response) => {
        return response.data;
    })
}


export const getReviews = (id: string) => {
    return axios.get<Reviews>(`http://127.0.0.1:5001/final-d9541/us-central1/api/reviews/${id}`)
};

export const getDetails = (id: string) => {
    return axios.get<BusinessInfo>(`http://127.0.0.1:5001/final-d9541/us-central1/api/details/${id}`)
};


