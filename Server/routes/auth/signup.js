const express = require("express");
const bcrypt = require("bcrypt")
const mongoose = require("mongoose");
const User = mongoose.model("users");

const router = express.Router();
const baseEndpoint = "/api/users";
router.post(`${baseEndpoint}/signup`, async (req, res) => {
  const { email, password } = req.body;
  const exsistingUser = await User.findOne({ email });

  if (exsistingUser) return res.status(409).send({ msg: "User already exsists" });
  
  const hashedPassword = await bcrypt.hash(password, 10)
  const userDoc = await User.create({email, password: hashedPassword, type: "free"})
  return res.send(userDoc);
});

module.exports = router;