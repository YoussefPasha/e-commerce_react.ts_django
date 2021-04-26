import { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { Product, Loader, Message } from "../components";
import productInterface from "../models/productTypes";
import * as ProductActions from "../actions/ProductActions";
import { useDispatch, useSelector } from "react-redux";

const HomeScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ProductActions.listProducts());
  }, [dispatch]);

  const ProductsState = useSelector((state: any) => state.productList);

  const { error, loading, products } = ProductsState;

  return (
    <div>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant={"danger"}>{error}</Message>
      ) : (
        <Row>
          {products.map((product: productInterface) => (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default HomeScreen;
