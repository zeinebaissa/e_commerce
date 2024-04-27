import { useState,useEffect } from "react"
import AllReview from "../components/AllReview";
const Review = () => {
    const [reviews,setReviews]=useState([]);
    useEffect(()=>{
        fetch("http://localhost:5000/all-reviews").then(res=>res.json())
        .then(data=> setReviews(data.slice(0,8)))
        })
    ,[]
    return (
      <div>
        <AllReview reviews={reviews} headline="Our Customers"/>
      </div>
    )
  }
  
  export default Review
  