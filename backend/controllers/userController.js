import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';


// @desc Aurthenticate user & get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;   // get email and password from req.body

    const user = await User.findOne({ email }); // find user by email

    if (user && (await user.matchPassword(password))) { // if user exists  
        generateToken(res, user._id); // generate token

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else { // if user does not exist  
        res.status(401);
        throw new Error("Invalid email or password");
    }
}
);

// @desc Register 
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;   // get name, email and password from req.body

    const userExists = await User.findOne({ email }); // find user by email

    if (userExists) { // if user exists
        res.status(400);
        throw new Error("User already exists");

    }

    const user = await User.create({
        name,
        email,
        password
    }); // create user

    if (user) { // if user is created
        generateToken(res, user._id); // generate token

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,

        });
    } else { // if user is not created
        res.status(400);
        throw new Error("Invalid user data");
    }
}

);

// @desc Logout user / clear cookie 
// @route POST /api/users/logout
// @access Private
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });

    res.status(200).json({
        message: "Logged out successfully"
    });
}
);

// @desc Get user profile 
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
    res.send("get user profile");
}
);

// @desc Update user profile 
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
    res.send("update user profile");
}
);

// @desc Get users
// @route GET /api/users
// @access Private/Admin
const getUser = asyncHandler(async (req, res) => {
    res.send("get users");
}
);

// @desc Delete user
// @route DELETE /api/users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    res.send("delete user");
}
);

// @desc Get user by id
// @route GET /api/users/:id
// @access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
    res.send("get user by id");
}
);

// @desc Update user
// @route PUT /api/users/:id
// @access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    res.send("update user");
}
);

export {

    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUser,
    deleteUser,
    getUserById,
    updateUser

}


