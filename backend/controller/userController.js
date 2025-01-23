const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const randomstring = require("randomstring");
const nodemailer = require("nodemailer");

exports.LoginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({
        success: false,
        content: "Incorrect credentials",
      });
    }

    const isMatch = bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        content: "Incorrect credentials",
      });
    }

    const Token = jwt.sign(
      {
        email: user.email,
        user_id: user._id,
      },

      process.env.JWT_KEY,
      { expiresIn: "10d" }
    );

    res.status(200).json({
      success: true,
      Token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      err: error.message,
    });
  }
};

let otpStore = {};
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

console.log(otpStore);

exports.sendOtp = async (req, res) => {
  const { email } = req.body;

  const otp = randomstring.generate({
    length: 4,
    charset: "numeric",
  });

  console.log(otp);

  otpStore[email] = otp;

  const mailOptions = {
    from: "your-email@gmail.com",
    to: email,
    subject: "Your OTP Code",
    text: ` ${otp} is Your OTP (One Time Password) to Login at MM Ecommerce.Never Share OTP with anyone.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({
        success: false,
        err: error.message,
      });
    }
    res.status(200).json({
      success: true,
      msg: "email Send Succesfully",
    });
  });
};

exports.VerifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email: email });

  let Token = "";
  if (user) {
    Token += jwt.sign(
      {
        email: user.email,
        user_id: user._id,
      },
      process.env.JWT_KEY,
      { expiresIn: "10d" }
    );
  }

  console.log(email, otp);
  if (otpStore[email] === otp) {
    delete otpStore[email]; // Remove OTP after successful verification
    res.status(200).json({ message: "OTP verified", Token });
  } else {
    res.status(400).json({ message: "Invalid OTP" });
  }
};

exports.Register = async (req, res) => {
  try {
    const { name, email, number } = req.body;

    const isEmail = await User.findOne({ email: email });

    if (isEmail) {
      return res.status(400).json({
        success: false,
        msg: "Email  already exsit",
      });
    }

    const newUser = await User.create({
      name: name,
      email: email,
      number: number,
    });

    const Token = jwt.sign(
      {
        email: newUser.email,
        user_id: newUser._id,
      },

      process.env.JWT_KEY,
      { expiresIn: "10d" }
    );

    res.status(200).json({
      success: true,
      Token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      err: error.message,
    });
  }
};

exports.LoadUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      err: error.message,
    });
  }
};

exports.getUserDetails = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    succes: true,
    user,
  });
};

exports.getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(400).json({
        msg: "User not found",
        success: false,
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      err: error.message,
    });
  }
};

exports.GetAlluser = async (req, res) => {
  try {
    const user = await User.find();

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      err: error.message,
    });
  }
};
