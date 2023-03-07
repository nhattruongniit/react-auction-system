const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const usersRoute = require("./routes/users.route");
const authRoute = require("./routes/auth.route");
const productRoute = require("./routes/product.route");

dotenv.config();
app.use(cors());
app.use(express.static("public"));

// env
const PORT = process.env.PORT || 3000;

// connect to db
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
  })
  .catch((error) => console.log("Connect Fail: ", error));

// middlewares
app.use(express.json({ extend: true }));
app.get("/", (_, res) => res.send("API running"));

// route
app.use("/api/auth", authRoute);
app.use("/api/user", usersRoute);
app.use("/api/product", productRoute);

app.listen(PORT, () => {
  console.log(`Server Up and running localhost: ${PORT}`);
});
