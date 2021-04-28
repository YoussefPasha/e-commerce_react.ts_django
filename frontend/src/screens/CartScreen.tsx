import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { Message } from "../components";
import { addToCart } from "../actions/CartActions";
import { RouteComponentProps } from "../models/ReactMostUsed";
interface MatchParams {
  id: string;
}

const CartScreen = ({
  match,
  location,
  history,
}: RouteComponentProps<MatchParams>) => {
  const { id } = match.params;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();

  const cart = useSelector((state: any) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    id && dispatch(addToCart(id, qty));
  }, [qty, id, dispatch]);

  return <div>Cart</div>;
};

export default CartScreen;
