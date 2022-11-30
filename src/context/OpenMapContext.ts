import { createContext } from "react";
import { Businesses, Business } from '../models/Business';

interface YelpContextModel {
   search: Business[];
}

const defaultValues: YelpContextModel = {
 search: [],
};

export const YelpContext = createContext(defaultValues);