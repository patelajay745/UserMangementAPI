const User = require("../models/user");

const handleGetAllUsers = async (req, res) => {
  const allUser = await User.find({});
  return res.status(200).json(allUser);
};

const handleGetUser = async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  return res.status(200).json(user);
};

const handleDeleteUser = async (req, res) => {
  const id = req.params.id;
  await User.findByIdAndDelete(id);
  return res.status(200).json({ message: `${id} is deleted` });
};

const handleCreateUser = async (req, res) => {
  const { firstName, lastName, email, gender, city } = req.body;

  try {
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      gender,
      city,
    });

    return res.status(201).json({
      message: `${newUser.firstName}'s account has been created with ${newUser.email}`,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: `${email} is already used. Please try to log in.`,
      });
    }

    return res.status(500).json({
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};

const handleUpdateUser = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, gender, city } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { firstName, lastName, email, gender, city },
    { new: true, runValidators: true } // Returns the updated document and runs validations
  );

  if (!updatedUser) {
    return res.status(404).json({
      message: `User with ID ${id} not found.`,
    });
  }

  return res.status(200).json({
    message: `${updatedUser.firstName}'s account has been updated successfully.`,
    user: updatedUser,
  });
};

module.exports = {
  handleGetAllUsers,
  handleGetUser,
  handleDeleteUser,
  handleCreateUser,
  handleUpdateUser,
};
//
