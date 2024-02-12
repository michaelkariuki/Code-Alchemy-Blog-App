const crypto = require('crypto');
const fs = require('fs');
const path = require('path');


const generateRandomKey = () => {
    // Generate a 32-byte (256-bit) random key
    return crypto.randomBytes(32).toString('hex')
}



// Middleware to handle base64-encoded images
const handleBase64 = (req, res, next) => {
    try {
            // Check if the request contains a base64 field
    if (req.body.data.profileData.profilePic) {
        const base64Data = req.body.data.profileData.profilePic.split(';base64,').pop()[0];
        const {fileName, fileType} = req.body.data.profileData
      // Decode the base64 string to binary data
      const binaryData = Buffer.from(base64Data, 'base64');

      // Attach the binary data to the request object for use in the controller
      req.file = {
        buffer: binaryData,
        originalname: fileName,  // Provide a default name or modify as needed
        mimetype: fileType
      };
    }else{
        req.file = null;
    }
    // Continue to the next middleware or route handler
    next();
    } catch (error) {
        console.log(error)
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

const handleStorage = (req, res, next) => {
    try {
        if (req.file) {
            const { buffer, originalname, mimetype } = req.file;
            const { username } = req.body.data.accountData;
            const userFolder = `uploads/${username}`;
        
            if (!fs.existsSync(userFolder)) {
              fs.mkdirSync(userFolder);
            }
        
            // Generate a unique filename
            const timestamp = Date.now();
            const extension = path.extname(originalname);
            const fileName = path.basename(originalname, extension);
            const fieldName = Object.keys(req.body.data.profileData).filter(key => key === 'profilePic')
            const uniqueFilename = `${fieldName}-${fileName}-${timestamp}${extension}`;
        
            // Save the binary data to a file
            const filePath = path.join(userFolder, uniqueFilename);
            fs.writeFileSync(filePath, buffer);
        
            // Attach the file information to the request object for further use
            req.uploadedFile = {
              filePath,
              originalname,
              mimetype,
            };
            
            next();
          } else {
              req.uploadedFile = null;
          }
    } catch (error) {
        console.log(error)
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

const parseSignupData = (req, res, next) => {
    try {
        let userData = req.body.data.accountData;
        delete userData.confirmPassword
    
        if(req.uploadedFile){
            const bio = req.body.data.bioData ? req.body.data.bioData : {}
            const profile = {
                ...bio,
                picture : req.uploadedFile.filePath
            }
    
            req.parsedData = {
                userData : {...userData},
                profileData : {...profile}
            }
        }else{
            req.parsedData = {
                userData : {...userData},
                profileData : null
            }
        }
    
        next();
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: {
              title: "ERROR!",
              message: "Error occured. Unable process data",
              type: "danger",
            },
            error: "An error occurred during registration",
        });
    }
}

module.exports = {
    generateRandomKey,
    handleBase64,
    handleStorage,
    parseSignupData
}