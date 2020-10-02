"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var subproviders_1 = require("@0x/subproviders");
var logger_1 = require("./logger");
var new_web3_utils_1 = require("./new-web3-utils");
var signing_utils_1 = require("./signing-utils");
var CeloProvider = /** @class */ (function (_super) {
    __extends(CeloProvider, _super);
    function CeloProvider(privateKey) {
        var _this = 
        // This won't accept a privateKey with 0x prefix and will call that an invalid key.
        _super.call(this, CeloProvider.getPrivateKeyWithout0xPrefix(privateKey)) || this;
        _this._chainId = null;
        // Prefix 0x here or else the signed transaction produces dramatically different signer!!!
        _this._celoPrivateKey = '0x' + CeloProvider.getPrivateKeyWithout0xPrefix(privateKey);
        _this.accountAddress = new_web3_utils_1.getAccountAddressFromPrivateKey(_this._celoPrivateKey).toLowerCase();
        logger_1.Logger.debug('CeloProvider@construct', "CeloProvider Account address: " + _this.accountAddress);
        return _this;
    }
    CeloProvider.getPrivateKeyWithout0xPrefix = function (privateKey) {
        return privateKey.toLowerCase().startsWith('0x') ? privateKey.substring(2) : privateKey;
    };
    CeloProvider.prototype.getAccounts = function () {
        return [this.accountAddress];
    };
    CeloProvider.prototype.handleRequest = function (payload, next, end) {
        return __awaiter(this, void 0, void 0, function () {
            var signingRequired, shouldPassToSuperClassForHandling;
            return __generator(this, function (_a) {
                signingRequired = false;
                switch (payload.method) {
                    case 'eth_sendTransaction': // fallthrough
                    case 'eth_signTransaction': // fallthrough
                    case 'eth_sign': // fallthrough
                    case 'personal_sign': // fallthrough
                    case 'eth_signTypedData':
                        signingRequired = true;
                }
                shouldPassToSuperClassForHandling = !signingRequired ||
                    (payload.params[0].from !== undefined &&
                        payload.params[0].from !== null &&
                        payload.params[0].from.toLowerCase() === this.accountAddress);
                if (shouldPassToSuperClassForHandling) {
                    return [2 /*return*/, _super.prototype.handleRequest.call(this, payload, next, end)];
                }
                else {
                    // Pass it to the next handler to sign
                    next();
                }
                return [2 /*return*/];
            });
        });
    };
    CeloProvider.prototype.signTransactionAsync = function (txParams) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, signedTx, rawTransaction;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        logger_1.Logger.debug('transaction-utils@signTransactionAsync', "txParams are " + JSON.stringify(txParams));
                        if (!(txParams.chainId === undefined || txParams.chainId === null)) return [3 /*break*/, 2];
                        _a = txParams;
                        return [4 /*yield*/, this.getChainId()];
                    case 1:
                        _a.chainId = _b.sent();
                        _b.label = 2;
                    case 2: return [4 /*yield*/, signing_utils_1.signTransaction(txParams, this._celoPrivateKey)];
                    case 3:
                        signedTx = _b.sent();
                        rawTransaction = signedTx.rawTransaction.toString('hex');
                        return [2 /*return*/, rawTransaction];
                }
            });
        });
    };
    CeloProvider.prototype.getChainId = function () {
        return __awaiter(this, void 0, void 0, function () {
            var chainIdResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this._chainId === null)) return [3 /*break*/, 2];
                        logger_1.Logger.debug('transaction-utils@getChainId', 'Fetching chainId...');
                        return [4 /*yield*/, this.emitPayloadAsync({
                                method: 'net_version',
                                params: [],
                            })];
                    case 1:
                        chainIdResult = _a.sent();
                        this._chainId = parseInt(chainIdResult.result.toString(), 10);
                        logger_1.Logger.debug('transaction-utils@getChainId', "Chain result ID is " + this._chainId);
                        _a.label = 2;
                    case 2: return [2 /*return*/, this._chainId];
                }
            });
        });
    };
    return CeloProvider;
}(subproviders_1.PrivateKeyWalletSubprovider));
exports.CeloProvider = CeloProvider;
/**
 * This method is primarily used for testing at this point.
 * Returns a raw signed transaction which can be used for Celo gold transfer.
 * It is the responsibility of the caller to submit it to the network.
 */
function getRawTransaction(web3, fromAccountNumber, toAccountNumber, nonce, amount, gasFees, gasPrice, gatewayFeeRecipient, gatewayFee, feeCurrency, networkId) {
    return __awaiter(this, void 0, void 0, function () {
        var transaction, signedTransaction, rawTransaction;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    transaction = {
                        nonce: nonce,
                        chainId: networkId,
                        from: fromAccountNumber,
                        to: toAccountNumber,
                        value: amount.toString(),
                        gas: gasFees.toString(),
                        gasPrice: gasPrice.toString(),
                        feeCurrency: feeCurrency,
                        gatewayFeeRecipient: gatewayFeeRecipient,
                        gatewayFee: gatewayFee && gatewayFee.toString(),
                    };
                    logger_1.Logger.debug('transaction-utils@getRawTransaction@Signing', 'transaction...');
                    return [4 /*yield*/, web3.eth.signTransaction(transaction)];
                case 1:
                    signedTransaction = _a.sent();
                    logger_1.Logger.debug('transaction-utils@getRawTransaction@Signing', "Signed transaction " + JSON.stringify(signedTransaction));
                    rawTransaction = signedTransaction.raw;
                    return [2 /*return*/, rawTransaction];
            }
        });
    });
}
exports.getRawTransaction = getRawTransaction;
