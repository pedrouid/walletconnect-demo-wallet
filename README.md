# Walletconnect Demo Wallet

**DEPRECATED:** Please use the [WalletConnect Developer App](https://github.com/WalletConnect/walletconnect-developer-app) instead!

This repository contains an example with wallet-connect setup.
It uses [rn-nodify](https://github.com/tradle/rn-nodeify) to use node modules and [pods](https://cocoapods.org/) to manage ios libs.

### Install

```bash
$ yarn
$ yarn run rnnodify
$ yarn run pod # You may want to install `cocoapods` first
```

### Start bundler

```bash
$ yarn start -- --reset-cache
```

### Open code in xcode

```bash
$ open ios/WalletconnectApp.xcworkspace # and press run button :)
```
