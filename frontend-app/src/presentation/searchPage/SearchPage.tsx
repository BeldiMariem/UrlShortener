import React, { useState } from "react";
import {
  Container,
  Card,
  Form,
  InputGroup,
  Button,
  Alert,
} from "react-bootstrap";
import { searchAppUsecase } from "../../application/usecases/searchAppUsecase";
import "./SearchPage.css";
import * as FiIcons from "react-icons/fi";
type IconComponent = React.ComponentType<{ className?: string; size?: number }>;

const {
FiSearch, FiExternalLinkAlt
} = FiIcons as Record<string, IconComponent>;
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
    <div className="yellow-gradient-bg">
      <Container className="py-5">
        <div className="text-center mb-4">
          <h1 className="main-title yellow-title">
            <FiSearch className="title-icon" /> Search Official App URLs
          </h1>
          <p className="subtitle yellow-subtitle">Find official application URLs quickly</p>
        </div>
        
        <Card className="yellow-url-card shadow-lg">
          <Card.Body className="p-4 p-md-5">
            <div className="text-center mb-4">
              <div className="yellow-icon-wrapper">
                <FiSearch className="rocket-icon" />
              </div>
              <h2 className="card-title yellow-card-title">App Search</h2>
              <p className="card-subtitle yellow-card-subtitle">Enter an app name to find its official URL</p>
            </div>

            <Form onSubmit={handleSearch}>
              <Form.Group className="mb-4">
                <Form.Label className="form-label yellow-form-label">
                  <FiSearch className="me-2" /> Application Name
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    placeholder="Enter app name (e.g. Twitter, Facebook, Instagram)"
                    value={appName}
                    onChange={(e) => setAppName(e.target.value)}
                    required
                    className="yellow-form-control"
                  />
                  <Button
                    type="submit"
                    className="yellow-submit-btn"
                    disabled={loading || !appName.trim()}
                  >
                    {loading ? (
                      <div className="spinner-wrapper">
                        <div className="yellow-spinner"></div>
                      </div>
                    ) : (
                      "Search"
                    )}
                  </Button>
                </InputGroup>
                <Form.Text className="text-muted">
                  Search for official URLs of popular applications
                </Form.Text>
              </Form.Group>
            </Form>

            {resultUrl && (
              <div className="result-container mt-4">
                <Alert variant="warning" className="yellow-success-alert">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="alert-title yellow-alert-title">Official URL Found!</h6>
                      <a href={resultUrl} target="_blank" rel="noopener noreferrer" className="yellow-short-url">
                        {resultUrl} <FiExternalLinkAlt className="ms-1" size={12} />
                      </a>
                    </div>
                    <Button 
                      variant="outline-warning" 
                      size="sm"
                      onClick={() => window.open(resultUrl, '_blank')}
                      className="yellow-copy-btn"
                    >
                      <FiExternalLinkAlt className="me-1" /> Visit
                    </Button>
                  </div>
                </Alert>
                
                <div className="yellow-stats-box">
                  <div className="stat-item">
                    <div className="stat-number yellow-stat-number">100+</div>
                    <div className="stat-label yellow-stat-label">Apps in database</div>
                  </div>
                  <div className="yellow-stat-divider"></div>
                  <div className="stat-item">
                    <div className="stat-number yellow-stat-number">99%</div>
                    <div className="stat-label yellow-stat-label">Accuracy rate</div>
                  </div>
                  <div className="yellow-stat-divider"></div>
                  <div className="stat-item">
                    <div className="stat-number yellow-stat-number">0.5s</div>
                    <div className="stat-label yellow-stat-label">Average search time</div>
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
        
   
      </Container>
    </div>
  );
};

export default SearchPage;