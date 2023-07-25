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
exports.userSignUp = void 0;
const user_1 = require("../models/user");
const dotenv = __importStar(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;
const userSignUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const details = req.body;
    try {
        // await Validate.validateUser.validateAsync(details);
        const user = yield user_1.Users.find({ username: details.username });
        console.log(user);
        if (!user.length) {
            const salt = yield bcrypt_1.default.genSalt(10);
            const hashpassword = yield bcrypt_1.default.hash(details.password, salt);
            // console.log(hashpassword);
            const user_details = new user_1.Users({
                username: details.username,
                first_name: details.first_name,
                last_name: details.last_name,
                email: details.email,
                password: hashpassword,
                bio: details.bio,
                follower_count: details.follower_count,
                following_count: details.follower_count,
                post_count: details.post_count,
            });
            const Details = yield user_details.save();
            res.status(201).json({ message: "User SignUp Success" });
            console.log(Details);
        }
        else {
            res.status(404).json({ message: "User already exist" });
        }
    }
    catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
});
exports.userSignUp = userSignUp;
//# sourceMappingURL=signupController.js.map