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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Redis = void 0;
const redis_1 = require("redis");
const user_1 = require("../models/user");
const joi_1 = require("joi");
const verify_user_1 = require("./verify_user");
const client = (0, redis_1.createClient)();
client.connect();
client.on('error', err => console.log('Redis client error', err));
class Redis {
    static maintain_session_redis(token, client) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield verify_user_1.Verify.verify_token(token);
                const isUser = yield user_1.Users.findOne({ _id: user._id });
                console.log(isUser);
                if (isUser) {
                    yield client.SET(isUser.username, JSON.stringify({
                        user_id: isUser._id,
                        isActive: true,
                        loginAt: joi_1.date
                    }));
                    const session = yield client.get(isUser.username);
                    console.log(session);
                }
                else {
                    console.log("User not found");
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    static logout_session_redis(isUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield client.SET(isUser.username, JSON.stringify({
                    user_id: isUser._id,
                    isActive: false
                }));
                const session = yield client.get(isUser.username);
                console.log(session);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
exports.Redis = Redis;
;
//# sourceMappingURL=redis_session.js.map