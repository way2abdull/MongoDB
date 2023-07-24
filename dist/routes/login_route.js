"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const joi_1 = __importDefault(require("joi"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = require("../models");
const SECRET_KEY = process.env.SECRET_KEY;
const loginrouter = express_1.default.Router();
const loginSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
});
const loginHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Validate user input
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    // Check if user exists
    const user = yield models_1.Users.findOne({ email: value.email });
    if (!user) {
        return res.status(400).json({ error: 'Invalid email or password' });
    }
    // Verify the password
    const validPassword = yield bcrypt_1.default.compare(value.password, user.password);
    if (!validPassword) {
        return res.status(400).json({ error: 'Invalid email or password' });
    }
    // Generate a JWT token for the user
    // const token = user.generateAuthToken();
    loginrouter.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const token = jsonwebtoken_1.default.sign({ id: user.username }, SECRET_KEY, { expiresIn: '360' });
            console.log("Token:", token);
            res.status(200).json({ status: "Login Success", token });
        }
        catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    }));
});
// export default loginHandler;
exports.default = loginrouter;
//# sourceMappingURL=login_route.js.map