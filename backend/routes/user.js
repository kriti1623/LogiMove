const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User , Captain } = require('../db/index');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || '';
const JWT_EXPIRES_IN = '16h';  // Token will expire in 16 hour

// Test route
router.get('/', function (req, res) {
    //console.log(JWT_SECRET);
    res.send(`I'm user`);
});

// Signup route
router.post('/signup', async function (req, res) {
    const { firstName, lastName, userRole, email, password, vehicleType } = req.body;

    // Validate user input
    if (!firstName || !lastName || !email || !password || !userRole) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Check if user or captain already exists in parallel
        const [existingUser, existingCaptain] = await Promise.all([
            User.findOne({ email }),
            Captain.findOne({ email })
        ]);

        if (existingUser || existingCaptain) {
            return res.status(409).json({ message: "Email already taken" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds = 10

        // Store the new user based on role
        let createdUser;
        if (userRole === 'user') {
            createdUser = await User.create({
                firstName,
                lastName,
                userRole,
                email,
                password: hashedPassword
            });
        } else if (userRole === 'captain') {
            if (!vehicleType) {
                return res.status(400).json({ message: "Vehicle type is required for drivers" });
            }
            createdUser = await Captain.create({
                firstName,
                lastName,
                userRole,
                email,
                vehicleType,
                password: hashedPassword
            });
        } else {
            return res.status(400).json({ message: "Invalid user role" });
        }

        // Create a JWT token
        const token = jwt.sign({ userId: createdUser._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        // Return user info and token
        return res.status(201).json({
            name: createdUser.firstName,
            userId: createdUser._id,
            email : createdUser.email,
            userRole : createdUser.userRole,
            token : token
        });

    } catch (error) {
        console.error("Signup error:", error); // Log for debugging purposes
        return res.status(500).json({ message: "Internal server error" });
    }
});


// Signin route
router.post('/signin', async function (req, res) {
    const { email, password } = req.body;

    try {
        // Check if the user or captain exists in parallel
        const [user, captain] = await Promise.all([
            User.findOne({ email }),
            Captain.findOne({ email })
        ]);

        // If neither user nor captain is found
        if (!user && !captain) {
            return res.status(404).json({
                message: "User or Captain not found"
            });
        }

        // Determine which entity was found (user or captain)
        const entity = user || captain;

        // Compare the password for the found entity
        const isPasswordValid = await bcrypt.compare(password, entity.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Create a JWT token
        const token = jwt.sign({ userId: entity._id }, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN
        });

        // Return the correct response based on the found entity
        res.status(200).json({
            userId: entity._id,
            name: entity.firstName,
            email: entity.email,
            userRole: entity.userRole,  // Assuming both User and Captain have a userRole field
            token: token  // Send the JWT token back to the client
        });

    } catch (error) {
        console.error("Signin error:", error);
        res.status(500).json({
            message: "Error while signing in"
        });
    }
});


module.exports = router;
