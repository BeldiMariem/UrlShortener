import React from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Welcome.css"; // Create this file to style the welcome page

const Welcome: React.FC = () => {
  return (
    <div className="welcome-hero">
      <div className="overlay">
        <Container className="text-center text-white d-flex flex-column justify-content-center align-items-center h-100">
          <h1 className="display-3 fw-bold">Welcome to <span className="text-warning">Shorty</span></h1>
          <p className="lead mt-3 mb-4">Easily shorten and manage your URLs — simple, fast, and reliable.</p>
          <Link to="/auth">
            <Button variant="warning" size="lg">
              Get Started
            </Button>
          </Link>
        </Container>
      </div>
    </div>
  );
};

export default Welcome;
