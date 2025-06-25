import React, { useState } from "react";
import { Container, Card, Form, Button, Alert, Spinner } from "react-bootstrap";
import { createUrlUsecase } from "../application/usecases/url/urlUsecases";

const Home: React.FC = () => {
  const [longUrl, setLongUrl] = useState("");
  const [title, setTitle] = useState("");
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setShortUrl(null);

    try {
      const token = localStorage.getItem("token") || "";
      const userId = localStorage.getItem("userId") || "";
      const response = await createUrlUsecase({ longUrl, title,userId }, token);
      setShortUrl(response.shortUrl);
    } catch (err) {
      setError("Failed to create short URL. Please check the link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Card className="shadow p-4">
        <Card.Title className="text-center mb-3">🔗 URL Shortener</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Long URL</Form.Label>
            <Form.Control
              type="url"
              placeholder="Enter the long URL..."
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Title (optional)</Form.Label>
            <Form.Control
              type="text"
              placeholder="Add a title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <div className="d-grid">
            <Button type="submit" variant="warning" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : "Shorten URL"}
            </Button>
          </div>
        </Form>

        {shortUrl && (
          <Alert variant="success" className="mt-3 text-center">
            Short URL: <a href={shortUrl} target="_blank" rel="noreferrer">{shortUrl}</a>
          </Alert>
        )}

        {error && (
          <Alert variant="danger" className="mt-3 text-center">
            {error}
          </Alert>
        )}
      </Card>
    </Container>
  );
};

export default Home;
