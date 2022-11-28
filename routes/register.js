const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const User = require('../models/Register')

router.post("/", async (request, response) => {
  try {
    const newPassword = await bcrypt.hash(request.body.password, 10)
    await User.create({
      name: request.body.name,
      email: request.body.email,
      password: newPassword,
      avatar: request.body.avatar,
    });
    response.json({ status: "ok" });
  } catch (error) {
    response.json({
      status: "error",
      error: "There is a user with this record!",
    });
  }
});

router.get("/", async (request, response) => {
  const token = request.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const email = decoded.email;
    const allUsers = await User.find();
    response.send(allUsers);
  } 
  catch (error) {
    response.json({
      status: "error",
      error: "There is a user with this record!",
    });
  }
});


router.put("/:userId", async (request, response) => {
  try {
    const adminUser = await User.findByIdAndUpdate(request.params.userId,{
      $set:request.body
  },{new:true})
    response.json(adminUser);
  } catch (error) {
    response.json({ message: error });
  }
});

router.get("/:userId", async (request, response) => {
  try {
    const specificProduct = await User.findById(
      request.params.userId
    );
    response.json(specificProduct);
  } catch (error) {
    response.json({ message: error });
  }
});

router.delete("/:userId", async (request, response) => {
  try {
    const removeUser = await User.remove({
      _id: request.params.userId,
    });
    response.json(removeUser);
  } catch (error) {
    response.json({ message: error });
  }
});

module.exports = router;
