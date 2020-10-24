import { linkedLibraries } from '@celo/protocol/migrationsConfig'
import { ProxyInstance } from 'types'

module.exports = (deployer: any) => {
  Object.keys(linkedLibraries).forEach((lib: string) => {
    const LibraryProxy = artifacts.require(lib + 'Proxy')
    const Library = artifacts.require(lib)
    console.log('Deploying proxy for', lib)
    deployer.deploy(LibraryProxy)
    console.log('Deploying', lib)
    deployer.deploy(Library)
    deployer.then(async () => {
      const library = await Library.deployed()
      const proxy: ProxyInstance = await LibraryProxy.deployed()
      console.log('Linking proxy to', lib)
      await proxy._setImplementation(library.address)
      const Contracts = linkedLibraries[lib].map((contract: string) => artifacts.require(contract))
      const ProxiedLibrary = Library.at(proxy.address)
      console.log('Linking', lib, proxy.address, 'to', linkedLibraries[lib])
      Contracts.map((c: any) => c.link(ProxiedLibrary))
      deployer.link(ProxiedLibrary, Contracts)
    })
  })
}
