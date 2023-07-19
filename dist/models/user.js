"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// import mongoose, { Types } from 'mongoose';
const Schema = mongoose_1.default.Schema;
const ObjectId = Schema.Types.ObjectId;
const UserSchema = new Schema({
    _id: {
        type: Number
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        required: false,
    },
    profile_pic: {
        type: String,
        required: false,
    },
    follower_count: [{
            type: ObjectId,
            ref: 'User'
        }],
    following_count: [{
            type: ObjectId,
            ref: 'User'
        }],
    post_count: [{
            type: ObjectId,
            ref: 'Post'
        }]
});
exports.Users = mongoose_1.default.model('User', UserSchema);
//# sourceMappingURL=user.js.map