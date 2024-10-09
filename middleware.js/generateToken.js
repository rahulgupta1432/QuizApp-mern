import jwt from "jsonwebtoken";
import { encryptToken } from "./aesAlgo.js";


const generateToken = async (userId,tokenVersion) => {
        const payload = {
            userId,
            randomness: Math.random(),
            expiresOn: Date.now() + 1 * 24 * 60 * 60 * 1000,
            createdOn: Date.now(),
            tokenVersion: tokenVersion
        };
        const secret = process.env.JWT_SECRET;
        const options = { expiresIn: '1d' };

        const token = jwt.sign(payload, secret, options);
        // console.log("token",token);
        
        return encryptToken(token);
};


export default generateToken;