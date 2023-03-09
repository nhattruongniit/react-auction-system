const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// middleware
const auth = require("../middlewares/auth");

// models
const User = require("../models/User");

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  // isValid email
  const isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
    email
  );
  if (!isValidEmail) {
    return res.status(400).json({
      msg: "Email is not valid",
      isSuccess: false,
    });
  }

  // check email exist
  const emailExist = await User.findOne({ email });
  if (emailExist) {
    return res.status(400).json({
      msg: "Email already exist",
      isSuccess: false,
    });
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = new User({
    email,
    password: hashedPassword,
  });

  try {
    await user.save();
    res.status(200).json({
      msg: "Register Successfully!",
      isSuccess: true,
    });
  } catch (err) {
    res.status(400).json({
      msg: err,
      isSuccess: false,
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // check email exist
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      msg: "Email or password is wrong",
      isSuccess: false,
    });
  }

  // valid password
  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass)
    return res.status(400).json({
      msg: "Email or password is wrong",
      isSuccess: false,
    });

  // create and assign a token
  const payload = {
    user: {
      id: user._id.toString(),
      email: user.email,
    },
  };

  jwt.sign(
    payload,
    process.env.TOKEN_SECRET,
    { expiresIn: 36000 },
    (err, token) => {
      if (err) throw err;
      res.header("x-auth-token", token).json({
        token,
        msg: "Login Successfully!",
        isSuccess: true,
      });
    }
  );
});

// get user by id
router.get("/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.status(200).json({
      data: {
        id: user._id,
        email: user.email,
        deposit: user.deposit || 0,
        bid: user.bid || {},
      },
      isSuccess: true,
    });
  } catch (err) {
    res.status(400).json({
      msg: err,
      isSuccess: false,
    });
  }
});

// update user
router.put("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const { deposit, productId, bid } = req.body;
  const profile = await User.findById(id);

  if (deposit) profile.deposit = profile.deposit + deposit;
  if (bid) {
    profile.bid = {
      [productId]: bid + profile.bid[productId],
    };
  }

  try {
    const user = await User.findOneAndUpdate(
      { _id: id },
      { $set: profile },
      { new: true }
    );
    if (!user) {
      return res.status(400).json({
        data: err,
        isSuccess: false,
      });
    }
    res.status(200).json({
      msg: "Update successfully!",
      isSuccess: true,
    });
  } catch (err) {
    res.status(400).json({
      msg: err,
      isSuccess: false,
    });
  }
});

module.exports = router;
