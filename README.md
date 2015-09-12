# binary-breeder

Breeds two strings of binary digits and breeds the requested number of offspring.

[![npm](https://img.shields.io/npm/v/binary-breeder.svg)](https://www.npmjs.com/package/binary-breeder)[![Coverage Status](https://coveralls.io/repos/jhaugh42/binary-breeder/badge.svg?branch=master&service=github)](https://coveralls.io/github/jhaugh42/binary-breeder?branch=master)[![Build Status](https://travis-ci.org/jhaugh42/binary-breeder.svg?branch=master)](https://travis-ci.org/jhaugh42/binary-breeder)



## Installation
`npm install binary-breeder`

## Dev Setup
```
npm install -g mocha
npm install -g istanbul
```

## Unit Tests
```
npm test
```

## Coverage
```
npm run cover
```

## Usage
```javascript
var reproduce = require('binary-breeder');

var numOffspring = 5;
var mutationChance = 0.002;
var parentChromosomes = [
    '000011001101100101',
    '110010100110110100'
];

var offspring = reproduce(parentChromosomes, numOffspring, mutationChance);
```