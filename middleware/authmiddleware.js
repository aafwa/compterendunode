const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header['authorization']?.split('Bearer ')[1];

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
        } catch (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
    }

    next();
};

