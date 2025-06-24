// src/presentation/pages/SearchPage.tsx
import React, { useState } from "react";
import {
  Container,
  Card,
  Form,
  InputGroup,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import { searchAppUsecase } from "../../application/usecases/searchAppUsecase";

const SearchPage: React.FC = () => {
  const [appName, setAppName] = useState("");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResultUrl(null);

    try {
      const token = localStorage.getItem("token") || "";
      const { url } = await searchAppUsecase(appName.trim(), token);
      if (!url) throw new Error("No result found");
      setResultUrl(url);
    } catch (err: any) {
      setError(err.message || "Search failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Card className="shadow p-4">
        <Card.Title className="text-center mb-3">🔎 Search Official App URL</Card.Title>

        <Form onSubmit={handleSearch}>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Enter app name (e.g. Twitter)"
              value={appName}
              onChange={(e) => setAppName(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="primary"
              disabled={loading || !appName.trim()}
            >
              {loading ? <Spinner animation="border" size="sm" /> : "Search"}
            </Button>
          </InputGroup>
        </Form>

        {resultUrl && (
          <Alert variant="success">
            Official URL:{" "}
            <a href={resultUrl} target="_blank" rel="noopener noreferrer">
              {resultUrl}
            </a>
          </Alert>
        )}

        {error && (
          <Alert variant="danger">
            {error}
          </Alert>
        )}
      </Card>
    </Container>
  );
};

export default SearchPage;
