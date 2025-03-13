
const DeleteUser = require("../../../src/usecases/user/deleteUser");
const MockUserRepository = require("../../mocks/mockUserRepository");
const { NotFoundError, ValidationError } = require("../../../src/usecases/errors");

describe("DeleteUser", () => {
    let mockUserRepository;
    let deleteUser;
  
    beforeEach(() => {
      mockUserRepository = new MockUserRepository();
      deleteUser = new DeleteUser(mockUserRepository);
    });
  
    it("should throw a NotFoundError if user does not exist", async () => {
      mockUserRepository.findById = jest.fn().mockResolvedValue(null);
  
      await expect(deleteUser.execute("123")).rejects.toThrow(NotFoundError);
    });
  
    it("should throw a ValidationError if user ID is missing", async () => {
      await expect(deleteUser.execute()).rejects.toThrow(ValidationError);
    });
  });