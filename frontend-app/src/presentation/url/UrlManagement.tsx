import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  Table,
  Button,
  Spinner,
  Alert,
  Form,
  InputGroup,
  Pagination,
  Modal,
  Row,
  Col
} from "react-bootstrap";
import {
  createUrlUsecase,
  listUrlsUsecase,
  deleteUrlUsecase,
} from "../../application/usecases/url/urlUsecases";
import { IUrl } from "../../domain/models/Url";
import UrlForm from "./UrlForm";
import * as FiIcons from "react-icons/fi";
type IconComponent = React.ComponentType<{ className?: string; size?: number }>;

const {
FiLink, FiSearch, FiTrash2, FiEye, FiPlus, FiCopy, FiExternalLink, FiChevronLeft, FiChevronRight 
} = FiIcons as Record<string, IconComponent>;

const API_URL = process.env.REACT_APP_API_URL;



const UrlManagement: React.FC = () => {
  const [urls, setUrls] = useState<IUrl[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [showUrlModal, setShowUrlModal] = useState(false);
  const [selectedLongUrl, setSelectedLongUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const itemsPerPage = 8;
  const token = localStorage.getItem("token") || "";

  useEffect(() => {
    loadUrls();
  }, []);

  const loadUrls = async () => {
    setLoading(true);
    try {
      const data = await listUrlsUsecase(token);
      setUrls(data.reverse());
      setError(null);
    } catch {
      setError("Failed to fetch URLs");
    } finally {
      setLoading(false);
    }
  };

  const handleAddUrl = async (data: { longUrl: string; title: string; userId: string }) => {
    try {
      await createUrlUsecase(data, token);
      setShowAddModal(false);
      setSuccess("URL shortened successfully!");
      setTimeout(() => setSuccess(null), 3000);
      loadUrls();
    } catch {
      alert("Failed to create URL");
    }
  };

  const handleDelete = async (shortId: string) => {
    if (window.confirm("Are you sure you want to delete this URL?")) {
      try {
        await deleteUrlUsecase(shortId, token);
        setSuccess("URL deleted successfully!");
        setTimeout(() => setSuccess(null), 3000);
        loadUrls();
      } catch {
        alert("Failed to delete URL");
      }
    }
  };

  const handleViewLongUrl = (url: string) => {
    setSelectedLongUrl(url);
    setShowUrlModal(true);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(`${API_URL}/url/${text}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredUrls = urls.filter((url) =>
    url.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    url.longUrl?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    url.shortId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUrls = filteredUrls.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUrls.length / itemsPerPage);

  const formatDate = (dateString: Date | string | undefined) => {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <Container fluid className="py-4">
      <Row className="justify-content-center">
        <Col xl={10}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="mb-0">URL Management</h2>
              <p className="text-muted">Manage and track your shortened URLs</p>
            </div>
            <Button 
              variant="warning" 
              className="rounded-pill d-flex align-items-center"
              onClick={() => setShowAddModal(true)}
            >
              <FiPlus className="me-2" /> Create New
            </Button>
          </div>

          {success && (
            <Alert variant="success" className="border-0 shadow-sm">
              {success}
            </Alert>
          )}

          {error && (
            <Alert variant="danger" className="border-0 shadow-sm">
              {error}
            </Alert>
          )}

          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="w-50">
                  <InputGroup>
                    <InputGroup.Text className="bg-light border-end-0">
                      <FiSearch />
                    </InputGroup.Text>
                    <Form.Control
                      placeholder="Search URLs by title, original or short URL..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="border-start-0 bg-light"
                    />
                  </InputGroup>
                </div>
                <div className="text-muted">
                  {filteredUrls.length} {filteredUrls.length === 1 ? 'URL' : 'URLs'}
                </div>
              </div>

              {loading ? (
                <div className="text-center py-5">
                  <Spinner animation="border" variant="primary" />
                  <p className="mt-2 text-muted">Loading your URLs...</p>
                </div>
              ) : (
                <>
                  <div className="table-responsive">
                    <Table hover className="align-middle">
                      <thead className="table-light">
                        <tr>
                          <th>Title</th>
                          <th>Short URL</th>
                          <th>Created</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentUrls.length > 0 ? (
                          currentUrls.map((url) => (
                            <tr key={url.shortId}>
                              <td>
                                <div className="d-flex align-items-center">
                                  <div className="bg-warning bg-opacity-10 p-2 rounded me-3">
                                    <FiLink className="text-warning" />
                                  </div>
                                  <div>
                                    <div className="fw-semibold">{url.title || 'Untitled'}</div>
                                    <div className="text-muted small text-truncate" style={{ maxWidth: '200px' }}>
                                      {url.longUrl}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div className="d-flex align-items-center">
                                  <span className="text-primary fw-semibold">{url.shortId}</span>
                                  <Button 
                                    variant="link" 
                                    size="sm" 
                                    className="text-muted p-0 ms-2"
                                    onClick={() => copyToClipboard(url.shortId)}
                                    title="Copy to clipboard"
                                  >
                                    <FiCopy size={14} />
                                  </Button>
                                </div>
                                <div className="small text-muted">
                                  {`${API_URL}/url/${url.shortId}`.length > 30 
                                    ? `${`${API_URL}/url/${url.shortId}`.substring(0, 30)}...` 
                                    : `${API_URL}/url/${url.shortId}`
                                  }
                                </div>
                              </td>
                              <td className="text-muted">{formatDate(url.createdAt)}</td>
                              <td>
                                <div className="d-flex">
                                  <Button
                                    variant="outline-success"
                                    size="sm"
                                    className="me-2 d-flex align-items-center"
                                    onClick={() => handleViewLongUrl(url.longUrl)}
                                  >
                                    <FiEye className="me-1" /> View
                                  </Button>
                                  <Button
                                    variant="outline-danger"
                                    size="sm"
                                    className="d-flex align-items-center"
                                    onClick={() => handleDelete(url.shortId)}
                                  >
                                    <FiTrash2 className="me-1" /> Delete
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={5} className="text-center py-5">
                              <FiLink size={48} className="text-muted mb-3" />
                              <h5>No URLs found</h5>
                              <p className="text-muted">
                                {searchTerm ? 'Try adjusting your search term' : 'Get started by creating your first shortened URL'}
                              </p>
                              {!searchTerm && (
                                <Button 
                                  variant="primary" 
                                  onClick={() => setShowAddModal(true)}
                                >
                                  Create URL
                                </Button>
                              )}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                  </div>

                  {totalPages > 1 && (
  <div className="d-flex justify-content-center mt-3">
    <Pagination>
      <Pagination.Prev
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((prev) => prev - 1)}
      >
        <FiChevronLeft />
      </Pagination.Prev>
      {[...Array(totalPages)].map((_, i) => (
        <Pagination.Item
          key={i}
          active={i + 1 === currentPage}
          onClick={() => setCurrentPage(i + 1)}
        >
          {i + 1}
        </Pagination.Item>
      ))}
      <Pagination.Next
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((prev) => prev + 1)}
      >
        <FiChevronRight />
      </Pagination.Next>
    </Pagination>
  </div>
)}

                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <UrlForm
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddUrl}
      />

      <Modal
        size="lg"
        centered
        show={showUrlModal}
        onHide={() => setShowUrlModal(false)}
        className="modern-modal"
      >
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title>Original URL</Modal.Title>
        </Modal.Header>
        <Modal.Body className="py-4">
          <div className="bg-light p-3 rounded" style={{ wordBreak: "break-word" }}>
            <a
              href={selectedLongUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary text-decoration-none"
            >
              {selectedLongUrl}
              <FiExternalLink className="ms-1" size={14} />
            </a>
          </div>
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button 
            variant="outline-secondary" 
            onClick={() => setShowUrlModal(false)}
          >
            Close
          </Button>
          <Button 
            variant="primary"
            onClick={() => {
              if (selectedLongUrl) {
                navigator.clipboard.writeText(selectedLongUrl);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }
            }}
          >
            {copied ? 'Copied!' : 'Copy URL'}
          </Button>
        </Modal.Footer>
      </Modal>

      <style>{`
        .modern-modal .modal-content {
          border-radius: 12px;
          border: none;
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
        }
        
        .table > tbody > tr > td {
          border-color: #f0f0f0;
          padding: 1rem 0.75rem;
        }
        
        .table > thead > tr > th {
          border-color: #f0f0f0;
          padding: 0.75rem;
          font-weight: 600;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #6c757d;
        }
        
        .pagination .page-item .page-link {
          border-radius: 6px;
          margin: 0 3px;
          border: none;
          color: #6c757d;
        }
        
        .pagination .page-item.active .page-link {
          background-color: #0d6efd;
          color: white;
        }
      `}</style>
    </Container>
  );
};

export default UrlManagement;