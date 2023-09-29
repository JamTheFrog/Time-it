const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const checkAuth = require("../../middlewares/check-auth");
const Session = mongoose.model("sessions");

const baseEndpoint = "/api/session";

router.put(`${baseEndpoint}/:id`, checkAuth, async (req, res) => {
  const { id } = req.params
  const { title, public } = req.body;

  const session = await Session.findById(id);

  if(req.currentUser.id !== session.owner) return res.status(403).send("Not Authorized")

  session.title = title
  session.public = public

  const sessionDoc = await session.save()
  
  res.send(sessionDoc);
});

module.exports = router;

