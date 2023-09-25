const bcrypt = require('bcrypt');
const userModel = require('../models/PrismaUserModels')
const utils = require('./controllerUtils')
const saltRounds = 10

exports.login = async (req, res) => {
  //Check if username or email
  // check if username/email exist
  // if user :  login
  // if not : error msg / refuse login
  // Additionally assign tokens to logged in user

  try {
    const { username, password, email } = req.body;
    let user = req.body; //Info here should be parsed {check whether actually email or username (regex)}

    // Check if user used email or password for authentication (both unique)
    if (username) {
      user = await userModel.getLoginData("username", username)
      
    } else if (email) {
      user = await userModel.getLoginData("email", email)
    } else{
      return res.status(401).json({
        error: "No username or email",
      });
    }

    // If the user doesn't exist, return an error
    if (!user) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    // Compare the provided password with the hashed password stored in the database
    if (password) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      // If the passwords don't match, return an error
      if (!passwordMatch) {
        return res.status(401).json({
          error: "Invalid Credentials",
        });
      }
    } else {
      return res.status(401).json({
        error: "No password",
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
      success: "Login successfull",
      // user: user.username,
      session: req.session
    });
  } catch (error) {
    console.error("Error logging in", error);
    return res.status(500).json({
      error: "An error occurred logging you in",
    });
  }
};

exports.signup = async (req, res) => {
  // let filterKeys = ['username', 'first_name', 'last_name', 'email', 'password']
  try {
    let userData = utils.castObject(req.body)
    // Check if optional profile data is provided
    let profileData = req.body.profileData
      ? castObject(req.body.profileData)
      : {};

    delete userData.profileData;

    // Create hash for user's password
    if (userData.password){
      const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
      userData.password = hashedPassword
    } else {
      return res.status(400).json({
        message: "User data missing : password",
        // userData: userData
      })
    }
    
    // if (!utils.isObjEmpty(profileData)){
    //   delete userData.profileData
    // } 

    console.log("data : " ,userData)
    let user = undefined
    let profile = undefined

    // Check if user exists
    if (userData.username && userData.email) {
      const checkUser = await userModel.getUser([
        {username: userData.username},
        {email: userData.email}
      ]);

      if (checkUser){
        return res.status(200).json({
          message: "User already exists",
          // user: checkUser.username
        })
      }else{
        // Create a new user
        // Create a new profile in the Profile model and associate it with the user
        user = await userModel.createUser(userData);
        profileData.user_id = user.user_id 
        profile = await userModel.createProfile(profileData);
      }
    } else{
      return res.status(400).json({
        message: `Insufficient data to create user`,
        // userData: userData
      });
    }
    
    return res.status(201).json({
      success: "User registered successfully",
      user : user,
      // userProfile : profile
    });
  } catch (error) {
    console.error("Error during registration", error);
    return res.status(500).json({
      error: "An error occurred during registration",
    });
  }
};

exports.logout = async (req, res) => {
  // console.log(req)
  // console.log(req.session)
  if (req.session.sessionData){
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        return res.status(500).json({
          error: "An error occurred while logging out",
        });
      }
      return res.json({ message: "Logged out successfully" });
    });
    
  }else{
    return res.status(404).json({
      error: "No session data found",
    });
  }
  
};




