const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const checkAuth = require("../../../middlewares/check-auth");
const Session = mongoose.model("sessions");

const baseEndpoint = "/api/session/:sessionId/timeblock";

router.delete(`${baseEndpoint}`, checkAuth, async (req, res) => {
  const { sessionId } = req.params;
  const { timeBlockIds } = req.body;

  const session = await Session.findById(sessionId);

  if (req.currentUser.id !== session.owner)
    return res.status(403).send("Not Authorized");

  const updatedTimeBlocks = session.timeBlocks.filter(
    (timeBlock) => !timeBlockIds.includes(timeBlock.toString())
  );

  session.timeBlocks = updatedTimeBlocks;

  const latestSession = await session.save();

  res.status(201).send(latestSession);
});

module.exports = router;
