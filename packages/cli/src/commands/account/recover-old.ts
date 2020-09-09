import { generateKeysFromSeed, generateSeed, validateMnemonic } from '@celo/utils/lib/account'
import { privateKeyToAddress } from '@celo/utils/lib/address'
import { flags } from '@oclif/command'
import { toChecksumAddress } from 'ethereumjs-util'
import { printValueMap } from '../../utils/cli'
import NewAccount from './new'
import { ContractKit, newKitFromWeb3 } from '@celo/contractkit'
import { LocalWallet } from '@celo/contractkit/lib/wallets/local-wallet'
import Web3 from 'web3'

// TODO: This command should be prune in the future after all accounts had been migrated
export default class RecoverOld extends NewAccount {
  static description =
    'Recovers the Valora old account and print out the key information. The old Valora app (in a beta state) generated the user address using a seed of 32 bytes, instead of 64 bytes. As the app fixed that, some old accounts were left with some funds. This command allows the user to recover those funds.'

  static flags = {
    ...NewAccount.flags,
    mnemonicPath: flags.string({
      required: true,
      description:
        'Path to a file that contains all the mnemonic words separated by a space (example: "word1 word2 word3 ... word24"). If the words are a language other than English, the --language flag must be used. Only BIP39 mnemonics are supported',
    }),
  }

  static examples = [
    'recover-old --mnemonicPath some_folder/my_mnemonic_file',
    'recover-old --mnemonicPath some_folder/my_mnemonic_file --passphrasePath myFolder/my_passphrase_file',
    'recover-old --mnemonicPath some_folder/my_mnemonic_file --language spanish',
    'recover-old --mnemonicPath some_folder/my_mnemonic_file --passphrasePath some_folder/my_passphrase_file --language japanese --addressIndex 5',
    'recover-old --mnemonicPath some_folder/my_mnemonic_file --passphrasePath some_folder/my_passphrase_file --addressIndex 5',
  ]

  async run() {
    const res = this.parse(RecoverOld)
    const mnemonic = NewAccount.readFile(res.flags.mnemonicPath)
    if (mnemonic) {
      if (!validateMnemonic(mnemonic, NewAccount.languageOptions(res.flags.language!))) {
        throw Error('Invalid mnemonic. Should be a bip39 mnemonic')
      }
    } else {
      throw Error('Must provide a valid bip39 mnemonic')
    }
    const derivationPath = NewAccount.sanitizeDerivationPath(res.flags.derivationPath)
    const passphrase = NewAccount.readFile(res.flags.passphrasePath)
    const seed32 = await generateSeed(mnemonic, passphrase, undefined, 32)
    const keys = generateKeysFromSeed(
      seed32,
      res.flags.addressIndex,
      res.flags.changeIndex,
      derivationPath
    )
    const accountAddress = toChecksumAddress(privateKeyToAddress(keys.privateKey))
    printValueMap({ accountAddress, ...keys })

    // 1. Use celocli to get your pepper
    //  https://github.com/celo-org/celo-monorepo/pull/4976

    const DEFAULT_TESTNET = 'rc1'
    const provider = new Web3.providers.HttpProvider(
      `https://${DEFAULT_TESTNET}-forno.celo-testnet.org`
    )
    const web3 = new Web3(provider)
    const wallet = new LocalWallet()
    wallet.addAccount(keys.privateKey)
    const contractKit = newKitFromWeb3(web3, wallet)
    // 4. Note the address you want to remove and add it here (should match with the mnemonic)
    // contractKit.defaultAccount = "<ADDRESS_FROM_MNEMONIC>"

    const attestations = await contractKit.contracts.getAttestations()

    // 2. Update your phone number (with +country code) and pepper here
    // 3. Save your mnemonic to a file and run this command `./bin/run account:recover-old --mnemonicPath <FILE>`
    const identifier = web3.utils.soliditySha3({
      type: 'string',
      value: 'tel://<PHONE_NUMBER>__<PEPPER>',
    })
    console.log(await attestations.lookupIdentifiers([identifier]))

    // 5. Uncomment, ensure your mnemonic is funded with CELO, and run rerun this command
    // await (
    //   await attestations.revoke(identifier, contractKit.defaultAccount)
    // ).sendAndWaitForReceipt()

    console.log(await attestations.lookupIdentifiers([identifier]))
  }
}
