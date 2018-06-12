# ACPaaS UI Schematics

> Custom schematics for the ACPaaS UI project.

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Documentation](#documentation)
4. [Contribution](#contribution)
5. [License](#license)

---

## [Installation](#installation)

Install the schematics in your [angular-cli](https://github.com/angular/angular-cli) app:

```shell
npm install @acpaas-ui/schematics --save-dev
```

or

```shell
yarn add @acpaas-ui/schematics --save-dev
```

## [Usage](#usage)

The custom `package` schematic will be available for use with the cli:

```shell
ng g @acpaas-ui/schematics:package --name=<name here>
```

## Development

1. Install all dependencies

```shell
npm install
```

or

```shell
yarn
```

2. Build with

```bash
npm run build
```

To enable watching for changes run
```bash
npm run build -- --watch
```

3. To install the schematic in your app, link this repo with

```bash
npm link
```

and run
```bash
ng generate @acpaas-ui/schematics:<schematic> --name=<name>
```
in your app.

4. To test locally, install `@angular-devkit/schematics` globally and use the `schematics` command line tool. That tool acts the same as the `generate` command of the Angular CLI, but also has a debug mode.

Check the documentation with
```bash
schematics --help
```

5. Unit Testing

`npm run test` will run the unit tests, using Jasmine as a runner and test framework.

## [Documentation](#documentation)

See the [angular schematics](https://github.com/angular/angular-cli/tree/master/packages/schematics/angular) and [this blogpost](https://blog.angular.io/schematics-an-introduction-dc1dfbc2a2b2) for more info.

## [Contribution](#contribution)

Please make sure to read the [Contributing Guide](./.github/CONTRIBUTING.md) before making a pull request.

Thank you to all the people who already contributed to ACPaaS UI!

## [License](#license)

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2016-present, Digipolis
