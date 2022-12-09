import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { BusinessInfo } from "../models/Details";
import { Review, Reviews } from "../models/Reviews";
import { getDetails, getReviews } from "../services/YelpApi";
import "./DetailPage.css"

export const DetailPage = () => {
const [business, setBusiness] = useState<BusinessInfo>();
const [reviews, setReviews] = useState<Reviews>();


const id: string = String(useParams().id); //get id from URL

useEffect(() => {
    getDetails(id).then(res => {
        setBusiness(res.data)
    })

}, [id]);

useEffect(() => {
    getReviews(id).then(res => {
        setReviews(res.data)
    })

}, [id]);

return (
    <div className="detail-card">
        <h2>{business?.name}</h2>
        <div className="business-info">
        <div>{business?.photos && business.photos.slice(0, 3).map((photo) => (
            <img src={photo} alt={business.name}></img>
        ))}</div>
        <div className="text-info">
            <h4>Categories: {business?.categories && business.categories.slice(0, 3).map((category) => (
            <div>{category.title}</div>
            ))}</h4>
            <h4>Address: {business?.location.display_address}</h4>
            <h4>Rating: {business?.rating}</h4>
            <h4>Price: {business?.price}</h4>
            <h4>Phone: {business?.display_phone}</h4>
            <h4>Hours: {business?.hours && business.hours.map((hour) => (
                <div>{hour.open && hour.open.slice(0, 7).map((open) => (
                    <div>
                        <p>{open.day}</p>
                        <p>{open.start}</p>
                        <p>{open.end}</p>
                    </div>
                ))}</div> 
            ))}</h4>
            <h4><a href={business?.url}>Website</a></h4>
        </div>
        </div>
        <h3>Reviews</h3>
        <h4>{reviews?.reviews && reviews.reviews.slice(0, 3).map((review) => (
            <div>
                <p>{review.user.name}</p>
                <p>{review.rating}</p>
                <p className="review-text">{review.text}</p>
            </div>
        ))}</h4>
    </div>
)
}