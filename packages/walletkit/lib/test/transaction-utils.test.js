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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var bignumber_js_1 = require("bignumber.js");
var erc20_utils_1 = require("../src/erc20-utils");
var logger_1 = require("../src/logger");
var signing_utils_1 = require("../src/signing-utils");
var transaction_utils_1 = require("../src/transaction-utils");
var utils_1 = require("./utils");
beforeAll(function () {
    logger_1.Logger.setLogLevel(logger_1.LogLevel.VERBOSE);
});
// A random private key
var privateKey = '1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef';
var accountAddress = utils_1.generateAccountAddressFromPrivateKey(privateKey);
describe('Transaction Utils V2', function () {
    describe('Signer Testing', function () {
        it('should be able to sign and get the signer back', function () { return __awaiter(void 0, void 0, void 0, function () {
            var web3, gasPrice, from, to, amountInWei, gasFees, gatewayFee, feeCurrency, nonce, rawTransaction, _a, _b, recoveredSigner;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        jest.setTimeout(20 * 1000);
                        return [4 /*yield*/, utils_1.getWeb3WithSigningAbilityForTesting(privateKey)];
                    case 1:
                        web3 = _c.sent();
                        logger_1.Logger.debug('Signer Testing', "Testing using Account: " + accountAddress);
                        gasPrice = 1e11 // Note: "await web3.eth.getGasPrice()" deos not work for now
                        ;
                        logger_1.Logger.debug('Signer Testing', "Gas price is " + gasPrice);
                        from = accountAddress;
                        to = accountAddress;
                        amountInWei = new bignumber_js_1.BigNumber(1e18);
                        gasFees = new bignumber_js_1.BigNumber(1000 * 1000);
                        gatewayFee = new bignumber_js_1.BigNumber(25000);
                        return [4 /*yield*/, erc20_utils_1.getGoldTokenAddress(web3)];
                    case 2:
                        feeCurrency = _c.sent();
                        return [4 /*yield*/, web3.eth.getTransactionCount(from)];
                    case 3:
                        nonce = _c.sent();
                        _a = transaction_utils_1.getRawTransaction;
                        _b = [web3,
                            from,
                            to,
                            nonce,
                            amountInWei,
                            gasFees,
                            new bignumber_js_1.BigNumber(gasPrice)];
                        return [4 /*yield*/, web3.eth.getCoinbase()];
                    case 4: return [4 /*yield*/, _a.apply(void 0, _b.concat([_c.sent(),
                            gatewayFee,
                            feeCurrency]))];
                    case 5:
                        rawTransaction = _c.sent();
                        recoveredSigner = signing_utils_1.recoverTransaction(rawTransaction);
                        expect(recoveredSigner).toEqual(from);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
