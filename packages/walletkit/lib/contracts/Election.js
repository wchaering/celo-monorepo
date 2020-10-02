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
function getInstance(web3, account) {
    if (account === void 0) { account = null; }
    return __awaiter(this, void 0, void 0, function () {
        var contract, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    contract = new web3.eth.Contract([
                        {
                            "constant": true,
                            "inputs": [
                                {
                                    "name": "index",
                                    "type": "uint256"
                                }
                            ],
                            "name": "validatorAddressFromCurrentSet",
                            "outputs": [
                                {
                                    "name": "",
                                    "type": "address"
                                }
                            ],
                            "payable": false,
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "constant": true,
                            "inputs": [],
                            "name": "initialized",
                            "outputs": [
                                {
                                    "name": "",
                                    "type": "bool"
                                }
                            ],
                            "payable": false,
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "constant": false,
                            "inputs": [
                                {
                                    "name": "sender",
                                    "type": "address"
                                },
                                {
                                    "name": "blsKey",
                                    "type": "bytes"
                                },
                                {
                                    "name": "blsPop",
                                    "type": "bytes"
                                }
                            ],
                            "name": "checkProofOfPossession",
                            "outputs": [
                                {
                                    "name": "",
                                    "type": "bool"
                                }
                            ],
                            "payable": false,
                            "stateMutability": "nonpayable",
                            "type": "function"
                        },
                        {
                            "constant": true,
                            "inputs": [],
                            "name": "electabilityThreshold",
                            "outputs": [
                                {
                                    "name": "value",
                                    "type": "uint256"
                                }
                            ],
                            "payable": false,
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "constant": false,
                            "inputs": [],
                            "name": "renounceOwnership",
                            "outputs": [],
                            "payable": false,
                            "stateMutability": "nonpayable",
                            "type": "function"
                        },
                        {
                            "constant": true,
                            "inputs": [],
                            "name": "registry",
                            "outputs": [
                                {
                                    "name": "",
                                    "type": "address"
                                }
                            ],
                            "payable": false,
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "constant": true,
                            "inputs": [],
                            "name": "numberValidatorsInCurrentSet",
                            "outputs": [
                                {
                                    "name": "",
                                    "type": "uint256"
                                }
                            ],
                            "payable": false,
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "constant": true,
                            "inputs": [],
                            "name": "owner",
                            "outputs": [
                                {
                                    "name": "",
                                    "type": "address"
                                }
                            ],
                            "payable": false,
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "constant": true,
                            "inputs": [],
                            "name": "isOwner",
                            "outputs": [
                                {
                                    "name": "",
                                    "type": "bool"
                                }
                            ],
                            "payable": false,
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "constant": true,
                            "inputs": [],
                            "name": "getEpochNumber",
                            "outputs": [
                                {
                                    "name": "",
                                    "type": "uint256"
                                }
                            ],
                            "payable": false,
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "constant": false,
                            "inputs": [
                                {
                                    "name": "registryAddress",
                                    "type": "address"
                                }
                            ],
                            "name": "setRegistry",
                            "outputs": [],
                            "payable": false,
                            "stateMutability": "nonpayable",
                            "type": "function"
                        },
                        {
                            "constant": true,
                            "inputs": [],
                            "name": "maxNumGroupsVotedFor",
                            "outputs": [
                                {
                                    "name": "",
                                    "type": "uint256"
                                }
                            ],
                            "payable": false,
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "constant": true,
                            "inputs": [],
                            "name": "getEpochSize",
                            "outputs": [
                                {
                                    "name": "",
                                    "type": "uint256"
                                }
                            ],
                            "payable": false,
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "constant": true,
                            "inputs": [
                                {
                                    "name": "aNumerator",
                                    "type": "uint256"
                                },
                                {
                                    "name": "aDenominator",
                                    "type": "uint256"
                                },
                                {
                                    "name": "bNumerator",
                                    "type": "uint256"
                                },
                                {
                                    "name": "bDenominator",
                                    "type": "uint256"
                                },
                                {
                                    "name": "exponent",
                                    "type": "uint256"
                                },
                                {
                                    "name": "_decimals",
                                    "type": "uint256"
                                }
                            ],
                            "name": "fractionMulExp",
                            "outputs": [
                                {
                                    "name": "",
                                    "type": "uint256"
                                },
                                {
                                    "name": "",
                                    "type": "uint256"
                                }
                            ],
                            "payable": false,
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "constant": false,
                            "inputs": [
                                {
                                    "name": "newOwner",
                                    "type": "address"
                                }
                            ],
                            "name": "transferOwnership",
                            "outputs": [],
                            "payable": false,
                            "stateMutability": "nonpayable",
                            "type": "function"
                        },
                        {
                            "constant": true,
                            "inputs": [],
                            "name": "electableValidators",
                            "outputs": [
                                {
                                    "name": "min",
                                    "type": "uint256"
                                },
                                {
                                    "name": "max",
                                    "type": "uint256"
                                }
                            ],
                            "payable": false,
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "anonymous": false,
                            "inputs": [
                                {
                                    "indexed": false,
                                    "name": "min",
                                    "type": "uint256"
                                },
                                {
                                    "indexed": false,
                                    "name": "max",
                                    "type": "uint256"
                                }
                            ],
                            "name": "ElectableValidatorsSet",
                            "type": "event"
                        },
                        {
                            "anonymous": false,
                            "inputs": [
                                {
                                    "indexed": false,
                                    "name": "maxNumGroupsVotedFor",
                                    "type": "uint256"
                                }
                            ],
                            "name": "MaxNumGroupsVotedForSet",
                            "type": "event"
                        },
                        {
                            "anonymous": false,
                            "inputs": [
                                {
                                    "indexed": false,
                                    "name": "electabilityThreshold",
                                    "type": "uint256"
                                }
                            ],
                            "name": "ElectabilityThresholdSet",
                            "type": "event"
                        },
                        {
                            "anonymous": false,
                            "inputs": [
                                {
                                    "indexed": false,
                                    "name": "group",
                                    "type": "address"
                                }
                            ],
                            "name": "ValidatorGroupMarkedEligible",
                            "type": "event"
                        },
                        {
                            "anonymous": false,
                            "inputs": [
                                {
                                    "indexed": false,
                                    "name": "group",
                                    "type": "address"
                                }
                            ],
                            "name": "ValidatorGroupMarkedIneligible",
                            "type": "event"
                        },
                        {
                            "anonymous": false,
                            "inputs": [
                                {
                                    "indexed": true,
                                    "name": "account",
                                    "type": "address"
                                },
                                {
                                    "indexed": true,
                                    "name": "group",
                                    "type": "address"
                                },
                                {
                                    "indexed": false,
                                    "name": "value",
                                    "type": "uint256"
                                }
                            ],
                            "name": "ValidatorGroupVoteCast",
                            "type": "event"
                        },
                        {
                            "anonymous": false,
                            "inputs": [
                                {
                                    "indexed": true,
                                    "name": "account",
                                    "type": "address"
                                },
                                {
                                    "indexed": true,
                                    "name": "group",
                                    "type": "address"
                                },
                                {
                                    "indexed": false,
                                    "name": "value",
                                    "type": "uint256"
                                }
                            ],
                            "name": "ValidatorGroupVoteActivated",
                            "type": "event"
                        },
                        {
                            "anonymous": false,
                            "inputs": [
                                {
                                    "indexed": true,
                                    "name": "account",
                                    "type": "address"
                                },
                                {
                                    "indexed": true,
                                    "name": "group",
                                    "type": "address"
                                },
                                {
                                    "indexed": false,
                                    "name": "value",
                                    "type": "uint256"
                                }
                            ],
                            "name": "ValidatorGroupVoteRevoked",
                            "type": "event"
                        },
                        {
                            "anonymous": false,
                            "inputs": [
                                {
                                    "indexed": true,
                                    "name": "registryAddress",
                                    "type": "address"
                                }
                            ],
                            "name": "RegistrySet",
                            "type": "event"
                        },
                        {
                            "anonymous": false,
                            "inputs": [
                                {
                                    "indexed": true,
                                    "name": "previousOwner",
                                    "type": "address"
                                },
                                {
                                    "indexed": true,
                                    "name": "newOwner",
                                    "type": "address"
                                }
                            ],
                            "name": "OwnershipTransferred",
                            "type": "event"
                        },
                        {
                            "constant": false,
                            "inputs": [
                                {
                                    "name": "registryAddress",
                                    "type": "address"
                                },
                                {
                                    "name": "minElectableValidators",
                                    "type": "uint256"
                                },
                                {
                                    "name": "maxElectableValidators",
                                    "type": "uint256"
                                },
                                {
                                    "name": "_maxNumGroupsVotedFor",
                                    "type": "uint256"
                                },
                                {
                                    "name": "_electabilityThreshold",
                                    "type": "uint256"
                                }
                            ],
                            "name": "initialize",
                            "outputs": [],
                            "payable": false,
                            "stateMutability": "nonpayable",
                            "type": "function"
                        },
                        {
                            "constant": false,
                            "inputs": [
                                {
                                    "name": "min",
                                    "type": "uint256"
                                },
                                {
                                    "name": "max",
                                    "type": "uint256"
                                }
                            ],
                            "name": "setElectableValidators",
                            "outputs": [
                                {
                                    "name": "",
                                    "type": "bool"
                                }
                            ],
                            "payable": false,
                            "stateMutability": "nonpayable",
                            "type": "function"
                        },
                        {
                            "constant": true,
                            "inputs": [],
                            "name": "getElectableValidators",
                            "outputs": [
                                {
                                    "name": "",
                                    "type": "uint256"
                                },
                                {
                                    "name": "",
                                    "type": "uint256"
                                }
                            ],
                            "payable": false,
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "constant": false,
                            "inputs": [
                                {
                                    "name": "_maxNumGroupsVotedFor",
                                    "type": "uint256"
                                }
                            ],
                            "name": "setMaxNumGroupsVotedFor",
                            "outputs": [
                                {
                                    "name": "",
                                    "type": "bool"
                                }
                            ],
                            "payable": false,
                            "stateMutability": "nonpayable",
                            "type": "function"
                        },
                        {
                            "constant": false,
                            "inputs": [
                                {
                                    "name": "threshold",
                                    "type": "uint256"
                                }
                            ],
                            "name": "setElectabilityThreshold",
                            "outputs": [
                                {
                                    "name": "",
                                    "type": "bool"
                                }
                            ],
                            "payable": false,
                            "stateMutability": "nonpayable",
                            "type": "function"
                        },
                        {
                            "constant": true,
                            "inputs": [],
                            "name": "getElectabilityThreshold",
                            "outputs": [
                                {
                                    "name": "",
                                    "type": "uint256"
                                }
                            ],
                            "payable": false,
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "constant": false,
                            "inputs": [
                                {
                                    "name": "group",
                                    "type": "address"
                                },
                                {
                                    "name": "value",
                                    "type": "uint256"
                                },
                                {
                                    "name": "lesser",
                                    "type": "address"
                                },
                                {
                                    "name": "greater",
                                    "type": "address"
                                }
                            ],
                            "name": "vote",
                            "outputs": [
                                {
                                    "name": "",
                                    "type": "bool"
                                }
                            ],
                            "payable": false,
                            "stateMutability": "nonpayable",
                            "type": "function"
                        },
                        {
                            "constant": false,
                            "inputs": [
                                {
                                    "name": "group",
                                    "type": "address"
                                }
                            ],
                            "name": "activate",
                            "outputs": [
                                {
                                    "name": "",
                                    "type": "bool"
                                }
                            ],
                            "payable": false,
                            "stateMutability": "nonpayable",
                            "type": "function"
                        },
                        {
                            "constant": true,
                            "inputs": [
                                {
                                    "name": "account",
                                    "type": "address"
                                },
                                {
                                    "name": "group",
                                    "type": "address"
                                }
                            ],
                            "name": "hasActivatablePendingVotes",
                            "outputs": [
                                {
                                    "name": "",
                                    "type": "bool"
                                }
                            ],
                            "payable": false,
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "constant": false,
                            "inputs": [
                                {
                                    "name": "group",
                                    "type": "address"
                                },
                                {
                                    "name": "value",
                                    "type": "uint256"
                                },
                                {
                                    "name": "lesser",
                                    "type": "address"
                                },
                                {
                                    "name": "greater",
                                    "type": "address"
                                },
                                {
                                    "name": "index",
                                    "type": "uint256"
                                }
                            ],
                            "name": "revokePending",
                            "outputs": [
                                {
                                    "name": "",
                                    "type": "bool"
                                }
                            ],
                            "payable": false,
                            "stateMutability": "nonpayable",
                            "type": "function"
                        },
                        {
                            "constant": false,
                            "inputs": [
                                {
                                    "name": "group",
                                    "type": "address"
                                },
                                {
                                    "name": "value",
                                    "type": "uint256"
                                },
                                {
                                    "name": "lesser",
                                    "type": "address"
                                },
                                {
                                    "name": "greater",
                                    "type": "address"
                                },
                                {
                                    "name": "index",
                                    "type": "uint256"
                                }
                            ],
                            "name": "revokeActive",
                            "outputs": [
                                {
                                    "name": "",
                                    "type": "bool"
                                }
                            ],
                            "payable": false,
                            "stateMutability": "nonpayable",
                            "type": "function"
                        },
                        {
                            "constant": true,
                            "inputs": [
                                {
                                    "name": "account",
                                    "type": "address"
                                }
                            ],
                            "name": "getTotalVotesByAccount",
                            "outputs": [
                                {
                                    "name": "",
                                    "type": "uint256"
                                }
                            ],
                            "payable": false,
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "constant": true,
                            "inputs": [
                                {
                                    "name": "group",
                                    "type": "address"
                                },
                                {
                                    "name": "account",
                                    "type": "address"
                                }
                            ],
                            "name": "getPendingVotesForGroupByAccount",
                            "outputs": [
                                {
                                    "name": "",
                                    "type": "uint256"
                                }
                            ],
                            "payable": false,
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "constant": true,
                            "inputs": [
                                {
                                    "name": "group",
                                    "type": "address"
                                },
                                {
                                    "name": "account",
                                    "type": "address"
                                }
                            ],
                            "name": "getActiveVotesForGroupByAccount",
                            "outputs": [
                                {
                                    "name": "",
                                    "type": "uint256"
                                }
                            ],
                            "payable": false,
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "constant": true,
                            "inputs": [
                                {
                                    "name": "group",
                                    "type": "address"
                                },
                                {
                                    "name": "account",
                                    "type": "address"
                                }
                            ],
                            "name": "getTotalVotesForGroupByAccount",
                            "outputs": [
                                {
                                    "name": "",
                                    "type": "uint256"
                                }
                            ],
                            "payable": false,
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "constant": true,
                            "inputs": [
                                {
                                    "name": "group",
                                    "type": "address"
                                }
                            ],
                            "name": "getTotalVotesForGroup",
                            "outputs": [
                                {
                                    "name": "",
                                    "type": "uint256"
                                }
                            ],
                            "payable": false,
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "constant": true,
                            "inputs": [
                                {
                                    "name": "group",
                                    "type": "address"
                                }
                            ],
                            "name": "getGroupEligibility",
                            "outputs": [
                                {
                                    "name": "",
                                    "type": "bool"
                                }
                            ],
                            "payable": false,
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "constant": true,
                            "inputs": [
                                {
                                    "name": "group",
                                    "type": "address"
                                },
                                {
                                    "name": "totalEpochRewards",
                                    "type": "uint256"
                                }
                            ],
                            "name": "getGroupEpochRewards",
                            "outputs": [
                                {
                                    "name": "",
                                    "type": "uint256"
                                }
                            ],
                            "payable": false,
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "constant": false,
                            "inputs": [
                                {
                                    "name": "group",
                                    "type": "address"
                                },
                                {
                                    "name": "value",
                                    "type": "uint256"
                                },
                                {
                                    "name": "lesser",
                                    "type": "address"
                                },
                                {
                                    "name": "greater",
                                    "type": "address"
                                }
                            ],
                            "name": "distributeEpochRewards",
                            "outputs": [],
                            "payable": false,
                            "stateMutability": "nonpayable",
                            "type": "function"
                        },
                        {
                            "constant": false,
                            "inputs": [
                                {
                                    "name": "group",
                                    "type": "address"
                                }
                            ],
                            "name": "markGroupIneligible",
                            "outputs": [],
                            "payable": false,
                            "stateMutability": "nonpayable",
                            "type": "function"
                        },
                        {
                            "constant": false,
                            "inputs": [
                                {
                                    "name": "group",
                                    "type": "address"
                                },
                                {
                                    "name": "lesser",
                                    "type": "address"
                                },
                                {
                                    "name": "greater",
                                    "type": "address"
                                }
                            ],
                            "name": "markGroupEligible",
                            "outputs": [],
                            "payable": false,
                            "stateMutability": "nonpayable",
                            "type": "function"
                        },
                        {
                            "constant": true,
                            "inputs": [
                                {
                                    "name": "account",
                                    "type": "address"
                                }
                            ],
                            "name": "getGroupsVotedForByAccount",
                            "outputs": [
                                {
                                    "name": "",
                                    "type": "address[]"
                                }
                            ],
                            "payable": false,
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "constant": true,
                            "inputs": [
                                {
                                    "name": "group",
                                    "type": "address"
                                },
                                {
                                    "name": "value",
                                    "type": "uint256"
                                }
                            ],
                            "name": "canReceiveVotes",
                            "outputs": [
                                {
                                    "name": "",
                                    "type": "bool"
                                }
                            ],
                            "payable": false,
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "constant": true,
                            "inputs": [
                                {
                                    "name": "group",
                                    "type": "address"
                                }
                            ],
                            "name": "getNumVotesReceivable",
                            "outputs": [
                                {
                                    "name": "",
                                    "type": "uint256"
                                }
                            ],
                            "payable": false,
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "constant": true,
                            "inputs": [],
                            "name": "getTotalVotes",
                            "outputs": [
                                {
                                    "name": "",
                                    "type": "uint256"
                                }
                            ],
                            "payable": false,
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "constant": true,
                            "inputs": [],
                            "name": "getActiveVotes",
                            "outputs": [
                                {
                                    "name": "",
                                    "type": "uint256"
                                }
                            ],
                            "payable": false,
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "constant": true,
                            "inputs": [],
                            "name": "getEligibleValidatorGroups",
                            "outputs": [
                                {
                                    "name": "",
                                    "type": "address[]"
                                }
                            ],
                            "payable": false,
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "constant": true,
                            "inputs": [],
                            "name": "getTotalVotesForEligibleValidatorGroups",
                            "outputs": [
                                {
                                    "name": "groups",
                                    "type": "address[]"
                                },
                                {
                                    "name": "values",
                                    "type": "uint256[]"
                                }
                            ],
                            "payable": false,
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "constant": true,
                            "inputs": [],
                            "name": "electValidatorSigners",
                            "outputs": [
                                {
                                    "name": "",
                                    "type": "address[]"
                                }
                            ],
                            "payable": false,
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "constant": true,
                            "inputs": [],
                            "name": "getCurrentValidatorSigners",
                            "outputs": [
                                {
                                    "name": "",
                                    "type": "address[]"
                                }
                            ],
                            "payable": false,
                            "stateMutability": "view",
                            "type": "function"
                        }
                    ], "0x6c2A45118Bb9210cDAA9eaD55768644D2b298DF1");
                    _a = contract.options;
                    _b = account;
                    if (_b) return [3 /*break*/, 2];
                    return [4 /*yield*/, web3.eth.getAccounts()];
                case 1:
                    _b = (_c.sent())[0];
                    _c.label = 2;
                case 2:
                    _a.from = _b;
                    return [2 /*return*/, contract];
            }
        });
    });
}
exports.default = getInstance;
