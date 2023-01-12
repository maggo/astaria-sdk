![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/astariaxyz/astaria-sdk/main.yml?branch=master&style=flat-square)
![npm](https://img.shields.io/npm/v/@astariaxyz/sdk?style=flat-square)
![node-current](https://img.shields.io/node/v/@astariaxyz/sdk?style=flat-square)
![GitHub](https://img.shields.io/github/license/astariaxyz/astaria-sdk?style=flat-square)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# Astaria SDK :sparkles:

> Note: This package is in alpha. The API is subject to change without notice.
>
> ### Internal Development Notes (to be removed):
>
> - Open Pull Requests against `develop` branch until stable v1.0.0 release.
> - When adding [ABI files](abi/README.md), run `yarn typechain:compile` and commit generated typescript bindings.
> - Follow [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/) specification for commit messages.

This library aims to handle functions that are core to the Astaria architecture and facilitate interaction with our smart contracts.

- [Installation](#installation)
- [API](#api)
- [Contributing](#contributing)
- [Development](#development)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
  - [Watch Build](#watch-build)
  - [Running Tests](#running-tests)
  - [Versioning](#versioning)
- [License](#license)

## Installation

To install and set up the library, run:

```sh
$ yarn add @astariaxyz/sdk@alpha
```

Or if you prefer using npm:

```sh
$ npm install --save @astariaxyz/sdk@alpha
```

## API

Coming soon&trade;

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

1.  Fork it!
2.  Create your feature branch: `git checkout -b feat/my-new-feature`
3.  Add your changes: `git add .`
4.  Commit your changes: `git commit -am 'feat: Add some feature'`
5.  Push to the branch: `git push origin feat/my-new-feature`
6.  Submit a pull request :sunglasses:

### Prerequisites

This project requires [Node](http://nodejs.org/) version 16.x or later. We recommend using [yarn v1](https://classic.yarnpkg.com) as your package manager, but [npm](https://npmjs.org/) should work without issue.
To make sure you have them available on your machine,
try running the following command.

```bash
$ npm -v && node -v && yarn -v

8.5.0
v16.14.2
1.22.15
```

### Setup

**BEFORE YOU INSTALL:** please read the [prerequisites](#prerequisites) above.

Start with cloning this repo on your local machine:

```sh
$ git clone https://github.com/astariaxyz/astaria-sdk.git
$ cd astaria-sdk
```

Then install dependencies:

```sh
$ yarn
$ cd astaria-sdk
```

### Watch Build

This will automatically watch for changes and rebuild the app.

```sh
$ yarn start
```

### Running Tests

```sh
$ yarn test
```

Watch tests:

```sh
$ yarn test:watch
```

### Versioning

We use [semantic versioning](http://semver.org/) for versioning. For the versions available, see the [tags](https://github.com/astariaxyz/astaria-sdk/tags) and [releases](https://github.com/astariaxyz/astaria-sdk/releases) on this repository.

## License

[MIT License](LICENSE.md) © Astaria
