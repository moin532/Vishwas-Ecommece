const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter product Name"],
    trim: true,
  },

  size: {
    type: Number,
  },

  description: {
    type: String,
    required: [true, "Please Enter product Description"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter product Price"],
    maxLength: [8, "Price cannot exceed 8 characters"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        // required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please Enter Product Category"],
  },

  Stock: {
    type: Number,
    required: [true, "Please Enter product Stock"],
    maxLength: [4, "Stock cannot exceed 4 characters"],
    default: 1,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },

  size: {
    type: String,
  },

  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        // required: true,
      },
      name: {
        type: String,
        // required: true,
      },
      rating: {
        type: Number,
        // required: true,
      },
      comment: {
        type: String,
        // required: true,
      },
    },
  ],

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "UserEcom",
    // required: true,
  },
  seller_id: {
    type: mongoose.Schema.ObjectId,
    ref: "SellerSchema",
  },

  // business_id: {
  //   type: "string",
  //   required: true,
  // },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("productsEcom", productSchema);
