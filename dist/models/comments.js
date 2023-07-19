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
exports.comments = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const ObjectId = Schema.Types.ObjectId;
const replySchema = new Schema({
    user_id: {
        type: ObjectId,
        ref: 'user',
        required: true
    },
    reply_content: {
        type: String,
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
        type: String,
        required: true
    },
    comment_likes: {
        type: Number
    },
    replySchema: replySchema,
});
exports.comments = (0, mongoose_1.model)('Comment', commentSchema);
//# sourceMappingURL=comments.js.map