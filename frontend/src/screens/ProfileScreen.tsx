import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Message, Loader, FormContainer } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "../models/ReactMostUsed";
import { getUserDetails, updateUserProfile } from "../actions/UserActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/UserConstants";

interface MatchParams {
  id: string;
}

const ProfileScreen = ({
  location,
  history,
}: RouteComponentProps<MatchParams>) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  const userDetails = useSelector((state: any) => state.userDetails);
  const { error, loading, user } = userDetails;
  const userLogin = useSelector((state: any) => state.userLogin);
  const { userInfo } = userLogin;
  const userUpdateProfile = useSelector(
    (state: any) => state.userUpdateProfile
  );
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.name || success) {
        dispatch(getUserDetails("profile"));
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [history, userInfo, user, dispatch, success]);

  const submitHandler = (e: any) => {
    e.preventDefault();

    if (password !== cPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
      setMessage("");
    }
  };
  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
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
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="passwordConfirm">
            <Form.Label>Confirm Password </Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Confirmed Password"
              value={cPassword}
              onChange={(e) => setCPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
