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
} from "react-bootstrap";
import {
  createUrlUsecase,
  listUrlsUsecase,
  deleteUrlUsecase,
} from "../../../application/usecases/url/urlUsecases";
import { IUrl } from "../../../domain/models/Url";
import UrlForm from "./UrlForm";
const API_URL = process.env.REACT_APP_API_URL;

const UrlManagement: React.FC = () => {
  const [urls, setUrls] = useState<IUrl[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [showUrlModal, setShowUrlModal] = useState(false);
  const [selectedLongUrl, setSelectedLongUrl] = useState<string | null>(null);

  const itemsPerPage = 5;
  const token = localStorage.getItem("token") || "";

  useEffect(() => {
    loadUrls();
  }, []);

  const loadUrls = async () => {
    setLoading(true);
    try {
      const data = await listUrlsUsecase(token);
      setUrls(data.reverse());
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
      loadUrls();
    } catch {
      alert("Failed to create URL");
    }
  };

  const handleDelete = async (shortId: string) => {
    if (window.confirm("Are you sure you want to delete this URL?")) {
      try {
        await deleteUrlUsecase(shortId, token);
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

  const filteredUrls = urls.filter((url) =>
    url.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    url.longUrl?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    url.shortId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUrls = filteredUrls.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUrls.length / itemsPerPage);

  return (
    <Container className="mt-4 px-3">
      <Card>
        <Card.Body>
          <Card.Title className="d-flex justify-content-between align-items-center flex-wrap">
            <span className="mb-2 mb-md-0">URL Management</span>
            <Button variant="success" onClick={() => setShowAddModal(true)}>
              Add URL
            </Button>
          </Card.Title>

          <InputGroup className="my-3">
            <Form.Control
              placeholder="Search by title, long or short URL"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>

          {error && <Alert variant="danger">{error}</Alert>}

          {loading ? (
            <div className="text-center">
              <Spinner animation="border" />
            </div>
          ) : (
            <div className="table-responsive">
              <Table striped bordered hover className="text-break align-middle">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Short URL</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUrls.length > 0 ? (
                    currentUrls.map((url) => (
                      <tr key={url.shortId}>
                        <td>{url.title}</td>
                        <td style={{ wordBreak: "break-word" }}>
                          <a
                            href={`${API_URL}/url/${url.shortId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {url.shortId}
                          </a>
                        </td>
                        <td>
                          <div className="d-grid gap-2 d-md-flex">
                            <Button
                              variant="info"
                              size="sm"
                              onClick={() => handleViewLongUrl(url.longUrl)}
                            >
                              View
                            </Button>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleDelete(url.shortId)}
                            >
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="text-center">
                        No URLs found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          )}

          {totalPages > 1 && (
            <Pagination className="justify-content-center mt-3">
              <Pagination.Prev
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              />
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
              />
            </Pagination>
          )}
        </Card.Body>
      </Card>

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
      >
        <Modal.Header closeButton>
          <Modal.Title>Original Long URL</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ wordBreak: "break-word" }}>
          <a
            href={selectedLongUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
          >
            {selectedLongUrl}
          </a>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUrlModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UrlManagement;
