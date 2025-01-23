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

  const { error, loading, isOrder } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.userE);

  useEffect(() => {
    dispatch(LoadUSer());

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

    setAllprd(parsedCartItems);
  }, [dispatch, product]);

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
        console.error("Error fetching address details:", error);
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
      phoneNo: user ? user.number : phoneNumber,
      email: email,
    },
    orderItems: [], // Initialize as an empty array
    itemsPrice: 0, // Total price will be calculated
  };

  // Iterate over Allprd to create orderItems
  Allprd.forEach((item) => {
    const orderItem = {
      product: item._id,
      name: item.name,
      price: item.price,
      size: size,
      image: item.images && item.images[0].url,
    };

    Order.orderItems.push(orderItem);
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

    dispatch(OrderAction(Order));

    console.log(Order);

    if (error) {
      toast.error(error);
    } else {
      toast.success("Order saved successfully");
      onClose(); // Close the popup after submission
    }
  };

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
                      src={item.images && item.images[0].url}
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
