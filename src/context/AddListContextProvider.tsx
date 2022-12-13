import { ReactNode, useState } from "react";
import { Business } from "../models/Business";
import { AddListContext } from "./AddListContext";


interface Props {
    children: ReactNode;
}


export default function AddListContextProvider ({ children }: Props) {
    const [lists, setLists] = useState<Business[]>([]);
    const [count, setCount] = useState<number>(0);

 

    const addToList = (newAdd: Business): void => { //whole new business that you want to add will be passed 
        
        const oldList = [...lists]; //these are the businesses that you already have on the list

        
        const newList = oldList.concat(newAdd); //the new list will add both the old list and the new add (concat combines two or more arrays)

        setLists(newList); 
        if(newAdd.categories === "hotels"){
            setCount((10 * newAdd.price.length) + count) 
        }
        if(newAdd.categories === "food"){
        setCount(count + newAdd.price.length)
        }
        if(newAdd.categories === "nightlife"){
            setCount((2 * newAdd.price.length) + count)
        }
        if(newAdd.categories === "beautysvc"){
            setCount((5 * newAdd.price.length) + count)
        }
        if(newAdd.categories === "shopping"){
            setCount((5 * newAdd.price.length) + count)
        }

    };

    const removeFromList = (removedPlace: Business, id: string): void => {
        const oldList = [...lists]; // the already existing list

        const newList = oldList.filter((place) => place.id !== id); // the new list will filter the old list and if the id of the businesses in the existing list is not equal to the id that is passed (id of the business that was clicked), it will filter it out into a new array.

        setLists(newList); //new list without the business that was removed.

        setCount(count - removedPlace.price.length)
    };

    return (
        <AddListContext.Provider value={{ lists, addToList, removeFromList, count }}> 
            {children}
        </AddListContext.Provider>
    );
};

//line 33: exporting methods