import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { BusinessInfo } from "../models/Details";
import { getDetails } from "../services/YelpApi";

export const DetailPage = () => {
const [business, setBusiness] = useState<BusinessInfo>();


const id: string = String(useParams().id); //get id from URL

useEffect(() => {
    getDetails(id).then(res => {
        setBusiness(res.data)
    })
}, [id]);

return (
    <div>
        <h2>{business?.name}</h2>
        <img src={business?.image_url} alt={business?.name}></img>
        <h4>Categories: {business?.categories && business.categories.slice(0, 3).map((category) => (
        <div>{category.title}</div>
        ))}</h4>
        <h4>Location: {business?.location.display_address}</h4>
        <h4>Rating: {business?.rating}</h4>
        <h4>Price: {business?.price}</h4>
        <h4>Hours: </h4>
        <h4>Phone: {business?.display_phone}</h4>
        <h4>Website: {business?.url}</h4>
    </div>
)
}