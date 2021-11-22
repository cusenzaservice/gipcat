import jwt from 'jsonwebtoken';
import config from '../config/general.config';

exports.verify = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) res.status(403).json({error: "Please provide a token"})
    else {
        jwt.verify(token.split(" ")[1], config.jwtSecret, (err, value) => {
            if (err) res.status(500).json({error: 'Failed to authenticate JWT'})
            req.session = value;
            next();
        })
    }
}