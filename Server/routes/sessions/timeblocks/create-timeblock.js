const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const checkAuth = require("../../middlewares/check-auth");
const Session = mongoose.model("sessions");
const { body, validationResult } = require("express-validator");

const baseEndpoint = "/api/session";

const generateUuid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    (character) => {
      const random = (Math.random() * 16) | 0;
      const value = character === "x" ? random : (random & 0x3) | 0x8;
      return value.toString(16);
    }
  );
};

router.post(
  `${baseEndpoint}/:id/timeblock`,
  checkAuth,
  [
    body("title").isEmpty().withMessage("Title cannot be empty"),
    body("duration").custom((value) => {
      if (value < 1) {
        throw new Error("Your timer cannot be shorter than 1 second");
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
    
      const { id } = req.params;
      const { title, duration, description } = req.body;

      const session = await Session.findById(id);

      if (!session)
        return res.status(404).send({ message: "Session not found" });

      const newTimeBlock = {
        id: generateUuid(),
        title: title,
        duration: duration,
        description: description,
      };

      const updatedTimeBlocks = [...session.timeBlocks, newTimeBlock];

      session.timeBlocks = updatedTimeBlocks;

      await session.save();

      res.status(201).send(newTimeBlock);
  }
);

module.exports = router;
