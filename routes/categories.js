const express = require("express");
const router = express.Router();
const fs = require('fs');
const cloudinary = require('../cloudinary');
const upload = require('../multer');
const AllProducts = require("../models/AllProducts");

router.get("/all", async (request, response) => {
  try {
    const allproducts = await AllProducts.find();
    response.send(allproducts);
  } catch (error) {
    response.send(error);
  }
});

router.get("/smartphones", async (request, response) => {
  try {
    AllProducts.find(
      { productCategory: "smartphones"}, (error, data) => {
        response.json(data)
      }
    );
    ;
  } catch (error) {
    response.json({ message: error });
  }
});

router.get("/laptops", async (request, response) => {
  try {
    AllProducts.find(
      { productCategory: "laptops"}, (error, data) => {
        response.json(data)
      }
    );
    ;
  } catch (error) {
    response.json({ message: error });
  }
});

router.get("/accessories", async (request, response) => {
  try {
    AllProducts.find(
      { productCategory: "accessories"}, (error, data) => {
        response.json(data)
      }
    );
    ;
  } catch (error) {
    response.json({ message: error });
  }
});

module.exports = router;
