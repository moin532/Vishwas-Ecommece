import React, { useEffect, useState } from "react";
import { GoArrowRight } from "react-icons/go";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { OrderAction } from "../action/OrderActtion";
import { toast } from "react-toastify";
import { LoadUSer } from "../action/UserAction";

const CartForm = ({ show, onClose, product, size }) => {
  const dispatch = useDispatch();

  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pinCode, setPincode] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [Block, setBlock] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [Allprd, setAllprd] = useState([]);

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const { error, loading, isOrder } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.userE);

  console.log(user);
  useEffect(() => {
    const res = localStorage.getItem("cart_prd");
    let parsedCartItems = res ? JSON.parse(res) : [];
    if (!parsedCartItems) {
      setAllprd([""]);
    }

    // If product is passed directly as a prop (i.e., direct purchase scenario)
    if (product) {
      // Check if the product is already in the cart
      const isProductInCart = parsedCartItems.some(
        (item) => item._id === product._id
      );

      if (!isProductInCart) {
        // Direct purchase: add the single product to cart items
        parsedCartItems = [product];
      }
    }

    if (isOrder) {
      toast.success("Order saved successfully");
      onClose();
    }

    if (error) {
      toast.error(error);
    }

    if (user) {
      setStep((prevStep) => (prevStep !== 2 ? 2 : prevStep));
      setEmail(user[0]?.email || "");
      setPhoneNumber(user[0]?.number || "");
    }

    setAllprd(parsedCartItems);
  }, [product, isOrder, error, user, setStep]);

  useEffect(() => {
    dispatch(LoadUSer());
  }, []); // Removed dispatch from dependencies

  const handlePincodeChange = async (e) => {
    const newPincode = e.target.value;
    setPincode(newPincode);

    if (newPincode.length === 6) {
      try {
        const response = await axios.get(
          `https://api.postalpincode.in/pincode/${newPincode}`
        );
        const data = response.data[0];

        if (data.Status === "Success") {
          const postOffice = data.PostOffice[0];
          setDistrict(postOffice.District);
          setState(postOffice.State);
          setBlock(postOffice.Block);
        } else {
          setDistrict("");
          setState("");
          setBlock("");
        }
      } catch (error) {
        setDistrict("");
        setState("");
        setBlock("");
      }
    } else {
      setDistrict("");
      setState("");
      setBlock("");
    }
  };

  if (!product || loading) {
    return <h1>Loading...</h1>;
  }

  const Order = {
    shippingInfo: {
      address: address,
      city: Block,
      state: state,
      district: district,
      country: "India",
      pinCode: pinCode,
      phoneNo: user?.number || phoneNumber,
      email: email,
    },
    orderItems: [], // Initialize as an empty array
    itemsPrice: 0, // Total price will be calculated
    seller_id: product?.seller_id,
  };

  // Iterate over Allprd to create orderItems
  Allprd.forEach((item) => {
    const orderItem = {
      product: item._id,
      name: item.name,
      price: item.price,
      size: size,
      image: item?.images && item?.images[0]?.url,
      seller_id: item?.seller_id,
    };

    Order.itemsPrice += item.price; // Accumulate the total price
  });

  if (!show) return null;

  const handleNumberSubmit = (e) => {
    e.preventDefault();

    const isNumberValid = user?.number
      ? user.number.length === 10
      : phoneNumber.length === 10;

    if (!isNumberValid) {
      toast.error("Invalid number");
      return;
    }

    setStep(2);
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();

    if (Allprd.length === 0) {
      toast.error("No products selected");
      return;
    }

    setStep(3);

    // else {
    //   toast.success("Order saved successfully");
    //   onClose(); // Close the popup after submission
    // }
  };

  const HandelLastSubmit = () => {
    dispatch(OrderAction(Order));

    if (error) {
      toast.error(error);
    }
  };
  const validCoupons = {
    SAVE10: 10, // 10% discount
    SAVE20: 20, // 20% discount
  };

  const applyCoupon = () => {
    if (validCoupons[coupon]) {
      setDiscount(validCoupons[coupon]);
    } else {
      setDiscount(0);
      alert("Invalid Coupon Code");
    }
  };

  const originalPrice = Order?.itemsPrice;
  const finalPrice = originalPrice - (originalPrice * discount) / 100;
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-3/4 max-w-4xl relative">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-6">
            {step === 1 ? (
              <form onSubmit={handleNumberSubmit}>
                <h2 className="text-xl font-bold mb-4">
                  Enter Your Phone Number
                </h2>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="phone"
                  >
                    Phone Number
                  </label>
                  <input
                    className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                    id="phone"
                    type="tel"
                    placeholder="123-456-7890"
                    value={user ? user.number : phoneNumber}
                    required
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            ) : (
              ""
            )}
            {step === 2 ? (
              <form onSubmit={handleAddressSubmit}>
                <h2 className="text-xl font-bold mb-4">Enter Your Address</h2>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="pincode"
                  >
                    Enter a PinCode
                  </label>
                  <input
                    className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                    id="pincode"
                    type="text"
                    required
                    placeholder="PinCode"
                    value={pinCode}
                    onChange={handlePincodeChange}
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="district"
                  >
                    District
                  </label>
                  <input
                    className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="district"
                    type="text"
                    required
                    value={district}
                    placeholder="District will autofill"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="state"
                  >
                    State
                  </label>
                  <input
                    className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="state"
                    type="text"
                    value={state}
                    required
                    placeholder="State will autofill"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="block"
                  >
                    Block
                  </label>
                  <input
                    className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="block"
                    type="text"
                    value={Block}
                    required
                    placeholder="Block will autofill"
                  />
                </div>
                <div className="mb-4">
                  <input
                    className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="address"
                    type="text"
                    value={address}
                    required
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Full address (House No, Area, etc.)"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                </div>

                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Place Order
                </button>
              </form>
            ) : (
              ""
            )}
            {step === 3 ? (
              <div className=" flex flex-col items-center justify-center bg-gray-100">
                <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
                  <h2 className="text-2xl font-semibold mb-4 text-center">
                    Checkout
                  </h2>

                  {/* Payment Method Selection */}
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                      Select Payment Method
                    </label>
                    <select
                      className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200"
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                      <option value="COD">Cash on Delivery</option>
                      <option value="Online">Online Payment</option>
                    </select>
                  </div>

                  {/* Coupon Code */}
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                      Coupon Code
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        className="w-full p-2 border rounded-l-lg focus:ring focus:ring-blue-200"
                        placeholder="Enter coupon code"
                        value={coupon}
                        onChange={(e) =>
                          setCoupon(e.target.value.toUpperCase())
                        }
                      />
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
                        onClick={applyCoupon}
                      >
                        Apply
                      </button>
                    </div>
                  </div>

                  {/* Price Details */}
                  <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-700">
                      Original Price:{" "}
                      <span className="font-semibold">₹{originalPrice}</span>
                    </p>
                    <p className="text-gray-700">
                      Discount:{" "}
                      <span className="font-semibold">{discount}%</span>
                    </p>
                    <p className="text-xl font-semibold text-green-600">
                      Final Price: ₹{finalPrice.toFixed(2)}
                    </p>
                  </div>

                  {/* Place Order Button */}
                  <button
                    className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
                    onClick={() => HandelLastSubmit()}
                  >
                    Place Order
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="bg-gray-100 p-6 hidden md:block">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            <ul>
              {Allprd.map((item) => (
                <li
                  key={item._id}
                  className="flex justify-between items-center mb-4"
                >
                  <div>
                    <h4 className="font-semibold">{item.name}</h4>
                    <p>{item.size}</p>
                    <p>₹{item.price}</p>
                  </div>
                  <div>
                    <img
                      src={item?.images && item?.images[0]?.url}
                      alt={item.name}
                      className="w-16 h-16 object-cover"
                    />
                  </div>
                </li>
              ))}
            </ul>
            <p className="text-lg font-bold mt-6">
              Total Price: ₹{Order.itemsPrice}
            </p>
          </div>
        </div>
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CartForm;
