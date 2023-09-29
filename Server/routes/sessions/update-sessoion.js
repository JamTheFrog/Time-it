const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const checkAuth = require("../../middlewares/check-auth");
const Session = mongoose.model("sessions");

const baseEndpoint = "/api/session";

router.put(`${baseEndpoint}/:id`, checkAuth, async (req, res) => {
  const { title, timeBlocks, public } = req.body;

  if (req.currentUser.type !== "free")
    return res.status(403).send({ msg: "Not Authorized" });
  const sessionDoc = await Session.create({
    title,
    ownerId: req.currentUser.id,
    timeBlocks,
    public,
  });
  res.send(sessionDoc);
});

module.exports = router;
