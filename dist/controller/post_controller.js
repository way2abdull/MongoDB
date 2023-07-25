"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postController = void 0;
const posts_1 = require("../models/posts");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const postController = (req, res) => {
    const token = "" + req.headers.authorization;
    try {
        //JWT Key Coding
        let secretKey = "" + process.env.SECRET_KEY;
        let decoded = jsonwebtoken_1.default.verify(token, secretKey);
        //Creating data that we want to insert into database
        let postData = {
            userId: decoded._id,
            caption: req.body.caption,
            media_url: req.body.media_url,
            hashTags: req.body.hashtag
        };
        posts_1.post.create(postData)
            .then((savedUser) => {
            res.send(postData);
        })
            .catch((error) => {
            res.send(error);
        });
    }
    catch (err) {
        res.send("Error,Data is Crupted");
    }
};
exports.postController = postController;
//# sourceMappingURL=post_controller.js.map