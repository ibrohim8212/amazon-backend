const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require("../models/Register");

router.post("/", async (request, response) => {
  const user = await User.findOne({
    email: request.body.email,
  });

  const isPasswordValid = await bcrypt.compare(request.body.password, user.password);
  if (isPasswordValid) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      process.env.SECRET_KEY,
      { expiresIn: '24h' }
    );
    return response.json({ status: "ok", user_token: token, user: user });
  } else {
    return response.json({ status: "error", user: false });
  }
});

router.get("/", async (request, response) => {
  const token = request.headers["x-access-token"];

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const email = decoded.email;
    const user = await User.findOne({ email: email });

    response.json(user);
  } catch (error) {
    console.log(error);
    response.json({ status: "error", error: "Invalid Token" });
  }
});



module.exports = router;
