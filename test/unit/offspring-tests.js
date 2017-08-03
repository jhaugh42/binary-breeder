'use strict';
var expect = require('chai').expect;
var mockery = require('mockery');

describe('the number of children produced by the breeder', function() {
    var breeder;


    before(function() {
        mockery.enable({
            useCleanCache: true,
            warnOnReplace: false,
            warnOnUnregistered: false
        });
    });

    beforeEach(function() {
        breeder = require('../../lib/binary-breeder.js');
    });

    afterEach(function() {
        mockery.deregisterAll();
        mockery.resetCache();
    });

    after(function() {
        mockery.deregisterAll();
        mockery.disable();
    });



    var MUTATION_RATE = 0.02;
    var MAX_NUM_OFFSPRING = 5;
    var _testInputs = [];
    for(var i = 2; i <= MAX_NUM_OFFSPRING; i++) {
        _testInputs.push(i);
    }

    it('should throw an Error when less than two offspring are requested', function() {
        function doTest() {
            breeder.breed(['1010101', '0000001'], 1, 0.001);
        }

        expect(doTest).to.throw(Error);
    });

    _testInputs.forEach(function(numOffspring) {
        it('should produce exactly ' + numOffspring + ' offspring', function() {
            var parentChromosomes = ['111000', '001101'];
            var offspring = breeder.breed(parentChromosomes, numOffspring, MUTATION_RATE);
            expect(offspring.length).to.equal(numOffspring);
        });
    });
});
