const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const checkAuth = require("../../middlewares/check-auth");
const Session = mongoose.model("sessions");

const baseEndpoint = "/api/session";

router.delete(`${baseEndpoint}/:id/`, checkAuth, async (req, res) => {
  const { id } = req.params

  const session = await Session.findById(id);

  if(req.currentUser.id !== session.owner) return res.status(403).send("Not Authorized")

  const sessionDoc = await Session.deleteOne(id)
  
  res.send(sessionDoc);
});

module.exports = router;