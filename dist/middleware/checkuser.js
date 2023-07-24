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
exports.checkusername = void 0;
const models_1 = require("../models");
const checkusername = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.checkusername = checkusername;
//# sourceMappingURL=checkuser.js.map