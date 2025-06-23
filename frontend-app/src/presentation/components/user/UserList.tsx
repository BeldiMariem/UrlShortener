import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Alert,
  Spinner,
  Container,
  Card,
  Form,
} from "react-bootstrap";
import { IUser } from "../../../domain/models/User";
import { getAllUsers, removeUser, editUser } from "../../../application/usecases/user/userUsecases";
import { createUser } from "../../../infrastructure/services/userService";
import UserForm from "./UserForm";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  const [showAddModal, setShowAddModal] = useState(false);

  // Search & Pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      const data = await getAllUsers();
      setUsers(data.reverse());
    } catch {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(user: IUser) {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await removeUser(user._id);
        // If last user on page deleted, go to previous page if exists
        const lastPage = Math.ceil((users.length - 1) / itemsPerPage);
        if (currentPage > lastPage) setCurrentPage(lastPage);
        loadUsers();
      } catch {
        alert("Failed to delete user");
      }
    }
  }

  function handleEditClick(user: IUser) {
    setSelectedUser(user);
    setShowEditModal(true);
  }

  // Filter users by search term (case-insensitive)
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage) || 1;
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <Card.Title>User Management</Card.Title>

          {/* Add User button aligned right */}
          <div className="d-flex justify-content-end mb-3">
            <Button variant="success" onClick={() => setShowAddModal(true)}>
              Add User
            </Button>
          </div>

          {/* Search Input */}
          <Form.Control
            type="text"
            placeholder="Search by name or email"
            className="mb-3"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // reset to first page on search
            }}
          />

          {error && <Alert variant="danger">{error}</Alert>}

          {loading ? (
            <div className="text-center">
              <Spinner animation="border" />
            </div>
          ) : (
            <>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedUsers.length > 0 ? (
                    paginatedUsers.map((user) => (
                      <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                          <Button
                            variant="warning"
                            size="sm"
                            className="me-2"
                            onClick={() => handleEditClick(user)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(user)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="text-center">
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>

              {/* Pagination Controls */}
              <div className="d-flex justify-content-center align-items-center mt-3 gap-2">
                <Button
                  variant="outline-primary"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                >
                  Previous
                </Button>

                <span>
                  Page {currentPage} of {totalPages}
                </span>

                <Button
                  variant="outline-primary"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                >
                  Next
                </Button>
              </div>
            </>
          )}
        </Card.Body>
      </Card>

      {/* Edit User Modal */}
      <UserForm
        mode="edit"
        show={showEditModal}
        initialValues={
          selectedUser
            ? {
                name: selectedUser.name,
                email: selectedUser.email,
                role: selectedUser.role,
                // You can pass password here if needed or leave empty to force update
              }
            : null
        }
        showPasswordField={true}
        onClose={() => setShowEditModal(false)}
        onSave={async (values) => {
          if (!selectedUser) return;
          try {
            await editUser(selectedUser._id, values);
            setShowEditModal(false);
            loadUsers();
          } catch {
            alert("Failed to update user");
          }
        }}
      />

      {/* Add User Modal */}
      <UserForm
        mode="add"
        show={showAddModal}
        showPasswordField={true}
        onClose={() => setShowAddModal(false)}
        onSave={async (values) => {
          try {
            await createUser(values);
            setShowAddModal(false);
            loadUsers();
          } catch {
            alert("Failed to add user");
          }
        }}
      />
    </Container>
  );
};

export default UserList;
