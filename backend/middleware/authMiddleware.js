const jwt = require("jsonwebtoken");

const protectAdmin = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (
    !authorizationHeader ||
    !authorizationHeader.startsWith("Bearer ")
  ) {
    return res.status(401).json({
      message: "Administrator authentication required.",
    });
  }

  const token = authorizationHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    if (decodedToken.role !== "admin") {
      return res.status(403).json({
        message: "Administrator access required.",
      });
    }

    req.admin = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Your login session is invalid or expired.",
    });
  }
};

module.exports = {
  protectAdmin,
};