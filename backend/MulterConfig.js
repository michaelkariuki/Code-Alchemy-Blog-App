const multer = require('multer');
const fs = require('fs')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Create a user-specific folder based on the username
    const username = req.body.accountData.username;
    const userFolder = `uploads/${username}`

    // Check if the user folder exists; if not, create it
    if(!fs.existsSync(userFolder)){
      fs.mkdirSync(userFolder);
    }

    cb(null, userFolder);
  },
  filename: function (req, file, cb) {
    // Generate a unique filename
    const timestamp = Date.now();
    const extension = file.originalname.split('.').pop()
    const fileName = file.originalname.split('.').slice(0, -1).join('.')
    const fieldName = Object.keys(req.body.profileData).filter(key => key !== 'profilePic')
    const uniqueFilename = `${fieldName}-${fileName}-${timestamp}.${extension}`
    cb(null, uniqueFilename);
    // cb(null, file.originalname);

  },
});

const upload = multer({ storage: storage });

module.exports = upload;