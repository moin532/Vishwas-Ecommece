import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  NewProductReducer,
  ProductReducer,
  allPrdDetailsReducer,
  AdminPrdReducer,
  NewProductReview,
  CartReducer,
} from "./reducer/PrdReducer";
import {
  OrderReducer,
  allAdminOrderReducer,
  getUserOrders,
  updOrderAdminReducer,
} from "./reducer/OrderReducer";
import {
  allUsersReducer,
  RegisterReducer,
  userReducer,
} from "./reducer/UserREducer";
import { SellerAddReducer } from "./reducer/SellerReducer";

const reducer = combineReducers({
  products: ProductReducer,
  prdDetails: allPrdDetailsReducer,
  order: OrderReducer,
  emailReq: userReducer,
  userE: RegisterReducer,
  newPrd: NewProductReducer,
  adminOrd: allAdminOrderReducer,
  updOrd: updOrderAdminReducer,
  admUsers: allUsersReducer,
  admProd: AdminPrdReducer,
  userOrder: getUserOrders,
  reviewprd: NewProductReview,
  cartPrd: CartReducer,
  seller: SellerAddReducer,
});

const middleware = [thunk];

// const initialState = {
//   cartItems: localStorage.getItem("cartItems")
//     ? JSON.parse(localStorage.getItem("cartItems"))
//     : [],
// };

const store = legacy_createStore(
  reducer,

  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
