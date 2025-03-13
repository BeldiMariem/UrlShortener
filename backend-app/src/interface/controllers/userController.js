const handleError = require("../../usecases/utils/errorHandler");

const createUserHandler = (createUser) => async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await createUser.execute({ name, email, password, role });
    res.status(201).json(user);
  } catch (error) {
    handleError(res, error);
  }
};

const getAllUsersHandler = (getAllUsers) => async (req, res) => {
  try {
    const users = await getAllUsers.execute();
    res.status(200).json(users);
  } catch (error) {
    handleError(res, error);
  }
};

const getUserByEmailHandler = (getUserByEmail) => async (req, res) => {
  try {
    const decodedEmail = decodeURIComponent(req.params.email);
    const user = await getUserByEmail.execute(decodedEmail);
    res.status(200).json(user);
  } catch (error) {
    handleError(res, error);
  }
};

const updateUserHandler = (updateUser) => async (req, res) => {
  try {
    const userId = req.params.id;
    const userData = req.body;
    const updatedUser = await updateUser.execute(userId, userData);
    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    handleError(res, error);
  }
};

const deleteUserHandler = (deleteUser) => async (req, res) => {
  try {
    const userId = req.params.id;
    await deleteUser.execute(userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = {
  createUserHandler,
  getAllUsersHandler,
  getUserByEmailHandler,
  updateUserHandler,
  deleteUserHandler,
};

