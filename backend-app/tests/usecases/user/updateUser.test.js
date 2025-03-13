const DuplicateUserError = require("../../../src/usecases/errors/duplicateUserError");
const UpdateUser = require("../../../src/usecases/user/updateUser");
const MockUserRepository = require("../../mocks/mockUserRepository");


describe("UpdateUser", () => {
    let mockUserRepository;
    let updateUser;
  
    beforeEach(() => {
      mockUserRepository = new MockUserRepository();
      updateUser = new UpdateUser(mockUserRepository);
    });
  
    it("should throw a DuplicateUserError if email is already in use", async () => {
      mockUserRepository.findById = jest.fn().mockResolvedValue({ id: "123", name: "John", email: "john@example.com" });
      mockUserRepository.findByEmail = jest.fn().mockResolvedValue({ id: "456", name: "Jane", email: "jane@example.com" });
  
      await expect(updateUser.execute("123", { email: "jane@example.com" })).rejects.toThrow(DuplicateUserError);
    });
  });