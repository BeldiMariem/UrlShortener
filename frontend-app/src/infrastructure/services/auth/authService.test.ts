import { loginUser, logout } from "./authService";

describe("authService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  describe("loginUser", () => {
    it("should login user and return data", async () => {
      const email = "mariem@example.com";
      const password = "password123";
      const mockResponse = {
        token: "fake-jwt-token",
        user: { name: "Mariem", email },
      };

      jest.spyOn(global, "fetch").mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await loginUser(email, password);

      expect(fetch).toHaveBeenCalledWith("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      expect(result).toEqual(mockResponse);
    });

    it("should throw error if login fails", async () => {
      jest.spyOn(global, "fetch").mockResolvedValueOnce({
        ok: false,
      } as Response);

      await expect(loginUser("email", "pass")).rejects.toThrow("Login failed");
    });
  });

  describe("logout", () => {
    it("should call logout endpoint and clear localStorage", async () => {
      const token = "test-token";
      localStorage.setItem("token", token);
      localStorage.setItem("user", "mariem");
      localStorage.setItem("userId", "123");

      const mockFetch = jest.spyOn(global, "fetch").mockResolvedValueOnce({
        ok: true,
      } as Response);

      await logout();

      expect(mockFetch).toHaveBeenCalledWith("http://localhost:5000/auth/logout", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
      });

      expect(localStorage.getItem("token")).toBeNull();
      expect(localStorage.getItem("user")).toBeNull();
      expect(localStorage.getItem("userId")).toBeNull();
    });
  });
});
