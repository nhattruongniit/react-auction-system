const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(403).json({
      msg: "Access Denied",
      isSuccess: false,
    });
  }

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(401).json({
      msg: "Invalid Token",
      isSuccess: false,
    });
  }
};
