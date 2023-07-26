// import Joi from 'joi';
import * as dotenv from 'dotenv';
import jwt from "jsonwebtoken";
dotenv.config();


const SECRET_KEY = process.env.SECRET_KEY;

export class Verify {
    static async verify_token(token) {
        // const token = req.headers.authorization;
        console.log(token);
        if (token) {
            const decoded = jwt.verify(token, SECRET_KEY);
            return decoded;
        }
        else {
            return false;
        }
    }

}