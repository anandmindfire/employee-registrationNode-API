// middleware/authMiddleware.js
import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
    const tokenHeader = req.header('Authorization');
  
  // console.log(token);
  if (!tokenHeader) {
    return res.status(401).json({ error: 'Access denied. Token missing in the header.' });
  }
  const token = tokenHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.adminId;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}
