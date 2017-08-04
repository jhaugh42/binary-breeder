'use strict';

const expect = require('chai').expect;
const mockery = require('mockery');
const sinon = require('sinon');

describe('binary-breeder full execution', () => {
    let breeder;
    let randomMock;

    beforeEach(() => {
        mockery.enable({
            useCleanCache: true,
            warnOnUnregistered: false
        });

        randomMock = {
            real: sinon.stub(),
            integer: sinon.stub()
        };
        mockery.registerMock('./random-wrapper.js', randomMock);

        breeder = require('../../lib/binary-breeder.js');
    });

    afterEach(() => {
        mockery.deregisterAll();
        mockery.disable();
    });

    it('should produce the number of offspring specified in the options', () => {
        const parentChromosomes = ['001001001110111001110', '001111111000111001110'];

        // always mutate
        randomMock.real.returns(0);

        // always crossover bits up to (but not including) index 2
        // always kill child at index 2
        randomMock.integer.returns(2);

        const result = breeder.breed(parentChromosomes);

        expect(result).to.eql([
            '110000000111000110001',
            '110110110001000110001',
            '110000000111000110001',
            '110110110001000110001',
            '110000000111000110001',
            '110110110001000110001',
            '110000000111000110001',
            '110110110001000110001',
            '110000000111000110001',
            '110110110001000110001'
        ]);
    });
});
