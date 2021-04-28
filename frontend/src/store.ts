import { createStore, combineReducers, applyMiddleware } from "redux";
import Thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducers,
  productDetailsReducers,
} from "./reducers/ProductReducers";
import { cartReducer } from "./reducers/CartReducers";

const reducer = combineReducers({
  productList: productListReducers,
  productDetails: productDetailsReducers,
  cart: cartReducer,
});

const dataInLocalCart = localStorage.getItem("cartItems");

const cartItemsLocal = dataInLocalCart ? JSON.parse(dataInLocalCart) : [];

const initialState: any = {
  cart: { cartItems: cartItemsLocal },
};

const middleWare = [Thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
