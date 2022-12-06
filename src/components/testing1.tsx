import { useContext, useEffect, useState } from "react"
import { YelpContext } from "../context/OpenMapContext";
import { Business } from "../models/Business";
import { getHotels } from "../services/YelpApi";

export const Testing = () => {
const [places, setPlaces] = useState<Business[]>([]);

useEffect(() => {
    getHotels("Detroit").then((response) => {
        setPlaces(response.businesses)
    })
}, []);

return (
    <div>
        {places.map((place, i) => {
            return <p key={i}>{place.name}</p>
        })}
    </div>
)
}