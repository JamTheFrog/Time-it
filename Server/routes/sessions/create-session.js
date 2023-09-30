const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const checkAuth = require("../../middlewares/check-auth");
const Session = mongoose.model("sessions");

const baseEndpoint = "/api/session";

router.post(`${baseEndpoint}`, checkAuth, async (req, res) => {
  const { title, timeBlocks, public } = req.body;
  console.log(req.currentUser);
  if (req.currentUser.id !== session.owner)
    return res.status(403).send("Not Authorized");
  const sessionDoc = await Session.create({
    title,
    ownerId: req.currentUser.id,
    timeBlocks,
    public,
  });
  res.send(sessionDoc);
});

module.exports = router;
