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
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;
const user_login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = login_validator_1.loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    try {
        const { username, email, password } = req.body;
        let isAvailable = yield user_1.Users.findOne({ username, email, password });
        if (!isAvailable) {
            return res.status(404).json({ status: "User not found" });
        }
        isAvailable = Object.assign({}, JSON.parse(JSON.stringify(isAvailable)));
        const token = jsonwebtoken_1.default.sign({ user: req.body }, SECRET_KEY);
        console.log(token);
        res.status(200).json({ status: "Login Success", token });
        //Session creation if not exist
        let data = yield sessions_1.sessionModel.find({
            userId: isAvailable === null || isAvailable === void 0 ? void 0 : isAvailable._id,
            isActive: true,
        });
        if (!(data.length > 0)) {
            sessions_1.sessionModel.create({
                userId: isAvailable === null || isAvailable === void 0 ? void 0 : isAvailable._id,
                isActive: true,
                loginAt: new Date()
            });
        }
        res.send(req.headers.authorization);
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
    next();
});
exports.user_login = user_login;
//# sourceMappingURL=loginController.js.map