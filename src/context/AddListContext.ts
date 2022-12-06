import { createContext } from "react";
import { Business } from "../models/Business";

interface AddListContextModel {
    lists: Business[];
    addToList: (newAdd: Business) => void;
    removeFromList: (id: string) => void;
};

const defaultValue: AddListContextModel = {
    lists: [],
    addToList: () => {},
    removeFromList: () => {},
};

export const AddListContext = createContext(defaultValue);