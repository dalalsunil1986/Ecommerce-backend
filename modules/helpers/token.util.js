const jwt = require('jsonwebtoken'); // to generate signin token
const expressJwt = require('express-jwt');
// require('dotenv').config();

const tokenUtil = (userObj) => {
    const user = {
        email: userObj.email ? userObj.email : null,
        id: userObj.id ? userObj.id : null
    };
  
   return jwt.sign({
        user
    }, process.env.JWT_SECRET)
};
module.exports = tokenUtil;