import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

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
);

userSchema.methods.matchPassword = async function (enteredPassword) { // matchPassword is a method
    return await bcrypt.compare(enteredPassword, this.password); // this.password is the password of the user
};

const User = mongoose.model('User', userSchema);

export default User;
