const jwt = require("jsonwebtoken");

const authGuard = (req, res, next) => {
    const { authorization } = req.headers;
    try {
        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const {id, name, email} = decoded
        req.user = {id, name, email}
        next();
    } catch (error) {
        console.error(error);
        next("authentication failed!");
    }
}

module.exports = authGuard;