import React from "react";
import { render, waitFor } from "@testing-library/react";
import { AuthProvider, useAuth } from "./authContext";
import * as authUseCases from "../application/usecases/auth/authUseCases";

// Mock les use cases
jest.mock("../application/usecases/auth/authUseCases");

const TestComponent = () => {
  const { login, register, user, isAuthenticated } = useAuth();

  React.useEffect(() => {
    login({ email: "test@example.com", password: "1234" });
  }, []);

  return (
    <div>
      <span data-testid="is-auth">{isAuthenticated ? "true" : "false"}</span>
      <span data-testid="user-email">{user?.email}</span>
    </div>
  );
};

describe("AuthProvider", () => {
  it("should update user and isAuthenticated on login", async () => {
    const mockUser = { _id: "1", name: "Mariem", email: "test@example.com", password: "", role: "user" };
    (authUseCases.login as jest.Mock).mockResolvedValue(mockUser);

    const { getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(getByTestId("is-auth").textContent).toBe("true");
      expect(getByTestId("user-email").textContent).toBe("test@example.com");
    });
  });
});
