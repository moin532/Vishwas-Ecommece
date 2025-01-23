import React from 'react'
import styled from 'styled-components'
import ReactStars from "react-rating-stars-component";

const ReviewCard = ({reviews}) => {
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "orange",
        value:reviews.rating,
        isHalf: true,
        size: window.innerWidth < 600 ? 20 : 25,
      };   


  return (
   <Wrapper>
   
   <div className="reviewCard">
      <p>{reviews.name}</p>
      <div className="stars">
              <ReactStars {...options} />
              {""}
            </div>
      <span className="reviewCardComment">{reviews.comment}</span>
    </div>
   
   
   </Wrapper>
  )
}


const Wrapper = styled.section`
.reviewCard {
  flex: none;

  box-shadow: 0 0 5px rgba(68, 71, 68, 0.226);
  border: 1px solid rgba(150, 144, 144, 0.116);
  width: 30vmax;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1vmax;
  padding: 3vmax;
}


.reviewCard > p {
  color: black;
  font: 700 1vmax "Roboto";
}



.reviewCardComment {
    font-size:22px;
    color: black;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    
  }
  
  .noReviews {
    font: 400 1.3vmax "Gill Sans";
    text-align: center;
    color: #292727;
  }

  @media screen and (max-width: 600px) {
    
  .submitReview {
    font: 500 1.7vmax "Roboto";
    padding: 1.5vmax;
    width: 20vmax;
    margin: 3vmax 0;
  }

  .reviewCard > p {
    font: 600 3vw "Roboto";
  }
  .reviewCardComment {
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-size:20px;
    margin-top:15px;
  }
  
  .reviewCard{
    width:37%;
  }
  
  
}
`
export default ReviewCard