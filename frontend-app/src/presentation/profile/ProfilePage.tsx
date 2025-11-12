import React, { useState } from "react";
import { Form, Button, Alert, Container, Card } from "react-bootstrap";
import * as FiIcons from "react-icons/fi";
import "./ProfilePage.css";


const ProfilePage: React.FC = () => {
  type IconComponent = React.ComponentType<{ className?: string; size?: number }>;
const {FiUser,FiLink, FiLock } = FiIcons as Record<string, IconComponent>;
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const [name, setName] = useState(storedUser.name || "");
  const [email, setEmail] = useState(storedUser.email || "");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      setMessage("Profile updated successfully");
      const updatedUser = { ...storedUser, name, email };
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="yellow-gradient-bg profile-page">
      <Container className="py-5">
 
        <Card className="yellow-url-card shadow-lg">
          <Card.Body className="p-4 p-md-5">
            <div className="text-center mb-4">
              <div className="yellow-icon-wrapper profile-icon-wrapper">
                <FiUser className="rocket-icon" />
              </div>
              <h2 className="card-title yellow-card-title">Update Profile</h2>
              <p className="card-subtitle yellow-card-subtitle">Keep your information up to date</p>
            </div>
            
            {message && <Alert variant="success" className="yellow-success-alert">{message}</Alert>}
            {error && <Alert variant="danger" className="yellow-error-alert">{error}</Alert>}
            
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4">
                <Form.Label className="form-label yellow-form-label">
                  <FiUser className="me-2" /> Full Name
                </Form.Label>
                <Form.Control
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="yellow-form-control"
                  placeholder="Enter your full name"
                />
              </Form.Group>
              
              <Form.Group className="mb-4">
                <Form.Label className="form-label yellow-form-label">
                  <FiLink className="me-2" /> Email Address
                </Form.Label>
                <Form.Control
                  value={email}
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="yellow-form-control"
                  placeholder="Enter your email address"
                />
              </Form.Group>
              
              <Form.Group className="mb-4">
                <Form.Label className="form-label yellow-form-label">
                  <FiLock className="me-2" /> New Password
                </Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  placeholder="Leave empty to keep current password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="yellow-form-control"
                />
                <Form.Text className="text-muted">
                  Password must be at least 8 characters long
                </Form.Text>
              </Form.Group>
              
              <div className="d-grid">
                <Button 
                  type="submit" 
                  className="yellow-submit-btn"
                >
                   Update Profile
                </Button>
              </div>
            </Form>
            
            
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default ProfilePage;