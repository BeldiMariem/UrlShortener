import React, { useEffect } from "react";
import { Container, Button, Row, Col, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

import "./Welcome.css";

const Welcome: React.FC = () => {
  useEffect(() => {
    axios.get("https://shorty-e9mu.onrender.com/ping").catch(() => {});
  }, []);

  return (
    <div className="welcome-page">

      <Container className="hero-section text-center">
        <h1 className="fw-bold display-4 mb-3">
          Simplify your <span className="highlight">links</span> with Shorty
        </h1>
        <p className="lead mb-4">
          Shorten, organize, and track your URLs — fast, secure, and modern.
        </p>

       

        <Link to="/auth">
          <Button variant="outline-dark" size="lg" className="fw-bold">
            Get Started
          </Button>
        </Link>
      </Container>

      <Container className="features-section text-center mt-5">
        <h2 className="fw-bold mb-4">Why Shorty?</h2>
        <Row>
          <Col md={4} className="mb-3">
            <Card className="feature-card shadow-sm p-3">
              <h3>⚡ Fast</h3>
              <p>Shorten links instantly with one click.</p>
            </Card>
          </Col>
          <Col md={4} className="mb-3">
            <Card className="feature-card shadow-sm p-3">
              <h3>📊 Track</h3>
              <p>Analyze your link performance easily.</p>
            </Card>
          </Col>
          <Col md={4} className="mb-3">
            <Card className="feature-card shadow-sm p-3">
              <h3>🔒 Secure</h3>
              <p>Your links are safe and private.</p>
            </Card>
          </Col>
        </Row>
      </Container>

      <div className="cta-section text-center">
        <h2 className="fw-bold mb-3">Ready to get started?</h2>
        <Link to="/auth">
          <Button variant="warning" size="lg" className="fw-bold">
            Join Now
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
