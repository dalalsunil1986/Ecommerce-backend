const jwt = require('jsonwebtoken'); // to generate signin token
const expressJwt = require('express-jwt');
// require('dotenv').config();

const tokenUtil = (user) => {
    const newUser = {
        email: user.email ? user.email : null,
        id: user.id ? user.id : null
    };
  
   return jwt.sign({
        newUser
    }, process.env.JWT_SECRET)
};
module.exports = tokenUtil;