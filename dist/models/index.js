"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.likes = exports.comments = exports.follows = exports.sessions = exports.Posts = exports.Users = exports.Actions = void 0;
var action_1 = require("./action");
Object.defineProperty(exports, "Actions", { enumerable: true, get: function () { return action_1.Actions; } });
var user_1 = require("./user");
Object.defineProperty(exports, "Users", { enumerable: true, get: function () { return user_1.Users; } });
var post_1 = require("./post");
Object.defineProperty(exports, "Posts", { enumerable: true, get: function () { return post_1.Posts; } });
var session_1 = require("./session");
Object.defineProperty(exports, "sessions", { enumerable: true, get: function () { return session_1.sessions; } });
var follow_manage_1 = require("./follow_manage");
Object.defineProperty(exports, "follows", { enumerable: true, get: function () { return follow_manage_1.follows; } });
var comments_1 = require("./comments");
Object.defineProperty(exports, "comments", { enumerable: true, get: function () { return comments_1.comments; } });
var likes_1 = require("./likes");
Object.defineProperty(exports, "likes", { enumerable: true, get: function () { return likes_1.likes; } });
//# sourceMappingURL=index.js.map