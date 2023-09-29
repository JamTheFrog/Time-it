const express = require("express");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = mongoose.model("users");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const baseEndpoint = "/api/users";
router.post(
  `${baseEndpoint}/signup`,
  [
    body("email").trim().isEmail().withMessage("Email must be valid email"),
    body("password")
      .trim()
      .isLength(6)
      .withMessage("Password length too short, minimum 6 characters required"),
    body("password2").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      return res.status(400).json({ messages: errorMessages });
    }

    const { email, password } = req.body;
    const exsistingUser = await User.findOne({ email });

    if (exsistingUser)
      return res.status(409).send({ msg: "User already exsists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const userDoc = await User.create({
      email,
      password: hashedPassword,
      type: "free",
    });
    return res.send(userDoc);
  }
);

module.exports = router;
