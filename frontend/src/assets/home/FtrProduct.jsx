import React, { useEffect } from "react";
import styled from "styled-components";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

const FtrProduct = ({ elem }) => {
  if (!elem) {
    return <div>...loading</div>;
  }

  // const options = {
  //   edit: false,
  //   color: "gray",
  //   activeColor: "orange",
  //   value: elem.ratings,
  //   isHalf: true,
  //   size: window.innerWidth < 600 ? 20 : 25,
  // };

  return (
    <Wrapper>
      <div></div>
      <div className="" id="card">
        <Link to={`/product/${elem._id}`}>
          {/* <img
          src="https://images.unsplash.com/photo-1562273138-f46be4ebdf33?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        /> */}
          {/* 
{elem.images &&
                elem.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url[0]}
                      alt={`${i} Slide`}
                    />
                  ))} */}

          <img src={elem?.images[0]?.url} alt={elem.name} />

          {console.log(elem.images)}
          <div className="content">
            <p>{elem.name}</p>

            <p id="desc">{elem.description.slice(0, 20)}</p>
            <p id="price">
              <p>
                ₹{elem.price}
                <span style={{ color: "grey", marginLeft: "20px" }}>
                  <s>{elem.price + 200}</s>
                </span>
              </p>
            </p>
            {/* <div className="stars">
              <ReactStars {...options} />
              {""}
            </div> */}
          </div>
        </Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  #card {
    width: 18vmax;
    display: flex;
    flex-direction: column;
    text-decoration: none;
    color: rgb(23, 21, 21);
    margin: 2vmax;
    transition: all 0.5s;
    padding-bottom: 0.5vmax;
  }

  img {
    width: 18vmax;
    height: 40ch;
    min-width: 100%;
    max-width: 100%;
    max-height: 80vh;
  }

  #card:hover {
    transform: scale(0.96);
    box-shadow: 10 12 25px rgba(247, 6, 239, 0.26);
  }
  &:hover::after {
    width: 100%;
  }

  .content {
    font-family: "sans-serif";
    font-size: 28px;
    color: black;
    font-weight: 100;
    margin: 0 auto; /* Centers horizontally */
    width: fit-content; /* Ensures the element doesn’t stretch the full width */
  }

  #price {
    margin: 0.5vmax;
    color: green;
    font-size: 25px;
    font-weight: bold;
  }

  #desc {
    color: rgb(41, 39, 39);
    font-weight: 100;
    font-style: 28px;
    font-size: 25px;
  }
`;
export default FtrProduct;
