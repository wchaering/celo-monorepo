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
                            "name": "membershipHistoryLength",
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
                            "name": "maxGroupSize",
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
                            "name": "validatorLockedGoldRequirements",
                            "outputs": [
                                {
                                    "name": "value",
                                    "type": "uint256"
                                },
                                {
                                    "name": "duration",
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
                            "name": "groupLockedGoldRequirements",
                            "outputs": [
                                {
                                    "name": "value",
                                    "type": "uint256"
                                },
                                {
                                    "name": "duration",
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
                            "anonymous": false,
                            "inputs": [
                                {
                                    "indexed": false,
                                    "name": "size",
                                    "type": "uint256"
                                }
                            ],
                            "name": "MaxGroupSizeSet",
                            "type": "event"
                        },
                        {
                            "anonymous": false,
                            "inputs": [
                                {
                                    "indexed": false,
                                    "name": "value",
                                    "type": "uint256"
                                }
                            ],
                            "name": "ValidatorEpochPaymentSet",
                            "type": "event"
                        },
                        {
                            "anonymous": false,
                            "inputs": [
                                {
                                    "indexed": false,
                                    "name": "exponent",
                                    "type": "uint256"
                                },
                                {
                                    "indexed": false,
                                    "name": "adjustmentSpeed",
                                    "type": "uint256"
                                }
                            ],
                            "name": "ValidatorScoreParametersSet",
                            "type": "event"
                        },
                        {
                            "anonymous": false,
                            "inputs": [
                                {
                                    "indexed": false,
                                    "name": "value",
                                    "type": "uint256"
                                },
                                {
                                    "indexed": false,
                                    "name": "duration",
                                    "type": "uint256"
                                }
                            ],
                            "name": "GroupLockedGoldRequirementsSet",
                            "type": "event"
                        },
                        {
                            "anonymous": false,
                            "inputs": [
                                {
                                    "indexed": false,
                                    "name": "value",
                                    "type": "uint256"
                                },
                                {
                                    "indexed": false,
                                    "name": "duration",
                                    "type": "uint256"
                                }
                            ],
                            "name": "ValidatorLockedGoldRequirementsSet",
                            "type": "event"
                        },
                        {
                            "anonymous": false,
                            "inputs": [
                                {
                                    "indexed": false,
                                    "name": "length",
                                    "type": "uint256"
                                }
                            ],
                            "name": "MembershipHistoryLengthSet",
                            "type": "event"
                        },
                        {
                            "anonymous": false,
                            "inputs": [
                                {
                                    "indexed": true,
                                    "name": "validator",
                                    "type": "address"
                                },
                                {
                                    "indexed": false,
                                    "name": "ecdsaPublicKey",
                                    "type": "bytes"
                                },
                                {
                                    "indexed": false,
                                    "name": "blsPublicKey",
                                    "type": "bytes"
                                }
                            ],
                            "name": "ValidatorRegistered",
                            "type": "event"
                        },
                        {
                            "anonymous": false,
                            "inputs": [
                                {
                                    "indexed": true,
                                    "name": "validator",
                                    "type": "address"
                                }
                            ],
                            "name": "ValidatorDeregistered",
                            "type": "event"
                        },
                        {
                            "anonymous": false,
                            "inputs": [
                                {
                                    "indexed": true,
                                    "name": "validator",
                                    "type": "address"
                                },
                                {
                                    "indexed": true,
                                    "name": "group",
                                    "type": "address"
                                }
                            ],
                            "name": "ValidatorAffiliated",
                            "type": "event"
                        },
                        {
                            "anonymous": false,
                            "inputs": [
                                {
                                    "indexed": true,
                                    "name": "validator",
                                    "type": "address"
                                },
                                {
                                    "indexed": true,
                                    "name": "group",
                                    "type": "address"
                                }
                            ],
                            "name": "ValidatorDeaffiliated",
                            "type": "event"
                        },
                        {
                            "anonymous": false,
                            "inputs": [
                                {
                                    "indexed": true,
                                    "name": "validator",
                                    "type": "address"
                                },
                                {
                                    "indexed": false,
                                    "name": "ecdsaPublicKey",
                                    "type": "bytes"
                                }
                            ],
                            "name": "ValidatorEcdsaPublicKeyUpdated",
                            "type": "event"
                        },
                        {
                            "anonymous": false,
                            "inputs": [
                                {
                                    "indexed": true,
                                    "name": "validator",
                                    "type": "address"
                                },
                                {
                                    "indexed": false,
                                    "name": "blsPublicKey",
                                    "type": "bytes"
                                }
                            ],
                            "name": "ValidatorBlsPublicKeyUpdated",
                            "type": "event"
                        },
                        {
                            "anonymous": false,
                            "inputs": [
                                {
                                    "indexed": true,
                                    "name": "group",
                                    "type": "address"
                                },
                                {
                                    "indexed": false,
                                    "name": "commission",
                                    "type": "uint256"
                                }
                            ],
                            "name": "ValidatorGroupRegistered",
                            "type": "event"
                        },
                        {
                            "anonymous": false,
                            "inputs": [
                                {
                                    "indexed": true,
                                    "name": "group",
                                    "type": "address"
                                }
                            ],
                            "name": "ValidatorGroupDeregistered",
                            "type": "event"
                        },
                        {
                            "anonymous": false,
                            "inputs": [
                                {
                                    "indexed": true,
                                    "name": "group",
                                    "type": "address"
                                },
                                {
                                    "indexed": true,
                                    "name": "validator",
                                    "type": "address"
                                }
                            ],
                            "name": "ValidatorGroupMemberAdded",
                            "type": "event"
                        },
                        {
                            "anonymous": false,
                            "inputs": [
                                {
                                    "indexed": true,
                                    "name": "group",
                                    "type": "address"
                                },
                                {
                                    "indexed": true,
                                    "name": "validator",
                                    "type": "address"
                                }
                            ],
                            "name": "ValidatorGroupMemberRemoved",
                            "type": "event"
                        },
                        {
                            "anonymous": false,
                            "inputs": [
                                {
                                    "indexed": true,
                                    "name": "group",
                                    "type": "address"
                                },
                                {
                                    "indexed": true,
                                    "name": "validator",
                                    "type": "address"
                                }
                            ],
                            "name": "ValidatorGroupMemberReordered",
                            "type": "event"
                        },
                        {
                            "anonymous": false,
                            "inputs": [
                                {
                                    "indexed": true,
                                    "name": "group",
                                    "type": "address"
                                },
                                {
                                    "indexed": false,
                                    "name": "commission",
                                    "type": "uint256"
                                }
                            ],
                            "name": "ValidatorGroupCommissionUpdated",
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
                                    "name": "groupRequirementValue",
                                    "type": "uint256"
                                },
                                {
                                    "name": "groupRequirementDuration",
                                    "type": "uint256"
                                },
                                {
                                    "name": "validatorRequirementValue",
                                    "type": "uint256"
                                },
                                {
                                    "name": "validatorRequirementDuration",
                                    "type": "uint256"
                                },
                                {
                                    "name": "validatorScoreExponent",
                                    "type": "uint256"
                                },
                                {
                                    "name": "validatorScoreAdjustmentSpeed",
                                    "type": "uint256"
                                },
                                {
                                    "name": "_membershipHistoryLength",
                                    "type": "uint256"
                                },
                                {
                                    "name": "_maxGroupSize",
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
                                    "name": "size",
                                    "type": "uint256"
                                }
                            ],
                            "name": "setMaxGroupSize",
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
                                    "name": "length",
                                    "type": "uint256"
                                }
                            ],
                            "name": "setMembershipHistoryLength",
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
                                    "name": "exponent",
                                    "type": "uint256"
                                },
                                {
                                    "name": "adjustmentSpeed",
                                    "type": "uint256"
                                }
                            ],
                            "name": "setValidatorScoreParameters",
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
                            "name": "getMaxGroupSize",
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
                                    "name": "value",
                                    "type": "uint256"
                                },
                                {
                                    "name": "duration",
                                    "type": "uint256"
                                }
                            ],
                            "name": "setGroupLockedGoldRequirements",
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
                                    "name": "value",
                                    "type": "uint256"
                                },
                                {
                                    "name": "duration",
                                    "type": "uint256"
                                }
                            ],
                            "name": "setValidatorLockedGoldRequirements",
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
                                    "name": "ecdsaPublicKey",
                                    "type": "bytes"
                                },
                                {
                                    "name": "blsPublicKey",
                                    "type": "bytes"
                                },
                                {
                                    "name": "blsPop",
                                    "type": "bytes"
                                }
                            ],
                            "name": "registerValidator",
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
                            "name": "getValidatorScoreParameters",
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
                            "constant": true,
                            "inputs": [
                                {
                                    "name": "account",
                                    "type": "address"
                                }
                            ],
                            "name": "getMembershipHistory",
                            "outputs": [
                                {
                                    "name": "",
                                    "type": "uint256[]"
                                },
                                {
                                    "name": "",
                                    "type": "address[]"
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
                                    "name": "signer",
                                    "type": "address"
                                },
                                {
                                    "name": "uptime",
                                    "type": "uint256"
                                }
                            ],
                            "name": "updateValidatorScoreFromSigner",
                            "outputs": [],
                            "payable": false,
                            "stateMutability": "nonpayable",
                            "type": "function"
                        },
                        {
                            "constant": false,
                            "inputs": [
                                {
                                    "name": "signer",
                                    "type": "address"
                                },
                                {
                                    "name": "maxPayment",
                                    "type": "uint256"
                                }
                            ],
                            "name": "distributeEpochPaymentsFromSigner",
                            "outputs": [
                                {
                                    "name": "",
                                    "type": "uint256"
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
                                    "name": "index",
                                    "type": "uint256"
                                }
                            ],
                            "name": "deregisterValidator",
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
                            "name": "affiliate",
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
                            "inputs": [],
                            "name": "deaffiliate",
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
                                    "name": "blsPublicKey",
                                    "type": "bytes"
                                },
                                {
                                    "name": "blsPop",
                                    "type": "bytes"
                                }
                            ],
                            "name": "updateBlsPublicKey",
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
                                    "name": "account",
                                    "type": "address"
                                },
                                {
                                    "name": "signer",
                                    "type": "address"
                                },
                                {
                                    "name": "ecdsaPublicKey",
                                    "type": "bytes"
                                }
                            ],
                            "name": "updateEcdsaPublicKey",
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
                                    "name": "commission",
                                    "type": "uint256"
                                }
                            ],
                            "name": "registerValidatorGroup",
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
                                    "name": "index",
                                    "type": "uint256"
                                }
                            ],
                            "name": "deregisterValidatorGroup",
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
                                    "name": "validator",
                                    "type": "address"
                                }
                            ],
                            "name": "addMember",
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
                                    "name": "validator",
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
                            "name": "addFirstMember",
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
                                    "name": "validator",
                                    "type": "address"
                                }
                            ],
                            "name": "removeMember",
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
                                    "name": "validator",
                                    "type": "address"
                                },
                                {
                                    "name": "lesserMember",
                                    "type": "address"
                                },
                                {
                                    "name": "greaterMember",
                                    "type": "address"
                                }
                            ],
                            "name": "reorderMember",
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
                                    "name": "commission",
                                    "type": "uint256"
                                }
                            ],
                            "name": "updateCommission",
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
                            "name": "getAccountLockedGoldRequirement",
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
                                    "name": "account",
                                    "type": "address"
                                }
                            ],
                            "name": "meetsAccountLockedGoldRequirements",
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
                                    "name": "signer",
                                    "type": "address"
                                }
                            ],
                            "name": "getValidatorBlsPublicKeyFromSigner",
                            "outputs": [
                                {
                                    "name": "blsPublicKey",
                                    "type": "bytes"
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
                                    "name": "account",
                                    "type": "address"
                                }
                            ],
                            "name": "getValidator",
                            "outputs": [
                                {
                                    "name": "ecdsaPublicKey",
                                    "type": "bytes"
                                },
                                {
                                    "name": "blsPublicKey",
                                    "type": "bytes"
                                },
                                {
                                    "name": "affiliation",
                                    "type": "address"
                                },
                                {
                                    "name": "score",
                                    "type": "uint256"
                                },
                                {
                                    "name": "signer",
                                    "type": "address"
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
                                    "name": "account",
                                    "type": "address"
                                }
                            ],
                            "name": "getValidatorGroup",
                            "outputs": [
                                {
                                    "name": "",
                                    "type": "address[]"
                                },
                                {
                                    "name": "",
                                    "type": "uint256"
                                },
                                {
                                    "name": "",
                                    "type": "uint256[]"
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
                                    "name": "account",
                                    "type": "address"
                                }
                            ],
                            "name": "getGroupNumMembers",
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
                                    "name": "account",
                                    "type": "address"
                                },
                                {
                                    "name": "n",
                                    "type": "uint256"
                                }
                            ],
                            "name": "getTopGroupValidators",
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
                                    "name": "accounts",
                                    "type": "address[]"
                                }
                            ],
                            "name": "getGroupsNumMembers",
                            "outputs": [
                                {
                                    "name": "",
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
                            "name": "getNumRegisteredValidators",
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
                            "name": "getValidatorLockedGoldRequirements",
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
                            "constant": true,
                            "inputs": [],
                            "name": "getGroupLockedGoldRequirements",
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
                            "constant": true,
                            "inputs": [],
                            "name": "getRegisteredValidators",
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
                            "name": "getRegisteredValidatorSigners",
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
                            "name": "getRegisteredValidatorGroups",
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
                                    "name": "account",
                                    "type": "address"
                                }
                            ],
                            "name": "isValidatorGroup",
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
                                    "name": "account",
                                    "type": "address"
                                }
                            ],
                            "name": "isValidator",
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
                                    "name": "signer",
                                    "type": "address"
                                }
                            ],
                            "name": "getMembershipInLastEpochFromSigner",
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
                            "inputs": [
                                {
                                    "name": "account",
                                    "type": "address"
                                }
                            ],
                            "name": "getMembershipInLastEpoch",
                            "outputs": [
                                {
                                    "name": "",
                                    "type": "address"
                                }
                            ],
                            "payable": false,
                            "stateMutability": "view",
                            "type": "function"
                        }
                    ], "0xF4c234e4d3eF330774Ba97315eEDF3B6Cc23E085");
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
