const GetAllUsers = require("../../../src/usecases/user/getAllUsers");
const MockUserRepository = require("../../mocks/mockUserRepository");

describe("GetAllUsers", () => {
    let mockUserRepository;
    let getAllUsers;
  
    beforeEach(() => {
      mockUserRepository = new MockUserRepository();
      getAllUsers = new GetAllUsers(mockUserRepository);
    });
  
    it("should return all users", async () => {
      const mockUsers = [
        { id: "123", name: "John", email: "john@example.com" },
        { id: "456", name: "Jane", email: "jane@example.com" },
      ];
      mockUserRepository.findAll = jest.fn().mockResolvedValue(mockUsers);
  
      const users = await getAllUsers.execute();
  
      expect(mockUserRepository.findAll).toHaveBeenCalled();
      expect(users).toEqual(mockUsers);
    });
  
    it("should return an empty array if no users exist", async () => {
      mockUserRepository.findAll = jest.fn().mockResolvedValue([]);
  
      const users = await getAllUsers.execute();
  
      expect(mockUserRepository.findAll).toHaveBeenCalled();
      expect(users).toEqual([]);
    });
  
    it("should throw an error if the repository fails", async () => {
      mockUserRepository.findAll = jest.fn().mockRejectedValue(new Error("Database error"));
  
      await expect(getAllUsers.execute()).rejects.toThrow("Database error");
    });
  });