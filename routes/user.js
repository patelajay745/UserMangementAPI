const express = require("express");
const router = express.Router();
const {
  handleGetAllUsers,
  handleGetUser,
  handleDeleteUser,
  handleCreateUser,
  handleUpdateUser,
} = require("../controller/user");

router.get("/", handleGetAllUsers);

router.get("/:id", handleGetUser);

router.delete("/:id", handleDeleteUser);

router.post("/", handleCreateUser);

router.put("/:id", handleUpdateUser);

module.exports = router;
