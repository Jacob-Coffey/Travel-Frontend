import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom";
import { BusinessInfo } from "../models/Details";
import { Review, Reviews } from "../models/Reviews";
import { getDetails, getReviews } from "../services/YelpApi";
import "./DetailPage.css"
import { GiRoundStar } from 'react-icons/gi'
import { AddListContext } from "../context/AddListContext";
import { deleteFromFavorites, postToFavorites } from "../services/DbApi";
import { RiAddFill } from 'react-icons/ri'
import { TiMinus } from 'react-icons/ti'
import { BsThreeDots } from 'react-icons/bs'

export const DetailPage = () => {
const [business, setBusiness] = useState<BusinessInfo>();
const [reviews, setReviews] = useState<Reviews>();
const { lists, addToList, removeFromList } = useContext(AddListContext) 


  const check = (id: string) => { 
    const boolean = lists.some((business) => business.id === id); 
    return boolean
  }


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
        <div className="detail-container">
        <div className="photos">{business?.photos && business.photos.slice(0, 3).map((photo) => (
            <img className="detail-photo"src={photo} alt={business.name}></img>
        ))}</div>
        <h2 className="detail-name">{business?.name}</h2>
        <div className="category-container">{business?.categories && business.categories.slice(0, 3).map((category) => (
            <div className="category">{category.title}</div>
            ))}</div>
        <div className="detail-rating"><GiRoundStar color="#ffae42" />{business?.rating} from {reviews?.total} reviews </div>
        
        <div className="business-info">
            
        <div className="info-container">
            <div className="info-text">
            {/* <div className="detail-rating"><GiRoundStar color="#ffae42" />     {business?.rating}   from   <div>{reviews?.total}   reviews</div></div> */}
            <div className="price-container"><div className="detail-price">Price:</div><div className="price">{business?.price}</div></div>
            <div className="address-container"><div className="detail-address">Address:</div><div className="address">{business?.location.display_address}</div></div>
            <div className="phone-container"><div className="detail-phone">Phone: </div><div className="phone">{business?.display_phone}</div></div>
            {/* <h4>Hours: {business?.hours && business.hours.map((hour) => (
                <div>{hour.open && hour.open.slice(0, 7).map((open) => (
                    <div>
                        <p>{open.day}</p>
                        <p>{open.start}</p>
                        <p>{open.end}</p>
                    </div>
                ))}</div> 
            ))}</h4> */}
            <h4 className="website"><a href={business?.url} target="_blank">Website</a></h4>
            </div>
        
            <div className="review-container">
        <h2 className="review-title">Reviews</h2>
        <h4>{reviews?.reviews && reviews.reviews.slice(0, 3).map((review) => (
            <div className="reviews">
                <div className="star-review">
                    <p className="star"><GiRoundStar color="#ffae42" /></p>
                    <p className="review-rating">{review.rating}</p>
                </div>
                <div>
                    <p className="username">{review.user.name}</p>
                    <p className="review-text">{review.text}<a href={business?.url} target="_blank">read more</a></p>
                </div>
            </div>
        ))}</h4>
        </div>
        </div>
        </div>
        </div>
    </div>
)
}