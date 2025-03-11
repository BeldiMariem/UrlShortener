const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/authorizeMiddleware");
const { createUser, getAllUsers, getUserByEmail, updateUser, deleteUser } = require("../controllers/userController");

router.post("/createUser", authenticate,createUser); 
router.get("/getAllUsers", authenticate, authorize(["admin"]), getAllUsers);
router.get("/getUserByEmail/:email", authenticate,authorize(["admin"]), getUserByEmail); 
router.put("/updateUser/:id", authenticate,authorize(["admin"]),updateUser); 
router.delete("/deleteUser/:id", authenticate,authorize(["admin"]),deleteUser); 

module.exports = router;