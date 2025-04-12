const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  number: {
    type: "String",
  },
  seller_id: {
    type: "String",
    required: true,
  },
  shippingInfo: {
    address: { type: String, required: true },

    city: { type: String, required: true },

    country: { type: String, required: true },

    district: { type: String, required: true },

    pinCode: {
      type: Number,
      required: true,
    },
    phoneNo: {
      type: Number,
      required: true,
    },

    email: {
      type: String,
    },
  },

  orderItems: [
    {
      name: {
        type: String,
        // required:true
      },
      price: {
        type: String,
        // required:true
      },
      size: {
        type: Number,
      },
      image: {
        type: String,
        // required:true
      },
      size: {
        type: Number,
      },
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "productsEcom",
        // required:true
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "UserEcom",
    // required:true
  },

  paymentInfo: {
    id: {
      type: String,
      // required:true
    },
    status: {
      type: String,
      // required:true
    },
  },
  paidAt: {
    type: Date,
    // required:true
  },
  itemsPrice: {
    type: Number,
    default: 0,
    // required:true
  },
  taxPrice: {
    type: Number,
    default: 0,
    // required:true
  },
  shippingPrice: {
    type: Number,
    default: 0,
    // required:true
  },
  totalPrice: {
    type: Number,
    default: 0,
    // required:true
  },

  orderStatus: {
    type: String,
    // required:true,
    default: "Processing",
  },

  deleveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("orderEcom", orderSchema);
