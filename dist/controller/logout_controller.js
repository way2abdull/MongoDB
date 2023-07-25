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
exports.user_logout = void 0;
const sessions_1 = require("../models/sessions");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const user_logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //secretKey
    let SECRET_KEY = process.env.SECRET_KEY;
    //JWT Token
    let token = req.headers.authorization;
    let decode;
    try {
        decode = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        console.log(decode);
    }
    catch (err) {
        res.send("token Expire or not valid");
    }
    try {
        let data = yield sessions_1.sessionModel.updateOne({
            userId: decode === null || decode === void 0 ? void 0 : decode._id,
            isActive: true,
        }, {
            $set: { isActive: false },
        });
        console.log(data, decode === null || decode === void 0 ? void 0 : decode._id);
        res.send("logout successfully");
    }
    catch (err) {
        res.send("error");
    }
});
exports.user_logout = user_logout;
//# sourceMappingURL=logout_controller.js.map