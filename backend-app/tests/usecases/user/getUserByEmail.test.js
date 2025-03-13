const GetUserByEmail = require("../../../src/usecases/user/getUserByEmail");
const MockUserRepository = require("../../mocks/mockUserRepository");

const { NotFoundError, ValidationError } = require("../../../src/usecases/errors");

describe("GetUserByEmail", () => {
  let mockUserRepository;
  let getUserByEmail;

  beforeEach(() => {
    mockUserRepository = new MockUserRepository();
    getUserByEmail = new GetUserByEmail(mockUserRepository);
  });

  it("should throw a NotFoundError if user does not exist", async () => {
    mockUserRepository.findByEmail = jest.fn().mockResolvedValue(null);

    await expect(getUserByEmail.execute("john@example.com")).rejects.toThrow(NotFoundError);
  });

  it("should throw a ValidationError if email is missing", async () => {
    await expect(getUserByEmail.execute()).rejects.toThrow(ValidationError);
  });
});