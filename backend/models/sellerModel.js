const mongoose = require("mongoose");

const SellerSchema = new mongoose.Schema({
  buisnessName: {
    type: "string",
    required: [true, "pls enter your buisness name"],
  },
  number: {
    type: "string",
    required: [true, "pls enter your buisness Number"],
  },
  email: {
    type: "string",
  },
  gst: {
    type: "string",
  },
  fssai: {
    type: "string",
  },
  gstFile: {
    public_id: {
      type: String,
      // required: true,
    },
    url: {
      type: String,
      // required: true,
    },
  },
  fssaiFile: {
    public_id: {
      type: String,
      // required: true,
    },
    url: {
      type: String,
      // required: true,
    },
  },
  category: {
    type: "string",
  },
  pincode: {
    type: "string",
  },
  address: {
    type: "string",
  },

  verified: {
    type: String,
    default: "pending",
  },

  role: {
    type: String,
    default: "seller",
  },
});

module.exports = mongoose.model("SellerSchema", SellerSchema);
