const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  try {
    let token =
      req.headers.authorization &&
      req?.headers?.authorization.startsWith("Bearer")
        ? req.headers.authorization.split(" ")[1]
        : null;

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRETE);
      req.user = decoded.user;
      next();
    } else {
      return res.status(401).send({ status: 0, message: "Not authorized" });
    }
  } catch {
    console.error({ status: 0, message: "Not authorized" });
    return res.status(500).send({ status: 0, message: "Not authorized" });
  }
};

module.exports = {
    protect
}