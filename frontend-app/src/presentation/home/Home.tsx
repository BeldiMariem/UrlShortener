import React, { useState } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { createUrlUsecase } from "../../application/usecases/url/urlUsecases";

import "./Home.css";
import * as FiIcons from "react-icons/fi";

type IconComponent = React.ComponentType<{ className?: string; size?: number }>;
const {FiLink, FiCopy, FiCheck } = FiIcons as Record<string, IconComponent>;

const Home: React.FC = () => {
  const [longUrl, setLongUrl] = useState("");
  const [title, setTitle] = useState("");
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setShortUrl(null);
    setCopied(false);

    try {
      const token = localStorage.getItem("token") || "";
      const userId = localStorage.getItem("userId") || "";
      const response = await createUrlUsecase({ longUrl, title, userId }, token);
      setShortUrl(response.shortUrl);
    } catch (err) {
      setError("Failed to create short URL. Please check the link and try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
 <div className="yellow-gradient-bg">
  <Container className="py-5">
    <div className="text-center mb-4">
      <h1 className="main-title yellow-title">
        <FiLink className="title-icon" /> Shorten Your Links
      </h1>
      <p className="subtitle yellow-subtitle">Create shortened URLs in seconds</p>
    </div>
    
    <div className="row justify-content-center">
      <div className="col-12 col-lg-10 col-xl-8">
        <Card >
          <Card.Body className="p-4 p-md-5">
            <div className="text-center mb-4">
              <div className="yellow-icon-wrapper">
                <FiLink className="rocket-icon" />
              </div>
              <h2 className="card-title yellow-card-title">URL Shortener</h2>
              <p className="card-subtitle yellow-card-subtitle">Paste your long URL below to shorten it</p>
            </div>
            
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4">
                <Form.Label className="form-label yellow-form-label">
                  <FiLink className="me-2" /> Destination URL
                </Form.Label>
                <Form.Control
                  type="url"
                  placeholder="https://example.com/very-long-url-that-needs-to-be-shortened"
                  value={longUrl}
                  onChange={(e) => setLongUrl(e.target.value)}
                  required
                  className="yellow-form-control"
                />
              </Form.Group>
              
              <Form.Group className="mb-4">
                <Form.Label className="form-label yellow-form-label">Custom Title </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Add a descriptive title for your link"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="yellow-form-control"
                />
              </Form.Group>
              
              <div className="d-grid">
                <Button 
                  type="submit" 
                  className="yellow-submit-btn"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="spinner-wrapper">
                      <div className="yellow-spinner"></div>
                      <span className="ms-2">Shortening...</span>
                    </div>
                  ) : (
                    <>
                      <FiLink className="me-2" /> Shorten URL
                    </>
                  )}
                </Button>
              </div>
            </Form>

            {shortUrl && (
              <div className="result-container mt-4">
                <Alert variant="warning" className="yellow-success-alert">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="alert-title yellow-alert-title">Your Short URL is Ready!</h6>
                      <a href={shortUrl} target="_blank" rel="noreferrer" className="yellow-short-url">
                        {shortUrl}
                      </a>
                    </div>
                    <Button 
                      variant="outline-warning" 
                      size="sm"
                      onClick={copyToClipboard}
                      className="yellow-copy-btn"
                    >
                      {copied ? <FiCheck className="me-1" /> : <FiCopy className="me-1" />}
                      {copied ? "Copied!" : "Copy"}
                    </Button>
                  </div>
                </Alert>
                
                <div className="yellow-stats-box">
                  <div className="stat-item">
                    <div className="stat-number yellow-stat-number">5.2k</div>
                    <div className="stat-label yellow-stat-label">Links shortened today</div>
                  </div>
                  <div className="yellow-stat-divider"></div>
                  <div className="stat-item">
                    <div className="stat-number yellow-stat-number">98%</div>
                    <div className="stat-label yellow-stat-label">Satisfaction rate</div>
                  </div>
                  <div className="yellow-stat-divider"></div>
                  <div className="stat-item">
                    <div className="stat-number yellow-stat-number">0.2s</div>
                    <div className="stat-label yellow-stat-label">Average redirect time</div>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <Alert variant="danger" className="mt-4 yellow-error-alert">
                <strong>Oops!</strong> {error}
              </Alert>
            )}
          </Card.Body>
        </Card>
      </div>
    </div>
  </Container>
</div>
  );
};
export default Home;