const Seller = require("../models/sellerModel");
const jwt = require("jsonwebtoken");

exports.AddSeller = async (req, res) => {
  try {
    const {
      number,
      buisnessName,
      email,
      gst,
      fssai,
      category,
      pincode,
      address,
      gstFile,
      fssaiFile,
      verified,
      role,
    } = req.body;

    const isNumber = await Seller.findOne({ number });

    if (isNumber) {
      return res.status(400).json({
        success: false,
        content: "Already Registered this Number",
      });
    }

    const newSeller = await Seller.create({
      number,
      buisnessName,
      email,
      gst,
      fssai,
      category,
      pincode,
      address,
      verified,
      role,
    });

    const Token = jwt.sign(
      {
        number: newSeller.number,
        seller_id: newSeller._id,
      },
      process.env.JWT_KEY,
      { expiresIn: "10d" }
    );

    res.status(200).json({
      success: true,
      Token,
    });
  } catch (error) {
    res.status(400).json({
      success: false, // Fixed typo (was "succsess")
      error: error.message,
    });
  }
};
