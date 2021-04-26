import { createStore, combineReducers, applyMiddleware } from "redux";
import Thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productListReducers } from "./reducers/ProductReducers";

const reducer = combineReducers({
  productList: productListReducers,
});

const initialState = {};

const middleWare = [Thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
