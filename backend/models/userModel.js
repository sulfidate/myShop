import mongoose from "mongoose";

const userSchema = mongoose.Schema(   // Schema is a class
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true }, // unique: true means that email must be unique
        password: { type: String, required: true },
        isAdmin: { type: Boolean, required: true, default: false },
    }
    , {
        timestamps: true
    }
)

const User = mongoose.model('User', userSchema)

export default User
