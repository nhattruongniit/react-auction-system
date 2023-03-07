const router = require("express").Router();
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const token = req.header("x-auth-token");
  if (!token)
    return res.status(401).json({
      msg: "Access Denied",
    });

  try {
    const user = jwt.verify(token, process.env.TOKEN_SECRET);
    res.status(200).json({
      user,
      isSuccess: true,
    });
  } catch (err) {
    res.status(400).json({
      msg: "Invalid Token",
      isSuccess: false,
    });
  }
});

module.exports = router;
