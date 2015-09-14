'use strict';
describe('mutation of chromosomes', function() {
    var expect = require('chai').expect;
    var mockery = require('mockery');

    var NUM_CHILDREN_TO_PRODUCE = 2;

    before(function() {
        mockery.enable(
            {
                useCleanCache: true,
                warnOnReplace: false,
                warnOnUnregistered: false
            }
        );
        mockery.resetCache();
    });

    afterEach(function() {
        mockery.deregisterAll();
        mockery.resetCache();
    });

    after(function() {
        mockery.disable();
    });

    it('should mutate every bit in the resulting chromosomes when the mutation rate is 100%', function() {
        var parents = ['0000', '1111'];
        var mutationChance = 1.0;
        var crossoverStartIndex = parents[0].length;

        var mockRandom = getMockRandom();
        mockRandom.setIntegerResult(crossoverStartIndex);

        mockery.registerMock('./random-wrapper.js', mockRandom);

        var reproduce = require('../lib/binary-breeder.js');

        var offspring = reproduce(parents, NUM_CHILDREN_TO_PRODUCE, mutationChance);

        var expectedChildrenChromosomes = ['1111', '0000'];
        expect(offspring).to.deep.equal(expectedChildrenChromosomes);
    });

    it('should not mutate any bits in the resulting chromosomes when the mutation rate is 0%', function() {
        var parents = ['0000', '1111'];
        var mutationChance = 0.0;
        var crossoverStartIndex = parents[0].length;

        var mockRandom = getMockRandom();
        mockRandom.setIntegerResult(crossoverStartIndex);

        mockery.registerMock('./random-wrapper.js', mockRandom);

        var reproduce = require('../lib/binary-breeder.js');

        var offspring = reproduce(parents, NUM_CHILDREN_TO_PRODUCE, mutationChance);

        var expectedChildrenChromosomes = ['0000', '1111'];
        expect(offspring).to.deep.equal(expectedChildrenChromosomes);
    });

    function getMockRandom() {
        var randomMock = {
            integerResult: 0,
            setIntegerResult: function(result) {
                randomMock.integerResult = result;
            },
            integer: function(min, max) {
                return randomMock.integerResult;
            },
            real: function(min, max) {
                return 0.0;
            }
        };
        return randomMock;
    }
});