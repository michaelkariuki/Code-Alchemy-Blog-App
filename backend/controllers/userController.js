const bcrypt = require("bcrypt");
const userModel = require("../models/PrismaUserModels");
const saltRounds = 10;

exports.login = async (req, res) => {
  //Check if username or email
  // check if username/email exist
  // if user :  login
  // if not : error msg / refuse login
  // Additionally assign tokens to logged in user

  try {
    const { username, password, email } = req.body;
    let user = req.body; //Info here should be parsed {check whether actually email or username (regex)}
    console.log(user)
    // Check if user used email or password for authentication (both unique)
    if (username) {
      user = await userModel.getLoginData("username", username);
    } else if (email) {
      user = await userModel.getLoginData("email", email);
    } else {
      // return res.status(401).json({
      //   error: "No username or email",
      // });
      return res.status(400).json({
        message: {
          title: "Login Failed",
          text: "Username or password is wrong",
          type: "danger",
        },
      });
    }

    // If the user doesn't exist, return an error
    if (!user) {
      // return res.status(401).json({
      //   error: "Invalid credentials",
      // });
      return res.status(400).json({
        message: {
          title: "Login Failed",
          text: "Username or password is invalid",
          type: "danger",
        },
        info: "User does not exist"
      });
    }

    // Compare the provided password with the hashed password stored in the database
    if (password) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      // If the passwords don't match, return an error
      if (!passwordMatch) {
        return res.status(400).json({
          message: {
            title: "Login Failed",
            text: "Username or password is invalid",
            type: "danger",
          },
        });
      }
    } else {
      return res.status(400).json({
        message: {
          title: "Login Failed",
          text: "Username or password is invalid",
          type: "danger",
        },
        info: "No password provided"
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

    return res.status(200).json({
      success: "Login successfull",
      // user: user.username,
      session: req.session,
    });

    // return res.status(400).json({
    //   message: {
    //     title: "Login Failed",
    //     text: "Username or password is wrong",
    //     type: "danger",
    //   },
    // });
  } catch (error) {
    console.error("Error logging in", error);
    return res.status(500).json({
      error: "An error occurred logging you in",
    });
  }
};

// CREATE USER
exports.signup = async (req, res) => {
  try {
    let userData = req.parsedData.userData;
    let profileData = req.parsedData.profileData;

    // Create hash for user's password
    if (userData.password) {
      const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
      userData.password = hashedPassword;
    } else {
      return res.status(400).json({
        message: {
          title: "Sign up Failed",
          message: "Unable process data",
          type: "warning",
        },
        info: "No password provided",
      });
    }

    if (userData.username || userData.email) {
      const checkUser = await userModel.getUser([
        { username: userData.username },
        { email: userData.email },
      ]);

      if (checkUser) {
        return res.status(200).json({
          message: {
            title: "Sign up Failed",
            message: "User already exists",
            type: "warning",
          },
          info: "User already exists",
        });
      } else {
        // Create a new user
        // Create a new profile in the Profile model and associate it with the user
        const user = await userModel.createUser(userData);
        profileData.user_id = user.user_id;
        await userModel.createProfile(profileData);
      }
    } else {
      return res.status(400).json({
        message: {
          title: "ERROR!",
          message: "Unable process data",
          type: "danger",
        },
        info: "Insufficient data to create user",
      });
    }

    return res.status(201).json({
      message: {
        title: "Success",
        message: "User created successfully",
        type: "success",
      },
    });
  } catch (error) {
    console.error("Error during registration", error);
    return res.status(500).json({
      message: {
        title: "ERROR!",
        message: "Error occured. Unable process data",
        type: "danger",
      },
      error: "An error occurred during registration",
    });
  }
};

exports.logout = async (req, res) => {
  // console.log(req)
  // console.log(req.session)
  if (req.session.sessionData) {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        return res.status(500).json({
          error: "An error occurred while logging out",
        });
      }
      return res.json({ message: "Logged out successfully" });
    });
  } else {
    return res.status(404).json({
      error: "No session data found",
    });
  }
};
