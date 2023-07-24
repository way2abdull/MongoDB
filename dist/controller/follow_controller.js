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
exports.update_follower = void 0;
const models_1 = require("../models");
const update_follower = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recieverName = req.body.recieverName;
        const senderName = req.body.senderName;
        const checkusername = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            const { recieverName } = req.body;
            if (!recieverName) {
                return res.status(400).json({ error: 'Username is required' });
            }
            try {
                const existingUser = yield models_1.Users.findOne({ username: recieverName });
                if (existingUser) {
                    return res.status(200).json({ exists: true });
                }
                else {
                    return res.status(200).json({ exists: false });
                }
            }
            catch (err) {
                return res.status(500).json({ error: 'cannot find username' });
            }
        });
        const filter = { username: recieverName };
        const update = { $inc: { follower_count: 1 } };
        const result = yield models_1.Users.updateOne(filter, update);
        const filter1 = { username: senderName };
        const update1 = { $inc: { following_count: 1 } };
        const result1 = yield models_1.Users.updateOne(filter1, update1);
        res.status(200).json({ status: "updated successfully" });
    }
    catch (error) {
        console.log(error);
    }
});
exports.update_follower = update_follower;
//# sourceMappingURL=follow_controller.js.map