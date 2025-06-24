import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Alert,
  Spinner,
  Container,
  Card,
  Form,
  Pagination,
} from "react-bootstrap";
import { IUser } from "../../../domain/models/User";
import {
  getAllUsers,
  removeUser,
  editUser,
} from "../../../application/usecases/user/userUsecases";
import { createUser } from "../../../infrastructure/services/userService";
import UserForm from "./UserForm";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data.reverse()); // latest first
    } catch {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (user: IUser) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await removeUser(user._id);
        const lastPage = Math.ceil((users.length - 1) / itemsPerPage);
        if (currentPage > lastPage) setCurrentPage(lastPage);
        loadUsers();
      } catch {
        alert("Failed to delete user");
      }
    }
  };

  const handleEditClick = (user: IUser) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage) || 1;
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <Card.Title className="d-flex justify-content-between align-items-center">
            <span>User Management</span>
            <Button variant="success" onClick={() => setShowAddModal(true)}>
              Add User
            </Button>
          </Card.Title>

          <Form.Control
            type="text"
            placeholder="Search by name or email"
            className="mb-3 mt-3"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
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
                      style={{
                        backgroundColor: "#1c2541",
                        borderColor: "#1c2541",
                        color: "white",
                      }}
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
