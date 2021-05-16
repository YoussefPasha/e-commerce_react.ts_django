import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Footer, Header } from "./components";
import {
  HomeScreen,
  ProductScreen,
  CartScreen,
  LoginScreen,
  RegisterScreen,
} from "./screens";

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route component={HomeScreen} path="/" exact />
          <Route component={LoginScreen} path="/login" />
          <Route component={RegisterScreen} path="/register" />
          <Route component={ProductScreen} path="/product/:id" />
          <Route component={CartScreen} path="/cart/:id?" />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
