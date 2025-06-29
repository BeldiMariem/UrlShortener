const RegisterUser = require("../../usecases/auth/registerUser");
const LoginUser = require("../../usecases/auth/loginUser");
const UserRepository = require("../../infrastructure/repositories/userRepository");

const userRepository = new UserRepository();
const registerUser = new RegisterUser(userRepository);
const loginUser = new LoginUser(userRepository); 
const { blacklist } = require("../../usecases/utils/tokenBlacklist");


exports.register = async (req, res) => {
    try {
      const user = await registerUser.execute(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
 exports.login = async (req, res) => {
    try {
      const { token, user } = await loginUser.execute(req.body);
      res.status(200).json({ token, user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
exports.logout = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    blacklist.add(token); 
  }
  res.status(200).json({ message: "Logged out successfully" });
};