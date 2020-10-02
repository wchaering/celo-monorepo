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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("@celo/utils");
var bignumber_js_1 = __importDefault(require("bignumber.js"));
var contracts_1 = require("./contracts");
var erc20_utils_1 = require("./erc20-utils");
var logger_1 = require("./logger");
var ContractUtils = /** @class */ (function () {
    function ContractUtils() {
    }
    ContractUtils.getGoldBalance = function (web3, accountNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var goldToken, balance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, contracts_1.getGoldTokenContract(web3)];
                    case 1:
                        goldToken = _a.sent();
                        return [4 /*yield*/, erc20_utils_1.getErc20Balance(goldToken, accountNumber, web3)];
                    case 2:
                        balance = _a.sent();
                        logger_1.Logger.debug("contract-util-v2@getGoldBalance", "Celo Gold balance(" + accountNumber + "): " + balance);
                        return [2 /*return*/, balance];
                }
            });
        });
    };
    ContractUtils.getDollarBalance = function (web3, accountNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var stableToken, balance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, contracts_1.getStableTokenContract(web3)];
                    case 1:
                        stableToken = _a.sent();
                        return [4 /*yield*/, erc20_utils_1.getErc20Balance(stableToken, accountNumber, web3)];
                    case 2:
                        balance = _a.sent();
                        logger_1.Logger.debug("contract-util-v2@getDollarBalance", "Celo Dollar balance(" + accountNumber + "): " + balance);
                        return [2 /*return*/, balance];
                }
            });
        });
    };
    ContractUtils.getTotalGoldSupply = function (web3) {
        return __awaiter(this, void 0, void 0, function () {
            var goldToken, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, contracts_1.getGoldTokenContract(web3)];
                    case 1:
                        goldToken = _b.sent();
                        _a = bignumber_js_1.default.bind;
                        return [4 /*yield*/, goldToken.methods.totalSupply().call()];
                    case 2: return [2 /*return*/, new (_a.apply(bignumber_js_1.default, [void 0, _b.sent()]))()];
                }
            });
        });
    };
    ContractUtils.getExchangeRate = function (web3, makerToken, makerAmount // Assume large makerAmount in wei to show worst case rate
    ) {
        if (makerAmount === void 0) { makerAmount = new bignumber_js_1.default(1000 * 1000000000000000000); }
        return __awaiter(this, void 0, void 0, function () {
            var exchange, sellGold, takerAmount, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, contracts_1.getExchangeContract(web3)];
                    case 1:
                        exchange = _b.sent();
                        sellGold = makerToken === utils_1.CURRENCY_ENUM.GOLD;
                        _a = bignumber_js_1.default.bind;
                        return [4 /*yield*/, exchange.methods.getBuyTokenAmount(makerAmount.toString(), sellGold).call()];
                    case 2:
                        takerAmount = new (_a.apply(bignumber_js_1.default, [void 0, _b.sent()]))();
                        return [2 /*return*/, makerAmount.dividedBy(takerAmount)]; // Number of takerTokens received for one makerToken
                }
            });
        });
    };
    ContractUtils.sendGold = function (web3, fromAccountNumber, toAccountNumber, amount, gasFees, gasPrice, gatewayFeeRecipient, gatewayFee, feeCurrency, networkId) {
        if (feeCurrency === void 0) { feeCurrency = utils_1.CURRENCY_ENUM.GOLD; }
        return __awaiter(this, void 0, void 0, function () {
            var feeCurrencyAddress, transaction;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(feeCurrency !== utils_1.CURRENCY_ENUM.GOLD)) return [3 /*break*/, 2];
                        return [4 /*yield*/, ContractUtils.getAddressForCurrencyContract(web3, feeCurrency)];
                    case 1:
                        feeCurrencyAddress = _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!(gasPrice === undefined)) return [3 /*break*/, 4];
                        return [4 /*yield*/, ContractUtils.getGasPrice(web3, feeCurrency)];
                    case 3:
                        gasPrice = _a.sent();
                        logger_1.Logger.debug('sendGold', "Gas price will be " + gasPrice);
                        _a.label = 4;
                    case 4:
                        transaction = {
                            chainId: networkId,
                            from: fromAccountNumber,
                            to: toAccountNumber,
                            value: amount.toString(),
                            gas: gasFees.toString(),
                            gasPrice: gasPrice.toString(),
                            feeCurrency: feeCurrencyAddress,
                            gatewayFeeRecipient: gatewayFeeRecipient,
                            gatewayFee: gatewayFee && gatewayFee.toString(),
                        };
                        logger_1.Logger.debug('sendGold', "Transaction is " + JSON.stringify(transaction));
                        return [2 /*return*/, web3.eth.sendTransaction(transaction)];
                }
            });
        });
    };
    ContractUtils.sendDollar = function (web3, fromAccountNumber, toAccountNumber, amount, gasFees, gasPrice, gatewayFeeRecipient, gatewayFee, feeCurrency, networkId) {
        if (feeCurrency === void 0) { feeCurrency = utils_1.CURRENCY_ENUM.GOLD; }
        return __awaiter(this, void 0, void 0, function () {
            var feeCurrencyAddress, stableTokenContract, tx, celoTransactionParams;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(feeCurrency !== utils_1.CURRENCY_ENUM.GOLD)) return [3 /*break*/, 2];
                        return [4 /*yield*/, ContractUtils.getAddressForCurrencyContract(web3, feeCurrency)];
                    case 1:
                        feeCurrencyAddress = _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!(gasPrice === undefined)) return [3 /*break*/, 4];
                        return [4 /*yield*/, ContractUtils.getGasPrice(web3, feeCurrency)];
                    case 3:
                        gasPrice = _a.sent();
                        logger_1.Logger.debug('sendGold', "Gas price will be " + gasPrice);
                        _a.label = 4;
                    case 4: return [4 /*yield*/, contracts_1.getStableTokenContract(web3)];
                    case 5:
                        stableTokenContract = _a.sent();
                        return [4 /*yield*/, stableTokenContract.methods.transfer(toAccountNumber, amount.toString())];
                    case 6:
                        tx = _a.sent();
                        celoTransactionParams = {
                            chainId: networkId,
                            from: fromAccountNumber,
                            gas: gasFees.toString(),
                            gasPrice: gasPrice.toString(),
                            feeCurrency: feeCurrencyAddress,
                            gatewayFeeRecipient: gatewayFeeRecipient,
                            gatewayFee: gatewayFee && gatewayFee.toString(),
                        };
                        return [2 /*return*/, tx.send(celoTransactionParams)];
                }
            });
        });
    };
    ContractUtils.performExchange = function (web3, fromAccountNumber, sellAmount, sellCurrency, minBuyAmount, gasFee) {
        return __awaiter(this, void 0, void 0, function () {
            var exchange, sellGold, tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, contracts_1.getExchangeContract(web3)];
                    case 1:
                        exchange = _a.sent();
                        sellGold = sellCurrency === utils_1.CURRENCY_ENUM.GOLD;
                        return [4 /*yield*/, exchange.methods.exchange(sellAmount.toString(), minBuyAmount.toString(), sellGold)];
                    case 2:
                        tx = _a.sent();
                        return [2 /*return*/, tx.send({ from: fromAccountNumber, gas: gasFee.toString() })];
                }
            });
        });
    };
    ContractUtils.getGasPrice = function (web3, feeCurrency) {
        if (feeCurrency === void 0) { feeCurrency = utils_1.CURRENCY_ENUM.GOLD; }
        return __awaiter(this, void 0, void 0, function () {
            var gasPriceMinimum, currencyAddress, gasPriceMinimumInCurrency;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, contracts_1.getGasPriceMinimumContract(web3)];
                    case 1:
                        gasPriceMinimum = _a.sent();
                        return [4 /*yield*/, ContractUtils.getAddressForCurrencyContract(web3, feeCurrency)];
                    case 2:
                        currencyAddress = _a.sent();
                        return [4 /*yield*/, gasPriceMinimum.methods
                                .getGasPriceMinimum(currencyAddress)
                                .call()
                            // TODO Revisit this multiplier?
                        ];
                    case 3:
                        gasPriceMinimumInCurrency = _a.sent();
                        // TODO Revisit this multiplier?
                        return [2 /*return*/, new bignumber_js_1.default(gasPriceMinimumInCurrency).times(5)];
                }
            });
        });
    };
    ContractUtils.getAddressForCurrencyContract = function (web3, currency) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = currency;
                        switch (_a) {
                            case utils_1.CURRENCY_ENUM.DOLLAR: return [3 /*break*/, 1];
                            case utils_1.CURRENCY_ENUM.GOLD: return [3 /*break*/, 3];
                        }
                        return [3 /*break*/, 5];
                    case 1: return [4 /*yield*/, contracts_1.getStableTokenContract(web3)];
                    case 2: return [2 /*return*/, (_b.sent())._address];
                    case 3: return [4 /*yield*/, contracts_1.getGoldTokenContract(web3)];
                    case 4: return [2 /*return*/, (_b.sent())._address];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    // TODO(nategraf): Allow this paramter to be fetched from the full-node peer.
    ContractUtils.defaultGatewayFee = new bignumber_js_1.default(10000);
    return ContractUtils;
}());
exports.default = ContractUtils;
