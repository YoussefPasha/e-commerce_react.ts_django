import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Rating, Loader, Message } from "../components";
import { RouteComponentProps } from "../models/ReactMostUsed";
import * as ProductActions from "../actions/ProductActions";
interface MatchParams {
  id: string;
}

const ProductScreen = ({ match }: RouteComponentProps<MatchParams>) => {
  const { id } = match.params;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ProductActions.listProductDetails(id));
  }, [id, dispatch]);

  const productDetails = useSelector((state: any) => state.productDetails);

  const { error, loading, product } = productDetails;

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
                  <ListGroup.Item>
                    <Button
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
