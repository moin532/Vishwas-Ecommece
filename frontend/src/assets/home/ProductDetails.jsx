import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ReactStars from "react-rating-stars-component";
import { BiSolidOffer } from "react-icons/bi";
import { TbTruckDelivery } from "react-icons/tb";
import { MdSecurity } from "react-icons/md";
import { TbReplace } from "react-icons/tb";
import CartForm from "../../cart/CartForm";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DetailsPrd } from "../../action/ProductAction";
import SimiliarProduct from "./SimiliarProduct";
import ReviewCard from "./ReviewCard";
import { toast } from "react-toastify";
import AddReview from "./AddReview";
import { LoadUSer } from "../../action/UserAction";
import Loader from "../../../Loader";
import { FaCartArrowDown } from "react-icons/fa";
import Cart from "./Cart";
const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { error, product, loading } = useSelector((state) => state.prdDetails);
  const { isAuthenticated } = useSelector((state) => state.userE);

  const [showPopup, setShowPopup] = useState(false);
  const [size, setSize] = useState("");
  const [openReview, setopenReview] = useState(false);
  const [cart, setcart] = useState(false);
  const [addCart, setAddcart] = useState([]);
  const [cartValue, setcartValue] = useState([]);

  const options = {
    edit: false,
    color: "gray",
    activeColor: "orange",
    value: product.ratings,
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 25,
  };

  useEffect(() => {
    if (error) {
      window.alert(error);
    }
    window.scrollTo(0, 0);
    dispatch(DetailsPrd(id));
    dispatch(LoadUSer());

    const res = localStorage.getItem("cart_prd");
    const parsedCartItems = res ? JSON.parse(res) : [];
    setcartValue(parsedCartItems);
  }, [dispatch, id, addCart]);

  console.log(cartValue);

  const [image, setImage] = useState("");

  const HandleImage = (url) => {
    setImage(url);
  };

  const HandleOpen = () => {
    if (product.size) {
      if (size) {
        setShowPopup(true);
      } else {
        toast.error("Please Select a Size");
        setShowPopup(false);
      }
    } else {
      setShowPopup(true);
    }
  };

  const ReviewHandle = () => {
    setopenReview(!openReview);
  };

  const AddToCartHandler = () => {
    const currentCart = JSON.parse(localStorage.getItem("cart_prd")) || [];

    const updatedCart = [...currentCart, product];

    localStorage.setItem("cart_prd", JSON.stringify(updatedCart));

    setAddcart(updatedCart);

    setcart(!cart);
  };

  const uri = product.images && product.images[0].url;

  return (
    <Wrapper>
      {loading ? (
        <Loader />
      ) : (
        <div>
          {cart && (
            <Cart
              onClose={() => setcart(false)}
              onBuy={() => setShowPopup(true)}
            />
          )}
          <div className=" grid grid-cols-2  ">
            <div className="  w-3/5 ml-20  mt-16 ">
              {image && image ? (
                <img src={image} alt="Selected" className="large-image" />
              ) : (
                <img src={uri} alt="Selected" className="large-image" />
              )}

              <div
                className="  w-auto mt-4 grid  grid-cols-4  gap-9 "
                id="sub-img"
              >
                {product.images &&
                  product.images.map((ur, index) => (
                    // console.log(ur.url,"map")
                    <img
                      key={index}
                      src={ur.url}
                      alt={`Image ${index}`}
                      onClick={() => {
                        HandleImage(ur.url);
                      }}
                    />
                  ))}
              </div>
            </div>

            <div className="mt-16">
              <div className=" font-semibold text-4xl">
                <h1>{product.category} </h1>

                <h1 id="cmp-name">
                  {product.name}{" "}
                  <span className="    text-sm   text-black">
                    ({product?.numOfReviews} Reviews)
                  </span>
                </h1>

                <div className=" flex ">
                  <ReactStars {...options} />
                  <span className=" text-2xl ml-3 mt-1  text-orange-600">
                    {product.ratings > 0 ? Math.round(product.ratings, 2) : ""}
                    star
                  </span>
                </div>

                <div className="">
                  <p className=" text-2xl mt-5">
                    Status:
                    <b
                      className={
                        product.Stock < 1 ? "text-red-500" : " text-green-700"
                      }
                    >
                      {product.Stock < 1 ? "OutOfStock" : "InStock"}
                    </b>
                  </p>
                </div>

                <div className="mt-6">
                  <h1>
                    {" "}
                    ₹: <span className=" text-green-800">
                      {product.price}
                    </span>{" "}
                    <span className=" text-2xl  text-red-600">
                      <s>{product.price + 200}</s>
                    </span>
                  </h1>
                </div>
              </div>

              {product.size ? (
                <div className=" mt-8 ">
                  <select
                    name="sss"
                    className="w-96 text-2xl font-serif border-y border-black"
                    onChange={(e) => setSize(e.target.value)} // Update the size on change
                    required
                  >
                    <option value="">Choose a Size</option>
                    {product.size
                      .split(",") // Split the string by commas
                      .map((sizeValue) => sizeValue.trim()) // Trim whitespace
                      .filter((sizeValue) => sizeValue !== "0") // Remove "0"
                      .map(
                        (
                          sizeValue,
                          index // Map the cleaned values to options
                        ) => (
                          <option key={index} value={sizeValue}>
                            {sizeValue}
                          </option>
                        )
                      )}
                  </select>
                </div>
              ) : (
                ""
              )}

              <div className="mt-10 text-2xl font-serif font">
                <h1>{product.description}</h1>
              </div>

              <button
                onClick={AddToCartHandler}
                className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 h-10 mt-7 mb-2 rounded w-44 flex items-center justify-center"
              >
                <FaCartArrowDown className="mr-2" />
                <span>Add To Cart</span>
              </button>

              <div className="product-data-warranty">
                <div className="product-warranty-data">
                  <TbTruckDelivery className="warranty-icon" />
                  <p>Fast Delivery</p>
                </div>

                <div className="product-warranty-data">
                  <TbReplace className="warranty-icon" />
                  <p>Recycle</p>
                </div>

                <div className="product-warranty-data">
                  <TbTruckDelivery className="warranty-icon" />
                  <p>MM Delivered </p>
                </div>

                <div className="product-warranty-data">
                  <MdSecurity className="warranty-icon" />
                  <p>quality Product</p>
                </div>
              </div>

              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4   mt-7 mb-10 rounded w-96"
                onClick={() => HandleOpen()}
              >
                Buy - Now
              </button>

              {isAuthenticated && (
                <button
                  className="bg-blue-500 hover:bg-blue-500 text-white font-bold py-2 px-4  ml-28   rounded  w-36"
                  onClick={() => ReviewHandle()}
                >
                  Add Review
                </button>
              )}

              <CartForm
                show={showPopup}
                product={product}
                onClose={() => setShowPopup(false)}
                size={size}
              />
            </div>
          </div>

          {openReview && (
            <AddReview onClose={() => setopenReview(false)} id={id} />
          )}

          <div>
            <SimiliarProduct category={product.category} />
          </div>

          {product.reviews && product.reviews[0] ? (
            <div>
              <div>
                <h1 className="flex justify-center  mt-12 text-3xl font-serif">
                  PRODUCT REVIEWS
                </h1>
              </div>

              <div className="reviews">
                {product.reviews &&
                  product.reviews.map((reviews) => (
                    <ReviewCard key={reviews._id} reviews={reviews} />
                  ))}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  #cmp-name {
    font-family: "Mukta";
    margin-top: 25px;
    color: #be7b33;
  }

  #sub-img,
  img {
    min-height: 15vh;
  }

  .product-data-warranty {
    width: 80%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    margin-bottom: 1rem;
    margin-top: 30px;

    .product-warranty-data {
      text-align: center;

      .warranty-icon {
        border-radius: 50%;
        width: 4rem;
        height: 4rem;
        padding: 0.6rem;
      }
      p {
        font-size: 1rem;
        padding-top: 0.4rem;
      }
    }
  }

  .reviews {
    display: flex;
    overflow: auto;
  }
  .review-card {
    margin-top: -17px;
    display: flex;
    justify-content: center;
  }
  textarea {
    width: 100vh;
    height: 10vh;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 20px;
  }

  .noReviews {
    margin-top: 10px;
    font: 400 1.3vmax "Gill Sans";
    text-align: center;
    color: #ad6e6e;
    text-shadow: rgb(250 116 142) 0px 0px 10px, rgb(243, 243, 247) 0px 0px 20px,
      rgb(216, 113, 42) 0px 0px 30px;
  }
`;
export default ProductDetails;
