const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const checkAuth = require("../../../middlewares/check-auth")
const Session = mongoose.model("sessions");
const { body, validationResult } = require("express-validator");

const baseEndpoint = "/api/session/:sessionId/timeblock";

router.put(
  `${baseEndpoint}/:timeblockId`,
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
      return res.status(400).send({ messages: errorMessages });
    }

    const { sessionId, timeblockId } = req.params;
    const { title, duration, description } = req.body;

    const session = await Session.findById(sessionId);

    if(req.currentUser.id !== session.owner) return res.status(403).send("Not Authorized")

    const exsistingTimeBlockIndex = session.timeBlocks.findIndex((timeBlock) => timeBlock.id === timeblockId)
    const exsistingTimeBlock = session.timeBlocks[exsistingTimeBlockIndex]

    const updatedTimeBlock = {
        ...exsistingTimeBlock ,
        title,
        duration,
        description,
    }

    const updatedTimeBlocks = [...session.timeBlocks]
    updatedTimeBlocks[exsistingTimeBlockIndex]=updatedTimeBlock

    session.timeBlocks = updatedTimeBlocks

    const latestSession = await session.save()

    res.status(201).send(latestSession);
  }
);

module.exports = router;
