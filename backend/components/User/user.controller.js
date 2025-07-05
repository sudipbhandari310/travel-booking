import bcrypt from "bcryptjs";

import User from "./user.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-passwordHash");
    res.json(users).status(200);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).select("-passwordHash");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, phone, role } = req.body;

  if (password) {
    const passwordHash = await bcrypt.hash(password, 10);
    updateData.passwordHash = passwordHash;
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(id, {
      name,
      email,
      phone,
      password,
      role,
    });

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    res.status(201).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
