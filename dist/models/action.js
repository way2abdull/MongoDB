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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const ObjectId = Schema.Types.ObjectId;
const replySchema = new Schema({
    _id: {
        type: Number,
        required: true
    },
    user_id: {
        type: ObjectId,
        ref: 'user',
        required: true
    },
    reply_content: {
        type: Text,
        required: true
    },
    reply_likes: {
        type: Number
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
});
const commentSchema = new Schema({
    _id: {
        type: Number,
        required: true
    },
    post_id: {
        type: ObjectId,
        ref: 'post',
        required: true
    },
    user_id: {
        type: ObjectId,
        ref: 'user',
        required: true
    },
    content: {
        type: Text,
        required: true
    },
    comment_likes: {
        type: Number
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    replySchema: replySchema,
});
const like = new mongoose_1.default.Schema({
    post_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'post'
    },
    user_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User'
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});
const actionSchema = new Schema({
    action_id: { type: Number, required: true },
    likes: [like],
    comments: [commentSchema],
});
const actions = (0, mongoose_1.model)('Action', actionSchema);
exports.default = actions;
//# sourceMappingURL=action.js.map