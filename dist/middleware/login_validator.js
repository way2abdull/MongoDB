"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const loginSchema = joi_1.default.object({
    username: joi_1.default.string().min(3).max(30).required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
});
exports.loginSchema = loginSchema;
//# sourceMappingURL=login_validator.js.map