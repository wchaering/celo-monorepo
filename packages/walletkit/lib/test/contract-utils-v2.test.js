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
var bignumber_js_1 = require("bignumber.js");
var sleep_promise_1 = __importDefault(require("sleep-promise"));
var network_name_1 = require("../contracts/network-name");
var contract_utils_v2_1 = __importDefault(require("../src/contract-utils-v2"));
var logger_1 = require("../src/logger");
var utils_2 = require("./utils");
beforeAll(function () {
    logger_1.Logger.setLogLevel(logger_1.LogLevel.VERBOSE);
});
describe('Contract Utils V2', function () {
    describe('#getErc20Balance', function () {
        it('should be able to get Gold balance', function () { return __awaiter(void 0, void 0, void 0, function () {
            var web3, goldBalanceInWei, _a, goldBalanceInEther;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, utils_2.getWeb3ForTesting()];
                    case 1:
                        web3 = _b.sent();
                        logger_1.Logger.debug('getErc20Balance Test', "Testing using Account: " + utils_2.getMiner0AccountAddress(network_name_1.NETWORK_NAME));
                        _a = bignumber_js_1.BigNumber.bind;
                        return [4 /*yield*/, web3.eth.getBalance(utils_2.getMiner0AccountAddress(network_name_1.NETWORK_NAME))];
                    case 2:
                        goldBalanceInWei = new (_a.apply(bignumber_js_1.BigNumber, [void 0, _b.sent()]))();
                        logger_1.Logger.info('getErc20Balance Test', "Gold balance (directly fetched) is " + goldBalanceInWei);
                        return [4 /*yield*/, contract_utils_v2_1.default.getGoldBalance(web3, utils_2.getMiner0AccountAddress(network_name_1.NETWORK_NAME))];
                    case 3:
                        goldBalanceInEther = _b.sent();
                        logger_1.Logger.info('getErc20Balance Test', "cGLD balance: " + goldBalanceInEther + " in ethers");
                        return [2 /*return*/];
                }
            });
        }); });
        it('should be able to get Dollar balance', function () { return __awaiter(void 0, void 0, void 0, function () {
            var web3, dollarBalance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, utils_2.getWeb3ForTesting()];
                    case 1:
                        web3 = _a.sent();
                        logger_1.Logger.debug('getErc20Balance Test', "Testing using Account: " + utils_2.getMiner0AccountAddress(network_name_1.NETWORK_NAME));
                        return [4 /*yield*/, contract_utils_v2_1.default.getDollarBalance(web3, utils_2.getMiner0AccountAddress(network_name_1.NETWORK_NAME))];
                    case 2:
                        dollarBalance = _a.sent();
                        logger_1.Logger.info('getErc20Balance Test', "cUSD balance: " + dollarBalance + " in ethers");
                        return [2 /*return*/];
                }
            });
        }); });
        it('should be able to get Total Gold supply', function () { return __awaiter(void 0, void 0, void 0, function () {
            var web3, totalGoldSupply;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, utils_2.getWeb3ForTesting()];
                    case 1:
                        web3 = _a.sent();
                        return [4 /*yield*/, contract_utils_v2_1.default.getTotalGoldSupply(web3)];
                    case 2:
                        totalGoldSupply = _a.sent();
                        logger_1.Logger.info('getErc20Balance Test', "gold supply: " + totalGoldSupply);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('#transferTests', function () {
        it('sendCeloGoldWithGasInCeloDollar', function () { return __awaiter(void 0, void 0, void 0, function () {
            var web3Miner0, from, to, amountInEther, gasPriceInCeloDollar, gasFees;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jest.setTimeout(30 * 1000);
                        return [4 /*yield*/, utils_2.getWeb3WithSigningAbilityForTesting(utils_2.getMiner0PrivateKey(network_name_1.NETWORK_NAME))];
                    case 1:
                        web3Miner0 = _a.sent();
                        from = utils_2.getMiner0AccountAddress(network_name_1.NETWORK_NAME);
                        to = utils_2.getMiner1AccountAddress(network_name_1.NETWORK_NAME);
                        amountInEther = 1;
                        return [4 /*yield*/, contract_utils_v2_1.default.getGasPrice(web3Miner0, utils_1.CURRENCY_ENUM.DOLLAR)];
                    case 2:
                        gasPriceInCeloDollar = _a.sent();
                        logger_1.Logger.debug('Send celo gold test', "Gas price in Celo Dollar is " + gasPriceInCeloDollar);
                        gasFees = new bignumber_js_1.BigNumber(250 * 1000);
                        return [4 /*yield*/, transferGold(web3Miner0, from, to, amountInEther, gasFees, gasPriceInCeloDollar, utils_1.CURRENCY_ENUM.DOLLAR)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        // TODO(ashishb): This ends up as a pending transaction. If I reverse to and from then it goes through.
        // Figure out why this is failing.
        // Reverse the transfer to minimize the impact of the test.
        it('sendCeloGoldWithGasInCeloGold', function () { return __awaiter(void 0, void 0, void 0, function () {
            var web3Miner0, from, to, amountInEther, gasPriceInCeloGold, gasFees;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jest.setTimeout(30 * 1000);
                        return [4 /*yield*/, utils_2.getWeb3WithSigningAbilityForTesting(utils_2.getMiner0PrivateKey(network_name_1.NETWORK_NAME))];
                    case 1:
                        web3Miner0 = _a.sent();
                        from = utils_2.getMiner0AccountAddress(network_name_1.NETWORK_NAME);
                        to = utils_2.getMiner1AccountAddress(network_name_1.NETWORK_NAME);
                        amountInEther = 1;
                        return [4 /*yield*/, contract_utils_v2_1.default.getGasPrice(web3Miner0, utils_1.CURRENCY_ENUM.GOLD)];
                    case 2:
                        gasPriceInCeloGold = (_a.sent()).multipliedBy(5);
                        logger_1.Logger.debug('Send celo gold test', "Gas price in Celo Gold is " + gasPriceInCeloGold);
                        gasFees = new bignumber_js_1.BigNumber(250 * 1000);
                        return [4 /*yield*/, transferGold(web3Miner0, from, to, amountInEther, gasFees, gasPriceInCeloGold, utils_1.CURRENCY_ENUM.GOLD)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('sendCeloDollarWithGasInCeloDollar', function () { return __awaiter(void 0, void 0, void 0, function () {
            var web3Miner0, from, to, amountInEther, gasPriceInCeloDollar, gasFees;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jest.setTimeout(30 * 1000);
                        return [4 /*yield*/, utils_2.getWeb3WithSigningAbilityForTesting(utils_2.getMiner0PrivateKey(network_name_1.NETWORK_NAME))];
                    case 1:
                        web3Miner0 = _a.sent();
                        from = utils_2.getMiner0AccountAddress(network_name_1.NETWORK_NAME);
                        to = utils_2.getMiner1AccountAddress(network_name_1.NETWORK_NAME);
                        amountInEther = 1;
                        return [4 /*yield*/, contract_utils_v2_1.default.getGasPrice(web3Miner0, utils_1.CURRENCY_ENUM.DOLLAR)];
                    case 2:
                        gasPriceInCeloDollar = _a.sent();
                        logger_1.Logger.debug('Send celo dollar test', "Gas price in Celo Dollar is " + gasPriceInCeloDollar);
                        gasFees = new bignumber_js_1.BigNumber(250 * 1000);
                        return [4 /*yield*/, transferDollar(web3Miner0, from, to, amountInEther, gasFees, gasPriceInCeloDollar, utils_1.CURRENCY_ENUM.DOLLAR)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('sendCeloDollarWithGasInCeloGold', function () { return __awaiter(void 0, void 0, void 0, function () {
            var web3Miner0, from, to, amountInEther, gasPriceInCeloGold, gasFees;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jest.setTimeout(30 * 1000);
                        return [4 /*yield*/, utils_2.getWeb3WithSigningAbilityForTesting(utils_2.getMiner0PrivateKey(network_name_1.NETWORK_NAME))];
                    case 1:
                        web3Miner0 = _a.sent();
                        from = utils_2.getMiner0AccountAddress(network_name_1.NETWORK_NAME);
                        to = utils_2.getMiner1AccountAddress(network_name_1.NETWORK_NAME);
                        amountInEther = 1;
                        return [4 /*yield*/, contract_utils_v2_1.default.getGasPrice(web3Miner0, utils_1.CURRENCY_ENUM.GOLD)];
                    case 2:
                        gasPriceInCeloGold = _a.sent();
                        logger_1.Logger.debug('Send celo dollar test', "Gas price in Celo Dollar is " + gasPriceInCeloGold);
                        gasFees = new bignumber_js_1.BigNumber(250 * 1000);
                        return [4 /*yield*/, transferDollar(web3Miner0, from, to, amountInEther, gasFees, gasPriceInCeloGold, utils_1.CURRENCY_ENUM.GOLD)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('#getGasPrice', function () {
        it('should return a nonzero gas price', function () { return __awaiter(void 0, void 0, void 0, function () {
            var web3, gasPrice;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, utils_2.getWeb3ForTesting()];
                    case 1:
                        web3 = _a.sent();
                        return [4 /*yield*/, contract_utils_v2_1.default.getGasPrice(web3)];
                    case 2:
                        gasPrice = _a.sent();
                        console.debug("Gas Price: " + gasPrice);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('#performExchange', function () {
        // Skipping until appintegration has exchange contract
        it.skip('should be able to exchange celo gold', function () { return __awaiter(void 0, void 0, void 0, function () {
            var web3, gasPrice, from, amountInWei, gasFees, minAmount, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jest.setTimeout(20 * 1000);
                        return [4 /*yield*/, utils_2.getWeb3WithSigningAbilityForTesting(utils_2.getMiner0PrivateKey(network_name_1.NETWORK_NAME))];
                    case 1:
                        web3 = _a.sent();
                        logger_1.Logger.debug('Exchange celo gold test', "Testing using Account: " + utils_2.getMiner0AccountAddress(network_name_1.NETWORK_NAME));
                        return [4 /*yield*/, contract_utils_v2_1.default.getGasPrice(web3)];
                    case 2:
                        gasPrice = _a.sent();
                        logger_1.Logger.debug('Exchange celo gold test', "Gas price is " + gasPrice);
                        from = utils_2.getMiner0AccountAddress(network_name_1.NETWORK_NAME);
                        amountInWei = new bignumber_js_1.BigNumber(1e18);
                        gasFees = new bignumber_js_1.BigNumber(1000 * 1000);
                        minAmount = new bignumber_js_1.BigNumber(0);
                        return [4 /*yield*/, contract_utils_v2_1.default.performExchange(web3, from, amountInWei, utils_1.CURRENCY_ENUM.GOLD, minAmount, gasFees)];
                    case 3:
                        result = _a.sent();
                        logger_1.Logger.info('Send exchange gold test', "Result of exchange is " + result);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('#getExchangeRate()', function () {
        it('should get a rate in dollars', function () { return __awaiter(void 0, void 0, void 0, function () {
            var web3, rate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, utils_2.getWeb3ForTesting()];
                    case 1:
                        web3 = _a.sent();
                        return [4 /*yield*/, contract_utils_v2_1.default.getExchangeRate(web3, utils_1.CURRENCY_ENUM.GOLD)];
                    case 2:
                        rate = _a.sent();
                        console.info("rate in dollars: " + rate);
                        expect(rate.isGreaterThan(0)).toBe(true); // Rate in dollars should be positive
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return a gas price when specifying Gold as the currency', function () { return __awaiter(void 0, void 0, void 0, function () {
            var web3, rate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, utils_2.getWeb3ForTesting()];
                    case 1:
                        web3 = _a.sent();
                        return [4 /*yield*/, contract_utils_v2_1.default.getExchangeRate(web3, utils_1.CURRENCY_ENUM.DOLLAR)];
                    case 2:
                        rate = _a.sent();
                        console.info("rate in gold: " + rate);
                        expect(rate.isGreaterThan(0)).toBe(true); // Rate in gold should be positive
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return a gas price when specifying Celo Dollars as the currency', function () { return __awaiter(void 0, void 0, void 0, function () {
            var web3, rateInDollars, rateInGold;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, utils_2.getWeb3ForTesting()];
                    case 1:
                        web3 = _a.sent();
                        return [4 /*yield*/, contract_utils_v2_1.default.getExchangeRate(web3, utils_1.CURRENCY_ENUM.DOLLAR)];
                    case 2:
                        rateInDollars = _a.sent();
                        return [4 /*yield*/, contract_utils_v2_1.default.getExchangeRate(web3, utils_1.CURRENCY_ENUM.GOLD)];
                    case 3:
                        rateInGold = _a.sent();
                        console.info("multiplied rates: " + rateInDollars.multipliedBy(rateInGold));
                        expect(rateInDollars
                            .multipliedBy(rateInGold)
                            .decimalPlaces(1)
                            .isEqualTo(1)).toBe(true); // Multiplied rates should be approximately 1
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('#getGasPrice', function () {
        it('should return a nonzero gas price', function () { return __awaiter(void 0, void 0, void 0, function () {
            var web3, gasPrice;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, utils_2.getWeb3ForTesting()];
                    case 1:
                        web3 = _a.sent();
                        return [4 /*yield*/, contract_utils_v2_1.default.getGasPrice(web3)];
                    case 2:
                        gasPrice = _a.sent();
                        console.debug("Gas Price: " + gasPrice);
                        expect(gasPrice.toNumber()).toBeGreaterThan(0);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return a gas price when specifying Gold as the currency', function () { return __awaiter(void 0, void 0, void 0, function () {
            var web3, gasPrice;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, utils_2.getWeb3ForTesting()];
                    case 1:
                        web3 = _a.sent();
                        return [4 /*yield*/, contract_utils_v2_1.default.getGasPrice(web3, utils_1.CURRENCY_ENUM.GOLD)];
                    case 2:
                        gasPrice = _a.sent();
                        console.debug("Gas Price: " + gasPrice);
                        expect(gasPrice.toNumber()).toBeGreaterThan(0);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return a gas price when specifying Celo Dollars as the currency', function () { return __awaiter(void 0, void 0, void 0, function () {
            var web3, gasPrice;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, utils_2.getWeb3ForTesting()];
                    case 1:
                        web3 = _a.sent();
                        return [4 /*yield*/, contract_utils_v2_1.default.getGasPrice(web3, utils_1.CURRENCY_ENUM.DOLLAR)];
                    case 2:
                        gasPrice = _a.sent();
                        console.debug("Gas Price: " + gasPrice);
                        expect(gasPrice.toNumber()).toBeGreaterThan(0);
                        return [2 /*return*/];
                }
            });
        }); });
        // TODO: (yerdua)
        // write tests that verify that the GasPriceMinimum method was called with the specified currency
    });
});
function transferGold(web3, from, to, amountInEther, gasFees, gasPrice, feeCurrency) {
    return __awaiter(this, void 0, void 0, function () {
        var amountInWei, fromGoldBalanceBefore, fromDollarBalanceBefore, toGoldBalanceBefore, gatewayFeeRecipient, gatewayFee, result, error_1, fromGoldBalanceAfter, fromDollarBalanceAfter, toGoldBalanceAfter, senderBalanceLoss, gasCostInCeloDollar;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    amountInWei = new bignumber_js_1.BigNumber(amountInEther * 1e18);
                    logger_1.Logger.debug('Send celo gold test', "Testing using account: " + from + " -> " + to + ", feeCurrency: " + feeCurrency);
                    return [4 /*yield*/, contract_utils_v2_1.default.getGoldBalance(web3, from)];
                case 1:
                    fromGoldBalanceBefore = _a.sent();
                    return [4 /*yield*/, contract_utils_v2_1.default.getDollarBalance(web3, from)];
                case 2:
                    fromDollarBalanceBefore = _a.sent();
                    return [4 /*yield*/, contract_utils_v2_1.default.getGoldBalance(web3, to)];
                case 3:
                    toGoldBalanceBefore = _a.sent();
                    return [4 /*yield*/, web3.eth.getCoinbase()];
                case 4:
                    gatewayFeeRecipient = _a.sent();
                    gatewayFee = contract_utils_v2_1.default.defaultGatewayFee;
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, contract_utils_v2_1.default.sendGold(web3, from, to, amountInWei, gasFees, gasPrice, gatewayFeeRecipient, gatewayFee, feeCurrency)];
                case 6:
                    result = _a.sent();
                    logger_1.Logger.info('Send celo gold test', "Result of sendGold is " + result);
                    return [3 /*break*/, 8];
                case 7:
                    error_1 = _a.sent();
                    logger_1.Logger.error('Send celo gold test', "sendGold failed with error " + error_1 + ": " + JSON.stringify(error_1));
                    return [3 /*break*/, 8];
                case 8: return [4 /*yield*/, sleep_promise_1.default(20 * 1000)];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, contract_utils_v2_1.default.getGoldBalance(web3, from)];
                case 10:
                    fromGoldBalanceAfter = _a.sent();
                    return [4 /*yield*/, contract_utils_v2_1.default.getDollarBalance(web3, from)];
                case 11:
                    fromDollarBalanceAfter = _a.sent();
                    return [4 /*yield*/, contract_utils_v2_1.default.getGoldBalance(web3, to)];
                case 12:
                    toGoldBalanceAfter = _a.sent();
                    logger_1.Logger.debug('Send celo gold test', "Sender Gold balance " + fromGoldBalanceBefore + " -> " + fromGoldBalanceAfter);
                    logger_1.Logger.debug('Send celo gold test', "Receiver Gold balance " + toGoldBalanceBefore + " -> " + toGoldBalanceAfter);
                    senderBalanceLoss = fromGoldBalanceBefore.minus(fromGoldBalanceAfter).toNumber();
                    if (feeCurrency === utils_1.CURRENCY_ENUM.GOLD) {
                        expect(senderBalanceLoss > amountInEther).toBe(true);
                    }
                    else if (feeCurrency === utils_1.CURRENCY_ENUM.DOLLAR) {
                        logger_1.Logger.debug('Send celo gold test', "Sender Dollar balance " + fromDollarBalanceBefore + " -> " + fromDollarBalanceAfter);
                        gasCostInCeloDollar = fromDollarBalanceBefore.minus(fromDollarBalanceAfter).toNumber();
                        logger_1.Logger.debug('Send celo gold test', "Gas cost in Celo Dollars " + gasCostInCeloDollar);
                        expect(fromDollarBalanceBefore.minus(fromDollarBalanceAfter).toNumber() > 0).toBe(true);
                    }
                    else {
                        fail(new Error("unexpected fee currency " + feeCurrency));
                    }
                    expect(senderBalanceLoss < amountInEther + 0.01).toBe(true);
                    expect(toGoldBalanceAfter.minus(toGoldBalanceBefore).toNumber()).toBe(amountInEther);
                    return [2 /*return*/];
            }
        });
    });
}
function transferDollar(web3, from, to, amountInEther, gasFees, gasPrice, feeCurrency) {
    return __awaiter(this, void 0, void 0, function () {
        var amountInWei, fromGoldBalanceBefore, fromDollarBalanceBefore, toDollarBalanceBefore, gatewayFeeRecipient, gatewayFee, result, error_2, fromGoldBalanceAfter, fromDollarBalanceAfter, toDollarBalanceAfter, senderGoldBalanceLoss, gasCostInCeloGold, gasCostInCeloDollar;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    amountInWei = new bignumber_js_1.BigNumber(amountInEther * 1e18);
                    logger_1.Logger.debug('Send celo dollar test', "Testing using account: " + from + " -> " + to + ", feeCurrency: " + feeCurrency);
                    return [4 /*yield*/, contract_utils_v2_1.default.getGoldBalance(web3, from)];
                case 1:
                    fromGoldBalanceBefore = _a.sent();
                    return [4 /*yield*/, contract_utils_v2_1.default.getDollarBalance(web3, from)];
                case 2:
                    fromDollarBalanceBefore = _a.sent();
                    return [4 /*yield*/, contract_utils_v2_1.default.getDollarBalance(web3, to)];
                case 3:
                    toDollarBalanceBefore = _a.sent();
                    return [4 /*yield*/, web3.eth.getCoinbase()];
                case 4:
                    gatewayFeeRecipient = _a.sent();
                    gatewayFee = contract_utils_v2_1.default.defaultGatewayFee;
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, contract_utils_v2_1.default.sendDollar(web3, from, to, amountInWei, gasFees, gasPrice, gatewayFeeRecipient, gatewayFee, feeCurrency)];
                case 6:
                    result = _a.sent();
                    logger_1.Logger.info('Send celo dollar test', "Result of sendDollar is " + result);
                    return [3 /*break*/, 8];
                case 7:
                    error_2 = _a.sent();
                    logger_1.Logger.error('Send celo dollar test', "sendDollar failed with error " + error_2 + ": " + JSON.stringify(error_2));
                    return [3 /*break*/, 8];
                case 8: return [4 /*yield*/, sleep_promise_1.default(20 * 1000)];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, contract_utils_v2_1.default.getGoldBalance(web3, from)];
                case 10:
                    fromGoldBalanceAfter = _a.sent();
                    return [4 /*yield*/, contract_utils_v2_1.default.getDollarBalance(web3, from)];
                case 11:
                    fromDollarBalanceAfter = _a.sent();
                    return [4 /*yield*/, contract_utils_v2_1.default.getDollarBalance(web3, to)];
                case 12:
                    toDollarBalanceAfter = _a.sent();
                    logger_1.Logger.debug('Send celo dollar test', "Sender Gold balance " + fromGoldBalanceBefore + " -> " + fromGoldBalanceAfter);
                    logger_1.Logger.debug('Send celo dollar test', "Receiver Dollar balance " + toDollarBalanceBefore + " -> " + toDollarBalanceAfter);
                    senderGoldBalanceLoss = fromGoldBalanceBefore.minus(fromGoldBalanceAfter).toNumber();
                    if (feeCurrency === utils_1.CURRENCY_ENUM.GOLD) {
                        gasCostInCeloGold = fromGoldBalanceBefore.minus(fromGoldBalanceAfter).toNumber();
                        logger_1.Logger.debug('Send celo dollar test', "Gas cost in Celo Gold " + gasCostInCeloGold);
                        expect(gasCostInCeloGold > 0).toBe(true);
                        expect(senderGoldBalanceLoss < amountInEther + 0.01).toBe(true);
                    }
                    else if (feeCurrency === utils_1.CURRENCY_ENUM.DOLLAR) {
                        logger_1.Logger.debug('Send celo dollar test', "Sender Dollar balance " + fromDollarBalanceBefore + " -> " + fromDollarBalanceAfter);
                        gasCostInCeloDollar = fromDollarBalanceBefore
                            .minus(fromDollarBalanceAfter)
                            .minus(amountInEther)
                            .toNumber();
                        logger_1.Logger.debug('Send celo dollar test', "Gas cost in Celo Dollars " + gasCostInCeloDollar);
                        expect(gasCostInCeloDollar > 0).toBe(true);
                    }
                    else {
                        fail(new Error("unexpected fee currency " + feeCurrency));
                    }
                    expect(toDollarBalanceAfter.minus(toDollarBalanceBefore).toNumber()).toBe(amountInEther);
                    return [2 /*return*/];
            }
        });
    });
}
