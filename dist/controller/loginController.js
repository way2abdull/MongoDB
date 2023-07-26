"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.user_login = void 0;
const user_1 = require("../models/user");
const sessions_1 = require("../models/sessions");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
const login_validator_1 = require("../middleware/login_validator");
const redis_session_1 = require("../middleware/redis_session");
const redis_1 = require("redis");
const client = (0, redis_1.createClient)();
client.connect();
client.on('error', err => console.log('Redis client error', err));
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;
const user_login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = login_validator_1.loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    try {
        const { username, email, password } = req.body;
        let user = yield user_1.Users.findOne({ email });
        console.log(user);
        if (!user) {
            return res.status(404).json({ status: "User not found" });
        }
        user = Object.assign({}, JSON.parse(JSON.stringify(user)));
        const token = jsonwebtoken_1.default.sign({ _id: user === null || user === void 0 ? void 0 : user._id }, SECRET_KEY);
        console.log(token);
        console.log(user);
        //Session creation if not exist
        let data = yield sessions_1.sessionModel.find({
            userId: user === null || user === void 0 ? void 0 : user._id,
            isActive: true,
        });
        if (!(data.length > 0)) {
            sessions_1.sessionModel.create({
                userId: user === null || user === void 0 ? void 0 : user._id,
                isActive: true,
                loginAt: new Date()
            });
        }
        res.status(200).json({ status: "Login Success", token });
        yield redis_session_1.Redis.maintain_session_redis(token, client);
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
    next();
});
exports.user_login = user_login;
//# sourceMappingURL=loginController.js.map