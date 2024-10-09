import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/ErrorHandler.js";
import User from "../model/userModel.js";
import { decryptToken } from "./aesAlgo.js";

export const Auth = async (req, res, next) => {
    const token = req.headers['x-authorization'];
    if (token) {
        try {
            // Decrypt the token
            const decryptedToken = decryptToken(token);
            const decoded = jwt.verify(decryptedToken, process.env.JWT_SECRET);
            // console.log(decryptedToken)

            // Token expiration check
            if (decoded.expiresOn < Date.now()) {
                return res.status(401).json({
                    status: 'failure',
                    code: 401,
                    message: 'Not Authorized, Token Expired',
                    data: [],
                });
            }

            const { userId } = decoded;

            let user = await User.findById(userId);
            if (!user) {
                return res.status(401).json({
                    status: 'failure',
                    code: 401,
                    message: 'Not Authorized, Invalid User',
                    data: {},
                });
            }

          if (user.tokenVersion !== decoded.tokenVersion) {
            return next(new ErrorHandler("Token is invalid or has been logged out",401))
        }
        req.user = user;
        next();
        } catch (error) {
            return res.status(401).json({
                status: 'failure',
                code: 401,
                message: 'Not Authorized, token failed',
                data: {},
            });
        }
    } else {
        return res.status(401).json({
            status: 'failure',
            code: 401,
            message: 'Not Authorized, no token',
            data: {},
        });
    }
};
