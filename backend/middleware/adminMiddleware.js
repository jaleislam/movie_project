const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({ message: "Bu əməliyyat üçün admin hüququ lazımdır" });
};

export default adminMiddleware;