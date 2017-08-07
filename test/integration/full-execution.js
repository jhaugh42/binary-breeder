'use strict';

const expect = require('chai').expect;
const mockery = require('mockery');

describe('binary-breeder full execution', () => {
    let breeder;

    beforeEach(() => {
        mockery.enable({
            useCleanCache: true,
            warnOnUnregistered: false
        });

        breeder = require('../../lib/binary-breeder.js');
    });

    afterEach(() => {
        mockery.deregisterAll();
        mockery.disable();
    });

    it('should produce the number of offspring specified in the options', () => {
        const parentChromosomes = ['001001001110111001110', '001111111000111001110'];
        const options = {
            numOffspring: 8
        };

        const result = breeder.breed(parentChromosomes, options);

        expect(result.length).to.eql(8);
    });

    it('should produce 10 offspring if options.numOffspring is not specified', () => {
        const parentChromosomes = ['001001001110111001110', '001111111000111001110'];
        const options = {};

        const result = breeder.breed(parentChromosomes, options);

        expect(result.length).to.eql(10);
    });

});
