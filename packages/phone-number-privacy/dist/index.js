"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const bls12377js_blind_1 = require("bls12377js-blind");
const functions = __importStar(require("firebase-functions"));
const config_1 = require("./config");
exports.getSalt = functions.https.onRequest((request, response) => {
    const privateKey = new Buffer(config_1.PHONE_NUMBER_PRIVACY_SECRET_KEY);
    try {
        const salt = bls12377js_blind_1.BLINDBLS.computePRF(privateKey, new Buffer(request.body.blindPhoneNumber));
        response.json({ success: true, salt });
    }
    catch (e) {
        console.error('Failed to compute BLS salt', e);
        response.status(500).send('Failed to compute BLS salt');
    }
});
//# sourceMappingURL=index.js.map