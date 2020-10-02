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
var subproviders_1 = require("@0x/subproviders");
var util = __importStar(require("util"));
var web3_1 = __importDefault(require("web3"));
var logger_1 = require("./logger");
var transaction_utils_1 = require("./transaction-utils");
function getAccountAddressFromPrivateKey(privateKey) {
    if (!privateKey.toLowerCase().startsWith('0x')) {
        privateKey = '0x' + privateKey;
    }
    return new web3_1.default().eth.accounts.privateKeyToAccount(privateKey).address;
}
exports.getAccountAddressFromPrivateKey = getAccountAddressFromPrivateKey;
// This web3 has signing ability.
function addLocalAccount(web3, privateKey) {
    var celoProvider = new transaction_utils_1.CeloProvider(privateKey);
    var existingProvider = web3.currentProvider;
    var providerEngine;
    if (existingProvider instanceof subproviders_1.Web3ProviderEngine) {
        logger_1.Logger.debug('new-web3-utils/addLocalAccount', 'Existing provider is already a Web3ProviderEngine');
        providerEngine = addLocalAccountToExistingProvider(existingProvider, celoProvider);
    }
    else {
        providerEngine = createNewProviderWithLocalAccount(existingProvider, celoProvider);
        web3.setProvider(providerEngine);
    }
    providerEngine.start();
    logger_1.Logger.debug('new-web3-utils/addLocalAccount', 'Providers configured');
    providerEngine.stop();
}
exports.addLocalAccount = addLocalAccount;
function addLocalAccountToExistingProvider(existingProvider, localAccountProvider) {
    if (isAccountAlreadyAdded(existingProvider, localAccountProvider)) {
        return existingProvider;
    }
    // When a private key has already been added, add a new one before
    // all other providers.
    // I could not find a better way to do this, so, I had to
    // access the private `_providers` field of providerEngine
    // @ts-ignore-next-line
    existingProvider._providers.splice(0, 0, localAccountProvider);
    localAccountProvider.setEngine(existingProvider);
    return existingProvider;
}
function createNewProviderWithLocalAccount(existingProvider, localAccountProvider) {
    // Create a Web3 Provider Engine
    var providerEngine = new subproviders_1.Web3ProviderEngine();
    // Compose our Providers, order matters
    // Celo provider provides signing
    providerEngine.addProvider(localAccountProvider);
    // Use the existing provider to route all other requests
    var subprovider = new SubproviderWithLogging(existingProvider);
    logger_1.Logger.debug('new-web3-utils/createNewProviderWithLocalAccount', 'Setting up providers...');
    providerEngine.addProvider(subprovider);
    return providerEngine;
}
function isAccountAlreadyAdded(existingProvider, localAccountProvider) {
    var alreadyAddedAddresses = [];
    // @ts-ignore-next-line
    var providers = existingProvider._providers;
    for (var _i = 0, providers_1 = providers; _i < providers_1.length; _i++) {
        var provider = providers_1[_i];
        if (provider instanceof transaction_utils_1.CeloProvider) {
            var accounts = provider.getAccounts();
            alreadyAddedAddresses.push.apply(alreadyAddedAddresses, accounts);
        }
    }
    var localAccountAddresses = localAccountProvider.getAccounts();
    for (var _a = 0, localAccountAddresses_1 = localAccountAddresses; _a < localAccountAddresses_1.length; _a++) {
        var localAccountAddress = localAccountAddresses_1[_a];
        if (alreadyAddedAddresses.indexOf(localAccountAddress) < 0) {
            logger_1.Logger.debug('new-web3-utils/isAccountAlreadyAdded', "Account " + localAccountAddress + " is not already added, " +
                ("existing accounts are " + alreadyAddedAddresses));
            return false;
        }
    }
    logger_1.Logger.debug('new-web3-utils/addLocalAccount', "Account " + localAccountAddresses + " is already added");
    return true;
}
var SubproviderWithLogging = /** @class */ (function (_super) {
    __extends(SubproviderWithLogging, _super);
    function SubproviderWithLogging(provider) {
        var _this = _super.call(this) || this;
        _this.provider = provider;
        _this._provider = provider;
        return _this;
    }
    /**
     * @param payload JSON RPC request payload
     * @param next A callback to pass the request to the next subprovider in the stack
     * @param end A callback called once the subprovider is done handling the request
     */
    SubproviderWithLogging.prototype.handleRequest = function (payload, _next, end) {
        logger_1.Logger.debug('new-web3-utils/addLocalAccount', "SubproviderWithLogging@handleRequest: " + util.inspect(payload));
        // Inspired from https://github.com/MetaMask/web3-provider-engine/pull/19/
        return this._provider.send(payload, function (err, response) {
            if (err != null) {
                logger_1.Logger.verbose('new-web3-utils/addLocalAccount', "SubproviderWithLogging@response is error: " + err);
                end(err);
                return;
            }
            if (response == null) {
                end(new Error("Response is null for " + JSON.stringify(payload)));
                return;
            }
            if (response.error != null) {
                logger_1.Logger.verbose('new-web3-utils/addLocalAccount', "SubproviderWithLogging@response includes error: " + response);
                end(new Error(response.error));
                return;
            }
            logger_1.Logger.debug('new-web3-utils/addLocalAccount', "SubproviderWithLogging@response: " + util.inspect(response));
            end(null, response.result);
        });
    };
    return SubproviderWithLogging;
}(subproviders_1.Subprovider));
