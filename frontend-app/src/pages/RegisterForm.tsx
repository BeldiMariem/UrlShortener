import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { Link } from "react-router-dom";
import { IRegisterPayload } from "../domain/models/User";
import { Form, Button, Alert, Card, Container } from "react-bootstrap";
import "./AuthPage.css";

const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const [error, setError] = useState("");
  const [regForm, setRegForm] = useState<IRegisterPayload>({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await register(regForm);
    } catch (err: any) {
      setError(err.message || "Registration failed");
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-overlay">
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
          <Card className="auth-card shadow-lg">
            <Card.Body>
              <h3 className="text-center mb-3">Create a Shorty Account</h3>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-2">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    name="name"
                    value={regForm.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={regForm.email}
                    onChange={handleChange}
                    placeholder="example@email.com"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={regForm.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                  />
                </Form.Group>

                <Button type="submit" variant="warning" className="w-100 mb-3">
                  Register
                </Button>
                
                <div className="text-center">
                  <span>Already have an account? </span>
                  <Link to="/login" className="text-warning">
                    Login here
                  </Link>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </div>
  );
};

export default RegisterPage;