const mongoose = require("mongoose")
const { Schema } = mongoose


const timeBlockSchema = new Schema({
    id: {type: String, required: true},
    title: {type: String, required: true},
    duration: {type: Number, required: true},
    description: {type: String},
    
    
})

const sessionSchema = new Schema ({
    title: {type: String, required: true},
    ownerId: {type: String, required: true, index: true},
    timeBlocks: [timeBlockSchema],
    public: {type: Boolean}
})

mongoose.model("sessions", sessionSchema)
