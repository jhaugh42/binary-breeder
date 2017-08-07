# binary-breeder

Breeds the specified number of offspring from two parent strings of binary digits with the possibility of random mutation. 

[![npm](https://img.shields.io/npm/v/binary-breeder.svg)](https://www.npmjs.com/package/binary-breeder) [![Coverage Status](https://coveralls.io/repos/jhaugh42/binary-breeder/badge.svg?branch=master&service=github)](https://coveralls.io/github/jhaugh42/binary-breeder?branch=master) [![Build Status](https://travis-ci.org/jhaugh42/binary-breeder.svg?branch=master)](https://travis-ci.org/jhaugh42/binary-breeder)



## Installation
`npm install binary-breeder`

## Dev Setup
```
npm install
```

## All Tests
This will run both unit and integration tests
```
npm test
```

## Lint
```
npm run lint
```

## Coverage
Coverage is based on unit tests only.
```
npm run cover
```

## Usage
```javascript
var breeder = require('binary-breeder');

var numOffspring = 5;
var mutationChance = 0.002;
var parentChromosomes = [
    '000011001101100101',
    '110010100110110100'
];

var offspring = breeder.breed(parentChromosomes, numOffspring, mutationChance);

/*
sample output

[ '000010100110110100',
  '110011001101100101',
  '110010100111100101',
  '000011001101110100',
  '110011001101100101' ]
*/
```
