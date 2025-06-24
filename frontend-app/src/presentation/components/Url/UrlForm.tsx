// UrlForm.tsx
import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

interface UrlFormProps {
  show: boolean;
  onClose: () => void;
  onSave: (data: { longUrl: string; title: string; userId: string }) => void;
}

const UrlForm: React.FC<UrlFormProps> = ({ show, onClose, onSave }) => {
  const [longUrl, setLongUrl] = useState("");
  const [title, setTitle] = useState("");
  const [isValidUrl, setIsValidUrl] = useState(true);

  const validateUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = () => {
    if (!title || !longUrl || !validateUrl(longUrl)) {
      setIsValidUrl(false);
      return;
    }

    const userId = localStorage.getItem("userId") || "";
    onSave({ longUrl, title, userId });
    setTitle("");
    setLongUrl("");
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New URL</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Long URL</Form.Label>
            <Form.Control
              type="text"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              placeholder="https://example.com"
              isInvalid={!isValidUrl && longUrl !== ""}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid URL.
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save URL
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UrlForm;
