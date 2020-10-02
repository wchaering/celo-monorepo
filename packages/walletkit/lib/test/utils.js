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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bip32 = require("bip32");
var bip39 = require("bip39");
var fs = __importStar(require("fs"));
var web3_1 = __importDefault(require("web3"));
var network_name_1 = require("../contracts/network-name");
var logger_1 = require("../src/logger");
var static_node_utils_1 = __importDefault(require("../src/static-node-utils"));
var web3_utils_1 = require("../src/web3-utils");
// Set this to true if you have a local node running on 127.0.0.1 and you want to test against that
var runAgainstLocalNode = false;
var cachedIpAddress = runAgainstLocalNode ? '127.0.0.1' : null;
var HTTP_PROVIDER_PORT = 8545;
function generatePrivateKey(mnemonic, accountType, index) {
    var seed = bip39.mnemonicToSeed(mnemonic);
    var node = bip32.fromSeed(seed);
    var newNode = node.derive(accountType).derive(index);
    return newNode.privateKey.toString('hex');
}
function generateAccountAddressFromPrivateKey(privateKey) {
    if (!privateKey.toLowerCase().startsWith('0x')) {
        privateKey = '0x' + privateKey;
    }
    // @ts-ignore-next-line
    return new web3_1.default.modules.Eth().accounts.privateKeyToAccount(privateKey).address;
}
exports.generateAccountAddressFromPrivateKey = generateAccountAddressFromPrivateKey;
// Mnemonic taken from .env.mnemonic.<NETWORK_NAME> file in celo-monorepo
function getMnemonic(networkName) {
    var mnemonicFile = __dirname + "/../../../.env.mnemonic." + networkName;
    logger_1.Logger.debug('getMnemonic', "Reading mnemonic from " + mnemonicFile);
    var mnemonicFileContent = fs.readFileSync(mnemonicFile).toString();
    var lines = mnemonicFileContent.split('\n');
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var line = lines_1[_i];
        if (line.startsWith('MNEMONIC')) {
            // TODO(ashishb): This is hacky, we should eventually move to `properties-reader` or a similar package.
            var mnemonic = line
                .split('=')[1]
                .replace('"', '')
                .replace('"', '')
                .trim();
            return mnemonic;
        }
    }
    throw new Error("Mnemonic not found in " + mnemonicFile);
}
// Alternative way to generate this:
// celotooljs generate bip32 --accountType validator --index 0 --mnemonic "${MNEMONIC}"
function getMiner0PrivateKey(networkName) {
    return generatePrivateKey(getMnemonic(networkName), 0, 0);
}
exports.getMiner0PrivateKey = getMiner0PrivateKey;
// Alternative way to generate this:
// celotooljs generate bip32 --accountType validator --index 1 --mnemonic "${MNEMONIC}"
function getMiner1PrivateKey(networkName) {
    return generatePrivateKey(getMnemonic(networkName), 0, 1);
}
exports.getMiner1PrivateKey = getMiner1PrivateKey;
// Miner's account which is expected to contain a non-zero balance.
// Alternative way to generate this:
// celotooljs generate account-address --private-key ${MINER0_PRIVATE_KEY}
function getMiner0AccountAddress(networkName) {
    return generateAccountAddressFromPrivateKey(getMiner0PrivateKey(networkName));
}
exports.getMiner0AccountAddress = getMiner0AccountAddress;
// Miner's account which is expected to contain a non-zero balance.
// Alternative way to generate this:
// celotooljs generate account-address --private-key ${MINER1_PRIVATE_KEY}
function getMiner1AccountAddress(networkName) {
    return generateAccountAddressFromPrivateKey(getMiner1PrivateKey(networkName));
}
exports.getMiner1AccountAddress = getMiner1AccountAddress;
function getIpAddressOfTxnNode(networkName) {
    return __awaiter(this, void 0, void 0, function () {
        var staticNodes, _a, _b, singleEnode;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!(cachedIpAddress === null)) return [3 /*break*/, 2];
                    logger_1.Logger.debug('getIpAddressOfTxnNode', "network name is \"" + networkName + "\"");
                    _b = (_a = JSON).parse;
                    return [4 /*yield*/, static_node_utils_1.default.getStaticNodesAsync(networkName)];
                case 1:
                    staticNodes = _b.apply(_a, [_c.sent()]);
                    singleEnode = staticNodes[0];
                    cachedIpAddress = singleEnode.split('@')[1].split(':')[0];
                    _c.label = 2;
                case 2:
                    logger_1.Logger.debug('getIpAddressOfTxnNode', "IP address of nodes[0] of " + network_name_1.NETWORK_NAME + " is " + cachedIpAddress);
                    if (cachedIpAddress === null) {
                        throw new Error("IP address for " + network_name_1.NETWORK_NAME + " is null");
                    }
                    return [2 /*return*/, cachedIpAddress];
            }
        });
    });
}
exports.getIpAddressOfTxnNode = getIpAddressOfTxnNode;
function getWeb3ForTesting() {
    return __awaiter(this, void 0, void 0, function () {
        var ipAddress;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getIpAddressOfTxnNode(network_name_1.NETWORK_NAME)];
                case 1:
                    ipAddress = _a.sent();
                    return [2 /*return*/, web3_utils_1.Web3Utils.getWeb3('http', ipAddress, HTTP_PROVIDER_PORT)];
            }
        });
    });
}
exports.getWeb3ForTesting = getWeb3ForTesting;
function getWeb3WithSigningAbilityForTesting(privateKey) {
    return __awaiter(this, void 0, void 0, function () {
        var ipAddress;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getIpAddressOfTxnNode(network_name_1.NETWORK_NAME)];
                case 1:
                    ipAddress = _a.sent();
                    return [2 /*return*/, web3_utils_1.Web3Utils.getWeb3WithSigningAbility('http', ipAddress, HTTP_PROVIDER_PORT, privateKey)];
            }
        });
    });
}
exports.getWeb3WithSigningAbilityForTesting = getWeb3WithSigningAbilityForTesting;
