import jwt from "jsonwebtoken";
import User from "../components/User/user.model.js";

export const protect = async (req, res, next) => {
  let token;

  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from decoded token
      const user = await User.findById(decoded.id).select("-passwordHash");

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = user;
      next();
    } else {
      return res.status(401).json({ message: "No token provided" });
    }
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Not authorized", error: err.message });
  }
};
