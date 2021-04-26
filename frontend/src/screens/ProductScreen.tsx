import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Rating, Loader, Message } from "../components";
import { RouteComponentProps } from "../models/ReactMostUsed";
import * as ProductActions from "../actions/ProductActions";
interface MatchParams {
  id: string;
}

const ProductScreen = ({
  match,
  history,
}: RouteComponentProps<MatchParams>) => {
  const [qty, setQty] = React.useState(1);
  const { id } = match.params;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ProductActions.listProductDetails(id));
  }, [id, dispatch]);

  const productDetails = useSelector((state: any) => state.productDetails);

  const { error, loading, product } = productDetails;

  const addToCartHandler = () => {
    history.push(`/cart/${id}?qty=${qty}`);
  };

  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant={"danger"}>{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={6}>
              <Image src={product?.image} alt={product?.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3> {product?.name} </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product?.rating}
                    text={`${product?.numReviews}  reviews`}
                    color={"#f8e825"}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price $ {product?.price}</ListGroup.Item>
                <ListGroup.Item>
                  <p className="font-weight-bold">Description</p>
                  {product?.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product?.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product !== undefined && product?.countInStock > 0 ? (
                          <strong className="text-success">In Stock</strong>
                        ) : (
                          <strong className="text-danger">Out of Stock</strong>
                        )}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product !== undefined && product?.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col xs="auto" className="my-1">
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => {
                              setQty(+e.target.value);
                            }}
                          >
                            {[...Array(product?.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className="btn-block"
                      type="button"
                      disabled={product?.countInStock === 0}
                    >
                      Add to Card
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default ProductScreen;
