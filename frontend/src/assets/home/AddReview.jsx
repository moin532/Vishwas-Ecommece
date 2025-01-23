import React, { useState, useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import { useSelector, useDispatch } from "react-redux";
import { reviewAction } from "../../action/ProductAction";
import { REVIEW_PRODUCT_RESET } from "../../constant/ProductContanat";
import { toast } from "react-toastify";
const AddReview = ({ onClose, id }) => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const dispatch = useDispatch();
  const { isReview, error, loading } = useSelector((state) => state.reviewprd);
  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  useEffect(() => {
    if (isReview) {
      console.log("entered");

      toast.success(" added successfully");
      window.alert("added successfully");
      onClose();
    }

    if (error) {
      toast.error(error);
      dispatch({ REVIEW_PRODUCT_RESET });
    }
  }, [isReview, error]);
  const HandleSubmit = () => {
    const formData = new FormData();
    formData.set("rating", rating);
    formData.set("productId", id);
    formData.set("comment", review);

    dispatch(reviewAction(formData));
  };

  return (
    <div>
      <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden w-3/4 h-64 max-w-4xl">
          <div className="mb-4 mt-6 ml-5">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="review"
            >
              Enter a Review
            </label>
            <textarea
              className="appearance-none border  font-sans h-20 border-gray-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
              placeholder="Enter a Review"
              value={review}
              onChange={(e) => {
                setReview(e.target.value);
              }}
              required
            />
          </div>

          <div className="ml-5">
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={30}
              isHalf={true}
              activeColor="#ffd700"
            />
          </div>
          <button
            className="bg-blue-500 ml-5 mt-2 w-28 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="bg-blue-700 ml-5 mt-2 w-28 hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={HandleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddReview;
