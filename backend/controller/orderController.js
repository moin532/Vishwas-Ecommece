const Order = require("../models/orderModel");
const Product = require("../models/productModel");

exports.createOrder = async (req, res) => {
  try {
    const {
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      size,
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res
        .status(400)
        .json({ success: false, msg: "Order items are required" });
    }

    await Order.create({
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      size,
      number: shippingInfo.phoneNo,
      paidAt: Date.now(),
      seller_id: orderItems.length > 0 ? orderItems[0].seller_id : null, // Get seller ID from the first item
    });

    res.status(200).json({
      success: true,
      msg: "Order saved successfully",
    });
  } catch (error) {
    console.log("Error saving order:", error);
    res.status(400).json({
      success: false,
      err: error.message,
    });
  }
};

exports.getSingle = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        msg: "order not found",
      });
    }

    res.status(200).json({
      succes: true,
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      succes: false,
      err: error,
    });
  }
};

exports.myOrder = async (req, res) => {
  try {
    const phoneNumber = req.user.number.trim();

    const orders = await Order.find({ number: phoneNumber });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      err: error.message,
    });
  }
};

exports.adminOrder = async (req, res) => {
  try {
    const seller_id = req.seller._id; // Extract seller ID

    const orders = await Order.find({ seller_id }); // Find all orders for this seller

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      // Use 500 for server errors
      success: false, // Fixed typo (succes → success)
      error: error.message, // Send a proper error message
    });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    console.log(req.body);

    if (order.orderStatus === "Delivered") {
      return res.status(400).json({
        succes: false,
        msg: "order already delivered",
      });
    }

    if (req.body.status === "Shipped") {
      order.orderItems.forEach(async (elem) => {
        await UpdateStock(elem.product, elem.quantity);
      });
    }

    order.orderStatus = req.body.status;

    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      succes: false,
      err: error.message,
    });
  }
};

//function called
async function UpdateStock(id, quantity) {
  const product = await Product.findById(id);
  console.log(product);

  product.Stock -= quantity;

  await product.save({ validateBeforeSave: false });
}

exports.AdminOrder = async (req, res) => {
  try {
    const orders = await Order.find();

    let TotalAmount = 0;

    orders.forEach((elem) => {
      TotalAmount += elem.totalPrice;
    });

    res.status(200).json({
      success: true,
      TotalAmount,
      orders,
    });
  } catch (error) {
    res.status(400).json({
      succes: false,
      err: error.message,
    });
  }
};

exports.dltorder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(400).json({
        succes: false,
        msg: "order not found",
      });
    }

    await order.remove();

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      succes: false,
      err: error.message,
    });
  }
};

// exports.getUserOrder = async (req, res) => {
//   try {
//     const singleOrder = await Order.find({ number: number });

//     if (!singleOrder) {
//       return res.status(400).json({
//         succes: false,
//         msg: "order not found",
//       });
//     }

//     console.log(singleOrder);

//     res.status(200).json({
//       succes: true,
//       singleOrder,
//     });
//   } catch (error) {
//     res.status(400).json({
//       succes: false,
//       err: error.message,
//     });
//   }
// };
