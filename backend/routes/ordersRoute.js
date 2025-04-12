const express = require("express");
const router = express.Router();

const { authMiddle, authorizeRoles } = require("../middleware/auth");
const {
  createOrder,
  getSingle,
  myOrder,
  adminOrder,
  updateOrder,
  AdminOrder,
  dltorder,
  getUserOrder,
} = require("../controller/orderController");

router.route("/order").post(createOrder);
router.route("/order/:id").get(getSingle);
router.route("/me/order").get(authMiddle, myOrder);
router.route("/admin/orders").get(authMiddle, adminOrder);
router.route("/admin/order/:id").put(updateOrder);
router.route("/admin/order").get(AdminOrder);
router.route("/admin/order/:id").delete(dltorder);

module.exports = router;
