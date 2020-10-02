"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var bignumber_js_1 = __importDefault(require("bignumber.js"));
var lodash_1 = require("lodash");
var sleep_promise_1 = __importDefault(require("sleep-promise"));
var ContractList = __importStar(require("../contracts/index"));
var contracts_1 = require("./contracts");
var erc20_utils_1 = require("./erc20-utils");
var logger_1 = require("./logger");
var gasInflateFactor = 1.5;
// TODO(nategraf): Allow this parameter to be fetched from the full-node peer.
var defaultGatewayFee = new bignumber_js_1.default(10000);
function selectContractByAddress(contracts, address) {
    var addresses = contracts.map(function (contract) { return contract.options.address; });
    var index = addresses.indexOf(address);
    if (index < 0) {
        return null;
    }
    return contracts[index];
}
exports.selectContractByAddress = selectContractByAddress;
/**
 * Util function to send a transaction and log it's progression
 * Throws error on tx failure
 *
 * TODO(ashishb): This function won't work with locally signed transactions.
 * I am not fixing it since we are going to move to contractkit soon and
 * for now, mobile app only uses sendTransactionAsync function which works
 * with locally signed transactions.
 */
// tslint:disable:ban-types
function sendTransaction(tag, name, tx, txParams, onTransactionHash, onReceipt, onConfirmation, onError) {
    if (txParams === void 0) { txParams = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var estGas, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    logger_1.Logger.debug("contract-utils@sendTransaction", tag + "/Initiating send transaction for " + name);
                    _a = bignumber_js_1.default.bind;
                    _c = (_b = Math).round;
                    return [4 /*yield*/, tx.estimateGas(__assign({}, txParams))];
                case 1:
                    estGas = new (_a.apply(bignumber_js_1.default, [void 0, _c.apply(_b, [(_d.sent()) * gasInflateFactor])]))();
                    logger_1.Logger.debug("contract-utils@sendTransaction", tag + "/Sending transaction for " + name + ", with params: " + JSON.stringify(__assign({ gas: estGas }, txParams)));
                    return [2 /*return*/, (tx
                            .send(__assign(__assign({}, txParams), { gas: estGas.toString(), 
                            // Hack to prevent web3 from adding the suggested gold gas price, allowing geth to add
                            // the suggested price in the selected feeCurrency.
                            gasPrice: '0' }))
                            .on('transactionHash', function (hash) {
                            logger_1.Logger.debug(tag + "/Tx hash received for " + name, hash);
                            if (onTransactionHash) {
                                onTransactionHash(hash);
                            }
                        })
                            // @ts-ignore
                            .on('receipt', function (receipt) {
                            logger_1.Logger.debug("contract-utils@sendTransaction", tag + "/Tx receipt received for " + name);
                            if (onReceipt) {
                                onReceipt(receipt);
                            }
                        })
                            .on('confirmation', function (confirmationNumber, receipt) {
                            // Web3 calls this 24 times. We won't log them all
                            if (confirmationNumber === 0 || confirmationNumber === 24) {
                                logger_1.Logger.debug("contract-utils@sendTransaction", tag + "/Tx confirmation number " + confirmationNumber + " received for " + name);
                            }
                            if (onConfirmation) {
                                onConfirmation(confirmationNumber, receipt);
                            }
                        })
                            .on('error', function (error) {
                            logger_1.Logger.error("contract-utils@sendTransaction", tag + "/Tx transaction failed for " + name + ", error: " + error);
                            if (onError) {
                                onError(error);
                            }
                            // When the error is thrown in here, it is not possible to catch the error
                            // at all.
                        }))];
            }
        });
    });
}
exports.sendTransaction = sendTransaction;
function emptyTxLogger(_event) {
    return;
}
exports.emptyTxLogger = emptyTxLogger;
function awaitConfirmation(txPromises) {
    return txPromises.confirmation;
}
exports.awaitConfirmation = awaitConfirmation;
var SendTransactionLogEventType;
(function (SendTransactionLogEventType) {
    SendTransactionLogEventType[SendTransactionLogEventType["Started"] = 0] = "Started";
    SendTransactionLogEventType[SendTransactionLogEventType["EstimatedGas"] = 1] = "EstimatedGas";
    SendTransactionLogEventType[SendTransactionLogEventType["ReceiptReceived"] = 2] = "ReceiptReceived";
    SendTransactionLogEventType[SendTransactionLogEventType["TransactionHashReceived"] = 3] = "TransactionHashReceived";
    SendTransactionLogEventType[SendTransactionLogEventType["Confirmed"] = 4] = "Confirmed";
    SendTransactionLogEventType[SendTransactionLogEventType["Failed"] = 5] = "Failed";
    SendTransactionLogEventType[SendTransactionLogEventType["Exception"] = 6] = "Exception";
})(SendTransactionLogEventType = exports.SendTransactionLogEventType || (exports.SendTransactionLogEventType = {}));
var Started = { type: SendTransactionLogEventType.Started };
var Confirmed = { type: SendTransactionLogEventType.Confirmed };
function EstimatedGas(gas) {
    return { type: SendTransactionLogEventType.EstimatedGas, gas: gas };
}
function ReceiptReceived(receipt) {
    return { type: SendTransactionLogEventType.ReceiptReceived, receipt: receipt };
}
function TransactionHashReceived(hash) {
    return { type: SendTransactionLogEventType.TransactionHashReceived, hash: hash };
}
function Failed(error) {
    return { type: SendTransactionLogEventType.Failed, error: error };
}
function Exception(error) {
    return { type: SendTransactionLogEventType.Exception, error: error };
}
function getGasPrice(web3, feeCurrency) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, gasPriceMinimum, gasPrice;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!(feeCurrency === undefined)) return [3 /*break*/, 2];
                    _a = String;
                    return [4 /*yield*/, web3.eth.getGasPrice()];
                case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                case 2: return [4 /*yield*/, contracts_1.getGasPriceMinimumContract(web3)];
                case 3:
                    gasPriceMinimum = _b.sent();
                    return [4 /*yield*/, gasPriceMinimum.methods.getGasPriceMinimum(feeCurrency).call()];
                case 4:
                    gasPrice = _b.sent();
                    logger_1.Logger.debug('contract-utils@getGasPrice', "Gas price is " + gasPrice);
                    return [2 /*return*/, String(parseInt(gasPrice, 10) * 10)];
            }
        });
    });
}
// Maps account address to current nonce. This ensures that transactions
// being sent too close to each other do not end up having the
// same nonce. This does not have to be persisted across app restarts since
// nonce calculation will be correct over the order of seconds (restart time).
var currentNonce = new Map();
/**
 * sendTransactionAsync mainly abstracts the sending of a transaction in a promise like
 * interface. Use the higher-order sendTransactionFactory as a consumer to configure
 * logging and promise resolution
 * TODO: Should probably renamed to sendTransaction once we remove the current
 *       sendTransaction
 * @param tx The transaction object itself
 * @param account The address from which the transaction should be sent
 * @param feeCurrencyContract The contract instance of the Token in which to pay gas for
 * @param logger An object whose log level functions can be passed a function to pass
 *               a transaction ID
 */
