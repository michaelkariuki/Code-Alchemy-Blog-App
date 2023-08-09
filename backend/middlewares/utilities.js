const crypto = require('crypto');

const generateRandomKey = () => {
    // Generate a 32-byte (256-bit) random key
    return crypto.randomBytes(32).toString('hex')
}

module.exports = {
    generateRandomKey
}