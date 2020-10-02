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
var contract_utils_1 = require("./contract-utils");
var contracts_1 = require("./contracts");
// Write out the full number in "toString()"
bignumber_js_1.BigNumber.config({ EXPONENTIAL_AT: 1e9 });
var tag = 'erc20-utils';
function getErc20Balance(contract, address, web3) {
    return __awaiter(this, void 0, void 0, function () {
        var balance, decimals, one;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, balanceOf(contract, address, web3)
                    // TODO(asa): Add decimals to IERC20Token interface
                    // @ts-ignore
                ];
                case 1:
                    balance = _a.sent();
                    return [4 /*yield*/, contract.methods.decimals().call()
                        // @ts-ignore
                    ];
                case 2:
                    decimals = _a.sent();
                    one = new bignumber_js_1.BigNumber(10).pow(decimals);
                    return [2 /*return*/, new bignumber_js_1.BigNumber(balance).div(one)];
            }
        });
    });
}
exports.getErc20Balance = getErc20Balance;
// TODO(asa): Figure out why GoldToken.balanceOf() returns 2^256 - 1
function balanceOf(contract, address, web3) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = contract.options.address;
                    return [4 /*yield*/, getGoldTokenAddress(web3)];
                case 1:
                    if (!(_a === (_d.sent()))) return [3 /*break*/, 3];
                    _b = bignumber_js_1.BigNumber.bind;
                    return [4 /*yield*/, web3.eth.getBalance(address)];
                case 2: return [2 /*return*/, new (_b.apply(bignumber_js_1.BigNumber, [void 0, _d.sent()]))()];
                case 3:
                    _c = bignumber_js_1.BigNumber.bind;
                    return [4 /*yield*/, contract.methods.balanceOf(address).call()];
                case 4: return [2 /*return*/, new (_c.apply(bignumber_js_1.BigNumber, [void 0, _d.sent()]))()];
            }
        });
    });
}
exports.balanceOf = balanceOf;
function convertToContractDecimals(value, contract) {
    return __awaiter(this, void 0, void 0, function () {
        var decimals, _a, one;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = bignumber_js_1.BigNumber.bind;
                    return [4 /*yield*/, contract.methods.decimals().call()];
                case 1:
                    decimals = new (_a.apply(bignumber_js_1.BigNumber, [void 0, _b.sent()]))();
                    one = new bignumber_js_1.BigNumber(10).pow(decimals.toNumber());
                    return [2 /*return*/, one.times(value)];
            }
        });
    });
}
exports.convertToContractDecimals = convertToContractDecimals;
function parseFromContractDecimals(value, contract) {
    return __awaiter(this, void 0, void 0, function () {
        var decimals, _a, one;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = bignumber_js_1.BigNumber.bind;
                    return [4 /*yield*/, contract.methods.decimals().call()];
                case 1:
                    decimals = new (_a.apply(bignumber_js_1.BigNumber, [void 0, _b.sent()]))();
                    one = new bignumber_js_1.BigNumber(10).pow(decimals.toNumber());
                    return [2 /*return*/, value.div(one)];
            }
        });
    });
}
exports.parseFromContractDecimals = parseFromContractDecimals;
function selectTokenContractByIdentifier(contracts, identifier) {
    return __awaiter(this, void 0, void 0, function () {
        var identifiers, index;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.all(
                    // @ts-ignore
                    contracts.map(function (contract) { return contract.methods.symbol().call(); }))];
                case 1:
                    identifiers = _a.sent();
                    index = identifiers.indexOf(identifier);
                    return [2 /*return*/, contracts[index]];
            }
        });
    });
}
exports.selectTokenContractByIdentifier = selectTokenContractByIdentifier;
function approveToken(token, address, approveAmount, txOptions) {
    if (txOptions === void 0) { txOptions = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var tx;
        return __generator(this, function (_a) {
            tx = token.methods.approve(address, approveAmount.toString());
            return [2 /*return*/, contract_utils_1.sendTransaction(tag, 'approve token', tx, txOptions)];
        });
    });
}
exports.approveToken = approveToken;
function allowance(token, owner, spender) {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = bignumber_js_1.BigNumber.bind;
                    return [4 /*yield*/, token.methods.allowance(owner, spender).call()];
                case 1: return [2 /*return*/, new (_a.apply(bignumber_js_1.BigNumber, [void 0, _b.sent()]))()];
            }
        });
    });
}
exports.allowance = allowance;
function transferToken(toAddress, token, amount, txOptions) {
    if (txOptions === void 0) { txOptions = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var tx;
        return __generator(this, function (_a) {
            tx = token.methods.transfer(toAddress, amount.toString());
            return [2 /*return*/, contract_utils_1.sendTransaction(tag, 'transfer token', tx, txOptions)];
        });
    });
}
exports.transferToken = transferToken;
function transferTokenWithComment(toAddress, token, amount, comment, txOptions) {
    if (txOptions === void 0) { txOptions = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var tx;
        return __generator(this, function (_a) {
            tx = token.methods.transferWithComment(toAddress, amount.toString(), comment);
            return [2 /*return*/, contract_utils_1.sendTransaction(tag, 'transfer token with comment', tx, txOptions)];
        });
    });
}
exports.transferTokenWithComment = transferTokenWithComment;
// exported for testing
function getGoldTokenAddress(web3) {
    return __awaiter(this, void 0, void 0, function () {
        var goldToken;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, contracts_1.getGoldTokenContract(web3)];
                case 1:
                    goldToken = _a.sent();
                    return [2 /*return*/, goldToken._address];
            }
        });
    });
}
exports.getGoldTokenAddress = getGoldTokenAddress;
