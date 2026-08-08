import jwt from "jsonwebtoken";

/**
 * İstifadəçi üçün JWT token yaradır.
 * Token-in içinə id və role yazılır ki, sonra middleware-lərdə
 * hər dəfə DB-yə müraciət etmədən rolu yoxlaya bilək.
 */
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    }
  );
};

export default generateToken;