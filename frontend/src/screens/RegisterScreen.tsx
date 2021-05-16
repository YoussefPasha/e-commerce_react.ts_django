import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Message, Loader, FormContainer } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "../models/ReactMostUsed";
import { register } from "../actions/UserActions";

interface MatchParams {
  id: string;
}

const RegisterScreen = ({
  location,
  history,
}: RouteComponentProps<MatchParams>) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const submitHandler = (e: any) => {
    e.preventDefault();

    if (password !== cPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(register(email, password, name));
    }
  };
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const userRegister = useSelector((state: any) => state.userRegister);
  const { error, loading, userInfo } = userRegister;
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);
  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {error && <Message variant="danger">{error}</Message>}
      {message && <Message variant="danger">{message}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password </Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="passwordConfirm">
          <Form.Label>Confirm Password </Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Enter Confirmed Password"
            value={cPassword}
            onChange={(e) => setCPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Register
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Have an Account?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Sign In
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
