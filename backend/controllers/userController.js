import { PrismaClient } from '@prisma/client'
const bcrypt = require('bcrypt');
const userModel = require('../models/PrismaUserModels')

const prisma = new PrismaClient();
const saltRounds = 10

exports.login = async (req, res) => {
  //Check if username or email
  // check if username/email exist
  // if user :  login
  // if not : error msg / refuse login
  // Additionally assign tokens to logged in user

  try {
    const { username, password, email } = req.body;
    let user = undefined;

    // Check if user used email or password for authentication (both unique)
    if (username) {
      user = await userModel.getLoginData(username)
    } else {
      user = await userModel.getLoginData(email)
    }

    // If the user doesn't exist, return an error
    if (!user) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    // If the passwords don't match, return an error
    if (!passwordMatch) {
      return res.status(401).json({
        error: "Invalid Credentials",
      });
    }

    // Passwords match, user is authenticated
    const userSessionData = {
      user_id: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
      updated_at: user.updated_at,
      profile_id: user.Profile.profile_id,
      picture: user.Profile.picture,
    };

    req.session.sessionData = userSessionData;

    res.json({
      message: "Login successfull",
      user: user.username,
    });
  } catch (error) {
    Console.error("Error logging in", error);
    res.status(500).json({
      error: "An error occurred logging you in",
    });
  }
};

exports.signup = async (req, res) => {
  try {
    const { username, first_name, last_name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user in the User model
    const user = await userModel.createUser({
      username,
      first_name,
      last_name,
      email,
      hashedPassword,
    });

    // Check if optional profile data is provided
    if (user && req.body.profileData) {
      const { picture, bio, location, interests } = req.body.profileData;

      // Create a new profile in the Profile model and associate it with the user
      await userModel.createProfile({
        picture,
        bio,
        location,
        interests,
        user_id: user.user_id,
      });
    } else {
      // If no profile data is provided, create an empty profile for the user
      await userModel.createProfile({
        user_id: user.user_id,
      });
    }

    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Error during registration", error);
    res.status(500).json({
      error: "An error occurred during registration",
    });
  }
};

exports.logout = async (req, res) => {
  req.session.destroy((err) => {
    console.error("Error destroying session:", err);
    return res.status(500).json({
      error: "An error occurred while logging out",
    });
  });

  res.json({ message: "Logged out successfully" });
};


