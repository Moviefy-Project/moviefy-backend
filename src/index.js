const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const authRoutes = require("./routes/AuthRoutes.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const express = require("express");

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});
