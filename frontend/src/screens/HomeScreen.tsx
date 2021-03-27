import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { Product } from "../components";
import productInterface from "../models/productTypes";
import axios from "axios";
const HomeScreen = () => {
  const [products, setProducts] = useState<Array<productInterface>>([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get("/api/products/");
      setProducts(data);
    };
    fetch();
  }, []);

  return (
    <div>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product: productInterface) => (
          <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default HomeScreen;
