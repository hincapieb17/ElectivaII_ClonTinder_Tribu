const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token || token !== 'token 123') {
        return res.status(401).json({ message: 'Unauthorized, invalid token'});
    }

    next();

};

module.exports = authMiddleware;