import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateToken from "../utils/token.js";

export const register = async (req, res) => {
  const { name, email, password, phone, role } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ msg: "Email already in use" });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash, phone, role });
    const token = generateToken(user);

    res
      .status(201)
      .json({ user, token })
      .message("Successfully created an User.");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ msg: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch)
      return res.status(400).json({ msg: "Invalid email or password" });

    const token = generateToken(user);
    res.json({ user, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
