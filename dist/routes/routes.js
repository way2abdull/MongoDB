"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const signupController_1 = require("../controller/signupController");
const loginController_1 = require("../controller/loginController");
const follow_controller_1 = require("../controller/follow_controller");
const checkuser_1 = require("../middleware/checkuser");
const logout_controller_1 = require("../controller/logout_controller");
const post_controller_1 = require("../controller/post_controller");
const session_mid_1 = require("../middleware/session_mid");
const router = express_1.default.Router();
exports.router = router;
router.post('/signup', signupController_1.UserSignup);
router.post('/login', loginController_1.user_login);
router.get('/follower', checkuser_1.checkusername, follow_controller_1.update_follower);
router.patch('/logout', logout_controller_1.user_logout);
router.post('/post', session_mid_1.sessionCheck, post_controller_1.postController);
//# sourceMappingURL=routes.js.map