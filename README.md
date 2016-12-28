#Front-end boilerplate

##Contents:
  1. [Explanation](#explanation)
     - [Getting Started](#getting-started)
     - [Development steps](#development-steps)
     - [Testing steps](#testing-steps)
     - [Deployment steps](#deployment-steps)
  2. [Used tools](#used-tools)
  3. [Deep understand](#deep-understand)

## Explanation:
This is a boilerplate made for easy and fast project setup. It supports React, Webpack, Gulp and a lot more tools.

### Getting Started:
```bash
npm run start #will run npm install and first bundle of files
npm run server #will start server
```

### Development steps:
```bash
npm run dev #will initialize the server, webapp and asset bundle
```
### Testing steps:
#### Single Run:
```bash
npm run test #will test all specs
```
#### Development Run(BDD):
```bash
npm run dev
gulp bdd #will run every test on save
```
### Deployment steps:
```bash
npm run deploy #this will take a while
```

## Used tools:
- React
  - Flux
- Flow
- Webpack
- Gulp
- Fetch
- Babel
- Mocha
- Chai
- Bulma.io
- SCSS
  - ITCSS

## Deep understand

### NPM Scripts:
- **npm run start** - will start de project, intall dependencies and build application
- **npm run server** - will start the default node server
- **npm run test** - will run the test suite once
- **npm run dev** - will start the development server and assets compilation watch
- **npm run build** - will build both assets and application
- **npm run build:js** - will build js minified
- **npm run build:scss** - will build scss minified
- **npm run bundle:js** - will bundle js files into one
- **npm run bundle:scss** - will bundle scss files into one
- **npm run dev-server** - will start the development server
- **npm run watch:js** - will start the webpack watch -> build cycle
- **npm run deploy:js** - will build js and move to de deployment dir
- **npm run deploy** - will run the deployment steps *heavy step*
- **npm run increase:major** - will increase major number of package.json
- **npm run increase:minor** - will increase minor number of package.json
- **npm run increase:release** - will increase release number of package.json
- **npm run publish** - will publish the deployment folder into surge.sh

### Gulp Scripts:

- **gulp bundle:js** - will spawn npm run bundle:js
- **gulp bundle:scss** - will compile scss files into one
- **gulp watch:scss** - will start watch -> build cycle to scss files
- **gulp bdd** - will start watch -> test cycle for every application change
- **gulp run:build** - will spawn build:js and build:scss
- **gulp run:test** - will run test suite once
- *Deployment steps should be run by NPM not gulp*

> Made by: [@joaomarcuslf](http://joaomarcuslf.github.io/)
