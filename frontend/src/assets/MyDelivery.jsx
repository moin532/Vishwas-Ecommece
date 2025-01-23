import React from "react";

const MyDelivery = ({ order }) => {
  return (
    <div
      className="bg-gray-100 min-h-screen  h-auto  p-4"
      style={{ marginBottom: "45vh" }}
    >
      {order &&
        order.map((elem) => (
          <div
            key={elem._id}
            className="max-w-3xl mx-auto overflow-auto  bg-white rounded-lg shadow-md p-6 mb-4"
          >
            <h1 className="text-2xl font-semibold h-auto mb-4">
              Delivery Address
            </h1>

            <div>
              <div className="md:w-1/2 h-auto">
                <p className="text-gray-600 mb-2">Shipping Address:</p>
                <address className="font-semibold">
                  {elem.shippingInfo.address}
                  <br />
                  {elem.shippingInfo.city}, {elem.shippingInfo.district}
                  <br />
                  {elem.shippingInfo.country}
                </address>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default MyDelivery;
