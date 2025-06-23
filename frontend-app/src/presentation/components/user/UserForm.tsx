// UserForm.tsx
import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { IUserPayload, IUserUpdatePayload } from "../../../domain/models/User";

interface CommonProps {
  show: boolean;
  onClose: () => void;
  initialValues?: Partial<IUserPayload | IUserUpdatePayload> | null;
  showPasswordField?: boolean;
}

interface AddUserFormProps extends CommonProps {
  mode: "add";
  onSave: (data: IUserPayload) => Promise<void>;
}

interface EditUserFormProps extends CommonProps {
  mode: "edit";
  onSave: (data: IUserUpdatePayload) => Promise<void>;
}

type UserFormProps = AddUserFormProps | EditUserFormProps;

const UserForm: React.FC<UserFormProps> = ({
  mode,
  show,
  onClose,
  onSave,
  initialValues = null,
  showPasswordField = false,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (initialValues) {
      setName(initialValues.name || "");
      setEmail(initialValues.email || "");
      setRole(initialValues.role || "user");
      setPassword(initialValues.password ||"");
    } else {
      setName("");
      setEmail("");
      setRole("user");
      setPassword("");
    }
  }, [initialValues]);

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Password required only in add mode
  const isPasswordValid = mode === "add" ? password.trim() !== "" : true;

  const isFormValid =
    name.trim() !== "" &&
    email.trim() !== "" &&
    role.trim() !== "" &&
    isValidEmail(email) &&
    isPasswordValid;

  const handleSubmit = async () => {
    if (!isFormValid) return;

    if (mode === "add") {
      const payload: IUserPayload = {
        name,
        email,
        role,
        password,
      };
      await onSave(payload);
    } else {
      // Edit mode: password optional, send only if non-empty
      const payload: IUserUpdatePayload = {
        name,
        email,
        role,
      };
      if (password.trim() !== "") {
        payload.password = password;
      }
      await onSave(payload);
    }
  };

  return (
    <Modal show={show} onHide={onClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{mode === "edit" ? "Edit User" : "Add New User"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={email !== "" && !isValidEmail(email)}
            />
            <Form.Control.Feedback type="invalid">
              Invalid email format
            </Form.Control.Feedback>
          </Form.Group>

          {showPasswordField && (
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>
                Password{" "}
                {mode === "edit" && (
                  <small className="text-muted">(leave blank to keep current password)</small>
                )}
              </Form.Label>
              <div className="d-flex align-items-center">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  isInvalid={mode === "add" && password.trim() === ""}
                />
                <Button
                  variant="outline-secondary"
                  size="sm"
                  className="ms-2"
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                >
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </div>
              {mode === "add" && password.trim() === "" && (
                <Form.Control.Feedback type="invalid">
                  Password is required
                </Form.Control.Feedback>
              )}
            </Form.Group>
          )}

          <Form.Group className="mb-3" controlId="formRole">
            <Form.Label>Role</Form.Label>
            <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={!isFormValid}>
          {mode === "edit" ? "Save Changes" : "Add User"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserForm;
