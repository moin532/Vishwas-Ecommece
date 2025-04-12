const express = require("express");
const router = express.Router();
const { AddSeller } = require("../controller/sellerController");

router.route("/add/seller").post(AddSeller);

module.exports = router;
