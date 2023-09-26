const mongoose = require("mongoose")
const { Schema } = mongoose

const userSchema = new Schema ({
    email: {type: String, required: true, index: true},
    password: {type: String, required: true},
    type: {type: String, required: true},
})

mongoose.model("users", userSchema)