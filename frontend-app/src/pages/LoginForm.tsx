import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { ILoginPayload, IRegisterPayload } from "../domain/models/User";
import {
  Form,
  Button,
  Alert,
  Card,
  ToggleButtonGroup,
  ToggleButton,
  Container,
  Spinner,
} from "react-bootstrap";
import "./AuthPage.css";

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const [loginForm, setLoginForm] = useState<ILoginPayload>({
    email: "",
    password: "",
  });

  const [regForm, setRegForm] = useState<IRegisterPayload>({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (isLogin) {
      setLoginForm((prev) => ({ ...prev, [name]: value }));
    } else {
      setRegForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      if (isLogin) {
        await login(loginForm);
        navigate("/home");
      } else {
        await register(regForm);
        setSuccess("Registration successful! Please log in.");
        setIsLogin(true);
        setRegForm({ name: "", email: "", password: "" });
      }
    } catch {
      setError("Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const toggleAuthMode = (val: number) => {
    setIsLogin(val === 1);
    setError("");
    setSuccess("");
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-overlay">
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
          <Card className="auth-card shadow-lg">
            <Card.Body>
              <h3 className="text-center mb-3">
                {isLogin ? "Login to Shorty" : "Create a Shorty Account"}
              </h3>

              <ToggleButtonGroup
                type="radio"
                name="authType"
                value={isLogin ? 1 : 2}
                onChange={toggleAuthMode}
                className="mb-3 w-100 auth-toggle-group"
              >
                <ToggleButton
                  id="login-btn"
                  variant={isLogin ? "warning" : "outline-secondary"}
                  className="w-50 fw-bold"
                  value={1}
                >
                  Login
                </ToggleButton>
                <ToggleButton
                  id="register-btn"
                  variant={!isLogin ? "warning" : "outline-secondary"}
                  className="w-50 fw-bold"
                  value={2}
                >
                  Register
                </ToggleButton>
              </ToggleButtonGroup>

              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}

              <Form onSubmit={handleSubmit}>
                {!isLogin && (
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
                )}

                <Form.Group className="mb-2">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={isLogin ? loginForm.email : regForm.email}
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
                    value={isLogin ? loginForm.password : regForm.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                  />
                </Form.Group>

                <Button type="submit" variant="warning" className="w-100" disabled={loading}>
                  {loading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="me-2"
                      />
                      {isLogin ? "Logging in..." : "Registering..."}
                    </>
                  ) : (
                    isLogin ? "Login" : "Register"
                  )}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </div>
  );
};

export default AuthPage;
