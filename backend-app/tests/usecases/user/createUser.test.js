
const CreateUser = require("../../../src/usecases/user/createUser");
const MockUserRepository = require("../../mocks/mockUserRepository");

describe("CreateUser", () => {
    let mockUserRepository;
    let createUser;
  
    beforeEach(() => {
      mockUserRepository = new MockUserRepository();
      createUser = new CreateUser(mockUserRepository);
    });
  
    it("should create a user", async () => {
      mockUserRepository.findByEmail = jest.fn().mockResolvedValue(null);
      mockUserRepository.create = jest.fn().mockResolvedValue({ id: "123", name: "John", email: "john@example.com" });
  
      const user = await createUser.execute({ name: "John", email: "john@example.com", password: "password123" });
  
      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith("john@example.com");
      expect(mockUserRepository.create).toHaveBeenCalledWith({
        name: "John",
        email: "john@example.com",
        password: "password123",
        role: "user", 
      });
      expect(user).toEqual({ id: "123", name: "John", email: "john@example.com" });
    });
  });