function sendTransactionAsync(tx, account, feeCurrencyContract, logger, estimatedGas) {
    if (logger === void 0) { logger = emptyTxLogger; }
    return __awaiter(this, void 0, void 0, function () {
        var resolvers, rejectors, receipt, transactionHash, confirmation, rejectAll, txParams, _a, _b, error_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    resolvers = {};
                    rejectors = {};
                    receipt = new Promise(function (resolve, reject) {
                        resolvers.receipt = resolve;
                        rejectors.receipt = reject;
                    });
                    transactionHash = new Promise(function (resolve, reject) {
                        resolvers.transactionHash = resolve;
                        rejectors.transactionHash = reject;
                    });
                    confirmation = new Promise(function (resolve, reject) {
                        resolvers.confirmation = resolve;
                        rejectors.confirmation = reject;
                    });
                    rejectAll = function (error) {
                        lodash_1.values(rejectors).map(function (reject) {
                            // @ts-ignore
                            reject(error);
                        });
                    };
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 4, , 5]);
                    logger(Started);
                    txParams = {
                        from: account,
                        feeCurrency: feeCurrencyContract._address,
                        gasPrice: '0',
                    };
                    if (!(estimatedGas === undefined)) return [3 /*break*/, 3];
                    _b = (_a = Math).round;
                    return [4 /*yield*/, tx.estimateGas(txParams)];
                case 2:
                    estimatedGas = _b.apply(_a, [(_c.sent()) * gasInflateFactor]);
                    logger(EstimatedGas(estimatedGas));
                    _c.label = 3;
                case 3:
                    tx.send({
                        from: account,
                        // @ts-ignore
                        feeCurrency: feeCurrencyContract._address,
                        gas: estimatedGas,
                        // Hack to prevent web3 from adding the suggested gold gas price, allowing geth to add
                        // the suggested price in the selected feeCurrency.
                        gasPrice: '0',
                    })
                        // @ts-ignore
                        .on('receipt', function (r) {
                        logger(ReceiptReceived(r));
                        if (resolvers.receipt) {
                            resolvers.receipt(r);
                        }
                    })
                        .on('transactionHash', function (txHash) {
                        logger(TransactionHashReceived(txHash));
                        if (resolvers.transactionHash) {
                            resolvers.transactionHash(txHash);
                        }
                    })
                        .on('confirmation', function (confirmationNumber) {
                        if (confirmationNumber > 1) {
                            // "confirmation" event is called for 24 blocks.
                            // if check to avoid polluting the logs and trying to remove the standby notification more than once
                            return;
                        }
                        logger(Confirmed);
                        if (resolvers.confirmation) {
                            resolvers.confirmation(true);
                        }
                    })
                        .on('error', function (error) {
                        logger(Failed(error));
                        rejectAll(error);
                    });
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _c.sent();
                    logger(Exception(error_1));
                    rejectAll(error_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/, {
                        receipt: receipt,
                        transactionHash: transactionHash,
                        confirmation: confirmation,
                    }];
            }
        });
    });
}
exports.sendTransactionAsync = sendTransactionAsync;
/**
 * sendTransactionAsyncWithWeb3Signing is same as sendTransactionAsync except it fills
 * in the missing fields and locally signs the transaction. It will fail if the `from`
 * is not one of the account whose local signing keys are available. This method
 * should only be used in forno mode where Geth is running remotely.
 *
 * This separate function is temporary and contractkit uses a unified function
 * for both web3 (local) and remote (geth) siging.
 *
 * @param tx The transaction object itself
 * @param account The address from which the transaction should be sent
 * @param feeCurrencyContract The contract instance of the Token in which to pay gas for
 * @param logger An object whose log level functions can be passed a function to pass
 *               a transaction ID
 */
