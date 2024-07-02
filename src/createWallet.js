const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

//Network
const network = bitcoin.networks.testnet

//HD – Hierarchical Deterministic Wallet
const path = `m/49'/1'/0'/0`

// Create de mnemonic words to ssed
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

// Create the root wallet
let root = bip32.fromSeed(seed, network)

// Create accout - pair of pvt-pub keys
let account = root.derivePath(path)

//Node from root
node = account.derive(0).derive(0)

let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address

console.log("Wallet")
console.log("Address: ", btcAddress)
console.log("Private Key: ", node.toWIF())
console.log("Seed: ", mnemonic)
