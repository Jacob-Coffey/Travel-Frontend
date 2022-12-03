import { ReactNode, useEffect, useState, } from 'react';
import { Business, Businesses } from '../models/Business';
import { getHotels } from '../services/YelpApi';
import { YelpContext } from './OpenMapContext';

interface Props{ 
    children: ReactNode;
}

export const YelpContextProvider = ({children}: Props) => {
    const [search, setSearch] = useState<Business[]>([]);
console.log(children)
    useEffect(() => {

        // getHotels( ).then((response) => {
        //     setSearch(response.businesses)
        // })
    }, []);

    return <YelpContext.Provider value={{ search }}>{children}</YelpContext.Provider>
}