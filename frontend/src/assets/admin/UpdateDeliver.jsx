import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AdminSingleOrd, UpdateSingleOrd } from "../../action/OrderActtion";
import { MdAccountTree } from "react-icons/md";
import { toast } from "react-toastify";
import { UPDATE_ORDERS__RESET } from "../../constant/OrderConstant";

const UpdateDeliver = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [status, setStatus] = useState("");

  const { order, error, loading } = useSelector((state) => state.adminOrd);
  const { isUpdated, err } = useSelector((state) => state.updOrd);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (err) {
      toast.error("error");
      dispatch(clearError());
    }
    if (isUpdated) {
      toast.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDERS__RESET });
    }

    dispatch(AdminSingleOrd(id));
  }, [dispatch, err, error, isUpdated]);

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(UpdateSingleOrd(id, myForm));
  };
  return (
    <div>
      <Wrapper>
        <div className="newProductContainer mt-7">
          <div
            className="confirmOrderPage"
            style={{
              display:
                order && order.orderStatus === "Delivered" ? "block" : "grid",
            }}
          >
            <div>
              <div className="confirmshippingArea">
                <h1>Shipping Info</h1>

                <div className="orderDetailsContainerBox">
                  <div>
                    <p>Name:</p>
                    {/* <span>{order && order.user.name}</span> */}
                  </div>
                  <div>
                    <p>Phone:</p>
                    <span>
                      {order &&
                        order.shippingInfo &&
                        order.shippingInfo.phoneNo}
                    </span>
                  </div>
                  <div>
                    <p>Address:</p>
                    <span>
                      {order &&
                        order.shippingInfo &&
                        `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.district}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                    </span>
                  </div>
                </div>

                <h1>Payment</h1>
                <div className="orderDetailsContainerBox">
                  <div>
                    <p
                      className={
                        order &&
                        order.paymentInfo &&
                        order.paymentInfo.status === "succeeded"
                          ? "greenColor"
                          : "redColor"
                      }
                    >
                      {order &&
                      order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "PAID"
                        : "NOT PAID"}
                    </p>
                  </div>

                  <div>
                    <p>Amount:</p>
                    <span>{order && order.totalPrice && order.totalPrice}</span>
                  </div>
                </div>

                <h1>Order Status</h1>
                <div className="orderDetailsContainerBox">
                  <div>
                    <p
                      className={
                        order &&
                        order.orderStatus &&
                        order.orderStatus === "Delivered"
                          ? "greenColor"
                          : "redColor"
                      }
                    >
                      {order && order.orderStatus && order.orderStatus}
                    </p>
                  </div>
                </div>
              </div>
              <div className="confirmCartItems">
                <h1>Your Cart Items:</h1>
                <div className="confirmCartItemsContainer">
                  {order &&
                    order.orderItems &&
                    order.orderItems.map((item) => (
                      <div key={item.product}>
                        <img src={item.image} alt="Product" />
                        <Link to={`/product/${item.product}`}>
                          {item.name}
                        </Link>{" "}
                        <span>
                          {item.quantity} X ₹{item.price} ={" "}
                          <b>₹{item.price * item.quantity}</b>
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            {/*  */}
            <div
              style={{
                display:
                  order && order.orderStatus === "Delivered" ? "none" : "block",
              }}
            >
              <form
                className="updateOrderForm"
                onSubmit={updateOrderSubmitHandler}
              >
                <h1>Process Order</h1>

                <div>
                  <MdAccountTree />
                  <select onChange={(e) => setStatus(e.target.value)}>
                    <option value="">Choose Category</option>
                    {order && order.orderStatus === "Processing" && (
                      <option value="Shipped">Shipped</option>
                    )}

                    {order && order.orderStatus === "Shipped" && (
                      <option value="Delivered">Delivered</option>
                    )}
                  </select>
                </div>

                <button
                  id="createProductBtn"
                  type="submit"
                  className="button"
                  disabled={
                    loading ? true : false || status === "" ? true : false
                  }
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};
const Wrapper = styled.section`
  .updateOrderForm {
    margin: 5vmax 0;
    padding: 3vmax;
  }

  .button {
    background-color: #04aa6d; /* Green */
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
  }

  .updateOrderForm > div {
    display: flex;
    width: 100%;
    align-items: center;
  }
  .updateOrderForm > div > select {
    padding: 1vmax 4vmax;
    margin: 2rem 0;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.463);
    border-radius: 4px;
    font: 300 0.9vmax serif;
    outline: none;
  }

  .updateOrderForm > div > svg {
    position: absolute;
    transform: translateX(1vmax);
    font-size: 1.6vmax;
    color: rgba(0, 0, 0, 0.623);
  }

  /* ssssssssssssssssss */

  .orderDetailsContainer > h1 {
    font: 300 3vmax "Roboto";
    margin: 4vmax 0;
    color: tomato;
  }

  .orderDetailsContainer {
    padding: 5vmax;
    padding-bottom: 0%;
  }

  .orderDetailsContainer > p {
    font: 400 1.8vmax "Roboto";
  }

  .orderDetailsContainerBox,
  .orderDetailsCartItemsContainer {
    margin: 2vmax;
  }

  .orderDetailsContainerBox > div {
    display: flex;
    margin: 1vmax 0;
  }

  .orderDetailsContainerBox > div > p {
    font: 400 1vmax "Roboto";
    color: black;
  }
  .orderDetailsContainerBox > div > span {
    margin: 0 1vmax;
    font: 100 1vmax "Roboto";
    color: #4e4343;
  }

  .orderDetailsCartItems > p {
    font: 400 1.8vmax "Roboto";
  }

  .orderDetailsCartItems {
    padding: 2vmax 5vmax;
    border-top: 1px solid rgba(0, 0, 0, 0.164);
  }

  .confirmCartItemsContainer > div {
    display: flex;
    font: 400 1vmax "Roboto";
    align-items: center;
    margin: 2vmax 0;
  }

  .confirmCartItemsContainer > div > img {
    width: 3vmax;
  }

  .confirmCartItemsContainer > div > a {
    color: #575757;
    margin: 0 2vmax;
    width: 60%;
    text-decoration: none;
  }

  .confirmCartItemsContainer > div > span {
    font: 100 1vmax "Roboto";
    color: #5e5e5e;
  }

  @media screen and (max-width: 600px) {
    .updateOrderForm {
      padding: 5vmax;
    }

    .updateOrderForm > div > select {
      padding: 2.5vmax 5vmax;
      font: 300 1.7vmax cursive;
    }

    .updateOrderForm > div > svg {
      font-size: 2.8vmax;
    }
  }

  .newProductContainer {
    margin-left: 25px;
  }
`;

export default UpdateDeliver;
