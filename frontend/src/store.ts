import { createStore, combineReducers, applyMiddleware } from "redux";
import Thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducers,
  productDetailsReducers,
} from "./reducers/ProductReducers";
import { cartReducer } from "./reducers/CartReducers";
import { userLoginReducers } from "./reducers/UserReducers";

const reducer = combineReducers({
  productList: productListReducers,
  productDetails: productDetailsReducers,
  cart: cartReducer,
  userLogin: userLoginReducers,
});

const dataInLocalCart = localStorage.getItem("cartItems");
const cartItemsLocal = dataInLocalCart ? JSON.parse(dataInLocalCart) : [];

const userInLocalCart = localStorage.getItem("userInfo");
const userItemsLocal = userInLocalCart ? JSON.parse(userInLocalCart) : null;

const initialState: any = {
  cart: { cartItems: cartItemsLocal },
  userLogin: { userInfo: userItemsLocal },
};

const middleWare = [Thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
