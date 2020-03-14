<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

<h3 align="center">A Module for Utilizing IPFS P2P File System with NestJS</h3>

<div align="center">
  <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg" alt="License" />
  <img src="https://badge.fury.io/js/mfsoftworks%2Fnestjs-ipfs.svg" alt="npm version" height="18">
  <img src="https://img.shields.io/badge/built%20with-NestJs-red.svg" alt="Built with NestJS">
  <a href="https://paypal.me/nygmarose"><img src="https://img.shields.io/badge/Donate-PayPal-dc3d53.svg"/></a>
</div>

## Description

[IPFS](https://github.com/ipfs/js-ipfs) implementation module for [NestJS](https://github.com/nestjs/nest)

## Installation

```bash
npm i @mfsoftworks/nestjs-ipfs
```

## Quick Start

Import the IPFS module

```typescript
import { IpfsModule } from '@mfsoftworks/nestjs-ipfs';
```

IPFS module supports registering using defaults, or a static object

```typescript
@Module({
  imports: [IpfsModule.register()],
  providers: [AppService],
})
export class AppModule {}
```

IPFS module supports async registration with `useClass`, `useExisting`, including a `createIPFSOptions` function; or a custom `useFactory`

```typescript
@Module({
  imports: [IpfsModule.registerAsync({
    useClass: ConfigService
  })],
  providers: [AppService],
})
export class AppModule {}
```

## Wait for Node

IPFS module supports immediate start by default, as well as an optional `waitForNode` passed as a second parameter to wait for IPFS node initialisation before bootstrap proceeds.

```typescript
@Module({
  imports: [IpfsModule.register({}, true)],
  providers: [AppService],
})
export class AppModule {}
```

## Usage

`getNode()` - Call `getNode` to return the IPFS node. If it's been called previously, or `waitForNode` is true it will return the cached IPFS node object.

Currently this module is a basic Nest implementation of [js-ipfs](https://github.com/ipfs/js-ipfs), any use of the node will need to be done by your business code.

Future usage can be [suggested](http://github.com/mfsoftworks/nestjs-ipfs/issues) or contribute your own pull request to extend the functionality of this module further.

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [MF Softworks](https://github.com/mfsoftworks)
- Twitter - [@mfsoftworks](https://twitter.com/mfsoftworks)

## License

@mfsoftworks/nestjs-ipfs is [MIT licensed](LICENSE).
