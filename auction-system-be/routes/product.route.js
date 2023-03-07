const router = require("express").Router();

// middleware
const auth = require("../middlewares/auth");

// model
const Product = require("../models/Product");

// add new product
router.post("/", [auth], async (req, res) => {
  const { name, price, time_window } = req.body;
  const productItem = new Product({
    name,
    price,
    time_window,
    status: "new",
  });

  try {
    const product = await productItem.save();
    res.status(200).json({
      data: product,
      msg: "Add successfully!",
      isSuccess: true,
    });
  } catch (err) {
    res.status(400).json({
      msg: err,
      isSuccess: false,
    });
  }
});

// get list product
router.get("/", auth, async (_, res) => {
  try {
    const dataProduct = await Product.find().sort({ data: -1 });
    res.status(200).json({
      data: dataProduct,
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
