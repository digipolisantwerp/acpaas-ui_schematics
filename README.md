# Getting Started With Schematics

This repository is a basic Schematic implementation that serves as a starting point to create and publish Schematics to NPM.

### Development

Rebuild with
```bash
npm run build
```

To enable watching for changes run
```bash
npm run build -- --watch
```

To install the schematic in your app, link this repo with
```bash
npm link
```

and run
```bash
ng generate @acpaas-ui/schematics:<schematic> --project=<project> --name=<name>
```
in your app.

### Testing

To test locally, install `@angular-devkit/schematics` globally and use the `schematics` command line tool. That tool acts the same as the `generate` command of the Angular CLI, but also has a debug mode.

Check the documentation with
```bash
schematics --help
```

### Unit Testing

`npm run test` will run the unit tests, using Jasmine as a runner and test framework.

### Publishing

To publish, simply do:

```bash
npm run build
npm publish
```

That's it!
 