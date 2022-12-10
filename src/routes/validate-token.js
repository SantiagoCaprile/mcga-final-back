const User = require('../models/Users');
const jwt = require('jsonwebtoken');

const checkAuth = async (req, res, next) => {
    try{
        const token = req.header("Authorization");
        const decoded = await jwt.verify(token, process.env.TOKEN_SECRET);
        const user = await User.findById(decoded.id);
        if(token !== user.token){
            throw new Error('Invalid token');
        }
        next();
    } catch (error) {
        res.status(401).json({
            Message: 'Unauthorized',
            Success: false,
            data: error.toString(),
        })
    }
}

module.exports = checkAuth