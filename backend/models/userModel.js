const mongose = require("mongoose");

const userSchema = new mongose.Schema({
  name: {
    type: String,
    required: [true, "pls enter your name"],
    maxLength: [30, "Name cannot Exceed"],
    minLength: [2, "Name should be morethan 4 cahracter"],
  },
  email: {
    type: String,
    required: [true, "pls Enter your Email"],
    unique: true,
  },
  number: {
    type: String,
    required: [true, "pls Enter your number"],
  },

  // password:{
  //     type:String,
  //     required:[true,"pls Enter your password"],
  //     minLength:[8,"password should greater then 8"],
  // },

  role: {
    type: String,
    default: "user",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

module.exports = mongose.model("UserEcom", userSchema);
