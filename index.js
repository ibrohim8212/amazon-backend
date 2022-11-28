const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv/config");
const allproducts = require("./routes/allproducts");
const register = require("./routes/register")
const login = require("./routes/login")
const category = require('./routes/categories');
const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/v2/allproducts", allproducts);
app.use("/v2/register", register);
app.use("/v2/category", category);
app.use("/v2/login", login);


mongoose.connect(
  process.env.DB_CONNECTION_CREDENTIAL,
  {
    useNewUrlParser: true,

    useCreateIndex: true,

    useFindAndModify: false,

    useUnifiedTopology: true,
  },
  () => {
    console.log("connected to db");
  }
);

app.listen(PORT, (req, res) => console.log(PORT));
