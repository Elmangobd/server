const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    namep: {
        type: String,
        required: true
    },
    namem: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
})

userSchema.pre('save', async function (next) {
    const user = this;
    console.log("Justo antes de guardar antes de hash", user.password);
    if (!user.isModified('password')) {
        return next();
    }
    user.password = await bcrypt.hash(user.password, 8);
    console.log("Justo antes de guardar y después de hash", user.password);
    next();
})



mongoose.model("User", userSchema);
