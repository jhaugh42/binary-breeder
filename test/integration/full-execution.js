'use strict';

var expect = require('chai').expect;
var mockery = require('mockery');

describe('binary-breeder full execution', function() {
    var breeder;

    beforeEach(function () {
        mockery.enable({
            useCleanCache: true,
            warnOnUnregistered: false
        });

        breeder = require('../../lib/binary-breeder.js');
    });

    afterEach(function () {
        mockery.deregisterAll();
        mockery.disable();
    });

    it('should produce the number of offspring specified in the options', function() {
        var parentChromosomes = ['001001001110111001110', '001111111000111001110'];
        var options = {
            numOffspring: 8
        };

        var result = breeder.breed(parentChromosomes, options);

        expect(result.length).to.eql(8);
    });

    it('should produce 10 offspring if options.numOffspring is not specified', function() {
        var parentChromosomes = ['001001001110111001110', '001111111000111001110'];
        var options = {};

        var result = breeder.breed(parentChromosomes, options);

        expect(result.length).to.eql(10);
    });

});
