import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Footer, Header } from "./components";
import { HomeScreen, ProductScreen } from "./screens";

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route component={HomeScreen} path="/" exact />
          <Route component={ProductScreen} path="/product/:id" />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
