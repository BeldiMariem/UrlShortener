import React, { useEffect, useState } from "react";
import { IUser } from  "../../../domain/models/User";
import { getAllUsers, removeUser } from "../../../application/usecases/user/userUsecases";

export const UserList: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await removeUser(id);
        loadUsers(); // refresh list
      } catch {
        alert("Failed to delete user");
      }
    }
  }

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email}) - {user.role}
            <button onClick={() => handleDelete(user.id)} style={{ marginLeft: 10 }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
