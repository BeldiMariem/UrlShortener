import React, { useEffect, useState } from "react";
import { Table, Button, Alert, Spinner, Container, Card } from "react-bootstrap";
import { IUser } from "../../../domain/models/User";
import { getAllUsers, removeUser } from "../../../application/usecases/user/userUsecases";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await removeUser(id);
        loadUsers();
      } catch {
        alert("Failed to delete user");
      }
    }
  }

  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <Card.Title>User Management</Card.Title>
          {error && <Alert variant="danger">{error}</Alert>}
          {loading ? (
            <div className="text-center"><Spinner animation="border" /></div>
          ) : (
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
                {users.length > 0 ? users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan={4} className="text-center">No users found.</td></tr>
                )}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UserList;
