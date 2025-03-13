const RegisterUser = require("../../../src/usecases/auth/registerUser");

describe("RegisterUser Use Case", () => {
  let userRepository;
  let registerUser;

  beforeEach(() => {
    userRepository = {
      findByEmail: jest.fn(),
      create: jest.fn(),
    };
    registerUser = new RegisterUser(userRepository);
  });

  it("should register a new user", async () => {
    const userData = { name: "John", email: "john@example.com", password: "password123" };

    userRepository.findByEmail.mockResolvedValue(null); 
    userRepository.create.mockResolvedValue({ ...userData, _id: "12345" });

    const result = await registerUser.execute(userData);

    expect(userRepository.findByEmail).toHaveBeenCalledWith("john@example.com");
    expect(userRepository.create).toHaveBeenCalledWith(expect.any(Object));
    expect(result).toEqual({ ...userData, _id: "12345" });
  });

  it("should throw an error if user already exists", async () => {
    const userData = { name: "John", email: "john@example.com", password: "password123" };

    userRepository.findByEmail.mockResolvedValue({ ...userData, _id: "12345" });

    await expect(registerUser.execute(userData)).rejects.toThrow("User already exists");
  });
});