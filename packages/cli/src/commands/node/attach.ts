import { BaseCommand } from '../../base'
import { execCmd } from '../../utils/exec'

export default class GethAttach extends BaseCommand {
  static description = 'geth attach to the running node'

  static flags = {
    ...BaseCommand.flagsWithoutLocalAddresses(),
  }

  async run() {
    await execCmd('docker', [
      'run',
      '-it',
      '-v=/tmp/celocli-lightest:/root/.celo',
      'us.gcr.io/celo-org/celo-node:alfajores',
      'attach',
    ])
  }
}