function sendTransactionAsyncWithWeb3Signing(web3, tx, account, feeCurrencyContract, logger, estimatedGas) {
    if (logger === void 0) { logger = emptyTxLogger; }
    return __awaiter(this, void 0, void 0, function () {
        var tag, resolvers, rejectors, receipt, transactionHash, confirmation, rejectAll, txParams, _a, _b, feeCurrency, gatewayFeeRecipient, gatewayFee, gasPrice, recievedTxHash, alreadyInformedResolversAboutConfirmation_1, informAboutConfirmation, nonce, newNonce, celoTx, e_1, signedTxn, sleepTimeInSecs, i, txReceipt, txStatus, error_2;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    tag = 'contract-utils@sendTransactionAsyncWithWeb3Signing';
                    resolvers = {};
                    rejectors = {};
                    receipt = new Promise(function (resolve, reject) {
                        resolvers.receipt = resolve;
                        rejectors.receipt = reject;
                    });
                    transactionHash = new Promise(function (resolve, reject) {
                        resolvers.transactionHash = resolve;
                        rejectors.transactionHash = reject;
                    });
                    confirmation = new Promise(function (resolve, reject) {
                        resolvers.confirmation = resolve;
                        rejectors.confirmation = reject;
                    });
                    rejectAll = function (error) {
                        lodash_1.values(rejectors).map(function (reject) {
                            // @ts-ignore
                            reject(error);
                        });
                    };
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 19, , 20]);
                    logger(Started);
                    txParams = {
                        from: account,
                        feeCurrency: feeCurrencyContract._address,
                        gasPrice: '0',
                    };
                    if (!(estimatedGas === undefined)) return [3 /*break*/, 3];
                    _b = (_a = Math).round;
                    return [4 /*yield*/, tx.estimateGas(txParams)];
                case 2:
                    estimatedGas = _b.apply(_a, [(_c.sent()) * gasInflateFactor]);
                    logger(EstimatedGas(estimatedGas));
                    _c.label = 3;
                case 3:
                    feeCurrency = feeCurrencyContract._address;
                    return [4 /*yield*/, web3.eth.getCoinbase()];
                case 4:
                    gatewayFeeRecipient = _c.sent();
                    gatewayFee = '0x' + defaultGatewayFee.toString(16);
                    logger_1.Logger.debug(tag, "Gateway fee is " + gatewayFee + " paid to " + gatewayFeeRecipient);
                    return [4 /*yield*/, getGasPrice(web3, feeCurrency)];
                case 5:
                    gasPrice = _c.sent();
                    if (!(feeCurrency === undefined)) return [3 /*break*/, 7];
                    return [4 /*yield*/, erc20_utils_1.getGoldTokenAddress(web3)];
                case 6:
                    feeCurrency = _c.sent();
                    _c.label = 7;
                case 7:
                    logger_1.Logger.debug(tag, "Fee currency: " + feeCurrency);
                    recievedTxHash = null;
                    alreadyInformedResolversAboutConfirmation_1 = false;
                    informAboutConfirmation = function () {
                        // Don't inform more than once.
                        if (alreadyInformedResolversAboutConfirmation_1) {
                            logger_1.Logger.debug(tag, "Already Informed Resolvers About Confirmation");
                            return;
                        }
                        alreadyInformedResolversAboutConfirmation_1 = true;
                        logger(Confirmed);
                        if (resolvers.confirmation) {
                            resolvers.confirmation(true);
                        }
                        else {
                            logger_1.Logger.debug(tag, 'resolver.confirmation is null');
                        }
                    };
                    return [4 /*yield*/, web3.eth.getTransactionCount(account, 'pending')];
                case 8:
                    nonce = _c.sent();
                    if (!currentNonce.has(account)) {
                        logger_1.Logger.debug(tag, "Initializing current nonce for " + account + " to " + nonce);
                        currentNonce.set(account, nonce);
                    }
                    else if (nonce <= currentNonce.get(account)) {
                        newNonce = currentNonce.get(account);
                        logger_1.Logger.debug('contract-utils@sendTransactionAsync', "nonce is " + nonce + " which is less than existing known nonce (" + currentNonce.get(account) + "), setting it to " + newNonce);
                        nonce = newNonce;
                    }
                    logger_1.Logger.debug(tag, "sendTransactionAsync@nonce is " + nonce);
                    logger_1.Logger.debug(tag, "sendTransactionAsync@sending from " + account);
                    celoTx = {
                        from: account,
                        nonce: nonce,
                        // @ts-ignore
                        feeCurrency: feeCurrency,
                        gas: estimatedGas,
                        // Hack to prevent web3 from adding the suggested gold gas price, allowing geth to add
                        // the suggested price in the selected feeCurrency.
                        gasPrice: gasPrice,
                        gatewayFeeRecipient: gatewayFeeRecipient,
                        gatewayFee: gatewayFee,
                    };
                    // Increment and store nonce for the next call to sendTransaction.
                    currentNonce.set(account, nonce + 1);
                    _c.label = 9;
                case 9:
                    _c.trys.push([9, 11, , 13]);
                    return [4 /*yield*/, tx.send(celoTx)];
                case 10:
                    _c.sent();
                    return [3 /*break*/, 13];
                case 11:
                    e_1 = _c.sent();
                    logger_1.Logger.debug(tag, "Ignoring error with message: " + e_1.message);
                    // Ideally, I want to only ignore error whose messsage contains
                    // "Failed to subscribe to new newBlockHeaders" but seems like another wrapped
                    // error (listed below) gets thrown and there is no way to catch that.
                    // "Failed to subscribe to new newBlockHeaders" is thrown when the wallet kit is connected
                    // to a remote node via https.
                    // { [Error: [object Object]]
                    //     line: 352771,
                    //     column: 24,
                    //     sourceURL: 'http://localhost:8081/index.delta?platform=android&dev=true&minify=false' }
                    //     contract-utils@sendTransactionAsync: error: { [Error: Failed to subscribe to new newBlockHeaders to confi
                    //     rm the transaction receipts.
                    //     {
                    //       "line": 352771,
                    //       "column": 24,
                    //       "sourceURL": "http://localhost:8081/index.delta?platform=android&dev=true&minify=false"
                    //     }]
                    //       line: 157373,
                    //       column: 24,
                    //       sourceURL: 'http://localhost:8081/index.delta?platform=android&dev=true&minify=false' }
                    if (e_1.message.indexOf('Failed to subscribe to new newBlockHeaders') >= 0) {
                        // Ignore this error
                        logger_1.Logger.warn(tag, "Expected error ignored: " + JSON.stringify(e_1));
                    }
                    else {
                        logger_1.Logger.debug(tag, "Unexpected error ignored: " + e_1.message);
                    }
                    return [4 /*yield*/, web3.eth.signTransaction(celoTx)];
                case 12:
                    signedTxn = _c.sent();
                    recievedTxHash = web3.utils.sha3(signedTxn.raw);
                    logger_1.Logger.info(tag, "Locally calculated recievedTxHash is " + recievedTxHash);
                    logger(TransactionHashReceived(recievedTxHash));
                    if (resolvers.transactionHash) {
                        resolvers.transactionHash(recievedTxHash);
                    }
                    return [3 /*break*/, 13];
                case 13:
                    sleepTimeInSecs = 1;
                    i = 0;
                    _c.label = 14;
                case 14:
                    if (!(i < 10)) return [3 /*break*/, 18];
                    return [4 /*yield*/, sleep_promise_1.default(sleepTimeInSecs * 1000)
                        // Exponential backoff
                    ];
                case 15:
                    _c.sent();
                    // Exponential backoff
                    sleepTimeInSecs *= 2;
                    if (recievedTxHash === null) {
                        return [3 /*break*/, 17];
                    }
                    return [4 /*yield*/, web3.eth.getTransactionReceipt(recievedTxHash)];
                case 16:
                    txReceipt = _c.sent();
                    if (txReceipt === null) {
                        return [3 /*break*/, 17];
                    }
                    txStatus = txReceipt.status;
                    logger_1.Logger.info(tag, "Transaction status of hash " + recievedTxHash + ": " + txStatus);
                    if (txStatus === true) {
                        informAboutConfirmation();
                        return [3 /*break*/, 18];
                    }
                    _c.label = 17;
                case 17:
                    i++;
                    return [3 /*break*/, 14];
                case 18: return [3 /*break*/, 20];
                case 19:
                    error_2 = _c.sent();
                    logger_1.Logger.warn(tag, "Transaction failed with error \"" + (error_2.name + ' ' + error_2.message) + "\"");
                    logger(Exception(error_2));
                    rejectAll(error_2);
                    return [3 /*break*/, 20];
                case 20: return [2 /*return*/, {
                        receipt: receipt,
                        transactionHash: transactionHash,
                        confirmation: confirmation,
                    }];
            }
        });
    });
}
exports.sendTransactionAsyncWithWeb3Signing = sendTransactionAsyncWithWeb3Signing;
function getContracts(web3) {
    return __awaiter(this, void 0, void 0, function () {
        var contractListToExport, returnObj;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    contractListToExport = [
                        'Attestations',
                        'LockedGold',
                        'Escrow',
                        'Exchange',
                        'GoldToken',
                        'Governance',
                        'Reserve',
                        'SortedOracles',
                        'StableToken',
                        'Validators',
                    ];
                    returnObj = {};
                    return [4 /*yield*/, Promise.all(Object.keys(ContractList)
                            .filter(function (name) { return contractListToExport.includes(name); })
                            .map(function (name) { return __awaiter(_this, void 0, void 0, function () {
                            var instance, contract;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        instance = ContractList[name];
                                        return [4 /*yield*/, instance(web3)];
                                    case 1:
                                        contract = _a.sent();
                                        returnObj[name] = __assign({ name: name }, contract);
                                        return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 1:
                    _a.sent();
                    return [2 /*return*/, returnObj];
            }
        });
    });
}
exports.getContracts = getContracts;
