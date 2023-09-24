const mongoose = require("mongoose")
const { Schema } = mongoose


const sessionSchema = new Schema({
    ownerId: {type: String, required: true},
    title: {type: String, required: true},
    timeblocks: {type: Array, required: true},
    public: {type: Boolean, required: true}
})

mongoose.model("sessions", sessionSchema)