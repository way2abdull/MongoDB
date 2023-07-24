"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessions = void 0;
const mongoose_1 = require("mongoose");
const SessionSchema = new mongoose_1.Schema({
    user_id: {
        type: Number,
        ref: 'User',
        required: true
    },
    device_id: {
        type: Number,
        required: true
    },
    device_type: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
});
exports.sessions = (0, mongoose_1.model)('Session', SessionSchema);
//# sourceMappingURL=session.js.map