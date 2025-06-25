import React, { useState } from "react";
import { Form, Button, Alert, Container, Card } from "react-bootstrap";
import { updateProfile } from "../infrastructure/services/userService";


const ProfilePage: React.FC = () => {
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const [name, setName] = useState(storedUser.name || "");
  const [email, setEmail] = useState(storedUser.email || "");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const userId = localStorage.getItem("userId") || ""; 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const updated = await updateProfile(userId,{ name, email, password });
      setMessage("Profile updated successfully");

    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <h3>Update Profile</h3>
          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                placeholder="Leave empty to keep current password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button type="submit" variant="warning">Update</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProfilePage;
