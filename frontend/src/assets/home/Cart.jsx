import React, { useEffect, useState } from "react";

const Cart = ({ onClose, onBuy }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const res = localStorage.getItem("cart_prd");
    const parsedCartItems = res ? JSON.parse(res) : [];
    setCartItems(parsedCartItems);
  }, []);

  const CancelCart = (id) => {
    const updatedItems = cartItems.filter((item) => item._id !== id);
    setCartItems(updatedItems);
    localStorage.setItem("cart_prd", JSON.stringify(updatedItems));
  };

  const handleOrderNow = () => {
    onBuy(cartItems); // Pass the current cart items to the onBuy function
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end">
      <div className="bg-white w-80 h-full p-4 shadow-lg relative">
        <button
          className="absolute top-2 text-4xl right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-lg font-bold mb-4">Your Cart</h2>

        <div className="flex flex-col space-y-4 overflow-y-auto h-3/4">
          {cartItems.length === 0 ? (
            <p className="text-center">Your cart is empty.</p>
          ) : (
            cartItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 border-b pb-2"
              >
                <img
                  src={item.images[0].url}
                  alt={item.name}
                  className="w-16 h-16 object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-md font-semibold">{item.name}</h3>
                  <p className="text-gray-500">
                    Price: ${item.price.toFixed(2)}
                  </p>
                </div>

                <button
                  className="border hover:bg-orange-400 rounded w-16"
                  onClick={() => {
                    CancelCart(item._id);
                  }}
                >
                  &times; Cancel
                </button>
              </div>
            ))
          )}
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-bold">Total: ${totalPrice.toFixed(2)}</h3>
          <button
            onClick={handleOrderNow} // Use the handleOrderNow function
            className="bg-orange-400 text-white font-bold py-2 px-4 rounded mt-4 w-full hover:bg-orange-500"
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
