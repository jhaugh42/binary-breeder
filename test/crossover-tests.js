'use strict';

describe('the binary breeder crossover tests', function() {
    var assert = require('chai').assert;
    var expect = require('chai').expect;
    var mockery = require('mockery');

    var MUTATION_CHANCE = 0.0;
    var NUM_CHILDREN_TO_PRODUCE = 2;

    before(function () {
        mockery.enable(
            {
                useCleanCache: true,
                warnOnReplace: false,
                warnOnUnregistered: false
            }
        );
        mockery.resetCache();
    });

    afterEach(function () {
        mockery.deregisterAll();
        mockery.resetCache();
    });

    after(function () {
        mockery.disable();
    });

    it('should return two chromosomes with only the last bit swapped when the crossover starting point is length - 1', function() {
        var parents = ['0100', '1111'];
        var crossoverStartIndex = parents[0].length - 1;

        var mockRandom = getMockRandom();
        mockRandom.setIntegerResult(crossoverStartIndex);

        mockery.registerMock('random-js', mockRandom);

        var expectedChildrenChromosomes = ['0101', '1110'];

        var reproduce = require('../lib/binary-breeder.js');

        var offspring = reproduce(parents, NUM_CHILDREN_TO_PRODUCE, {mutationChance: MUTATION_CHANCE});


        expect(offspring).to.deep.equal(expectedChildrenChromosomes);
    });

    it('should crossover the entire chromosome when the crossover starting point is 0', function() {
        var parents = ['0100', '1111'];
        var crossoverStartIndex = 0;

        var mockRandom = getMockRandom();
        mockRandom.setIntegerResult(crossoverStartIndex);

        mockery.registerMock('random-js', mockRandom);

        var expectedChildrenChromosomes = ['1111', '0100'];

        var reproduce = require('../lib/binary-breeder.js');

        var offspring = reproduce(parents, NUM_CHILDREN_TO_PRODUCE, {mutationChance: MUTATION_CHANCE});


        expect(offspring).to.deep.equal(expectedChildrenChromosomes);
    });

    function getMockRandom() {
        var randomMock =  {
            integerResult: 0,
            setIntegerResult: function(result) {
                randomMock.integerResult = result;
            },
            integer: function (min, max) {
                return function (maths) {
                    return randomMock.integerResult;
                }
            },
            real: function (min, max) {
                return function (maths) {
                    return MUTATION_CHANCE;
                }
            },
            engines: {
                nativeMath: 'whatever'
            }
        };
        return randomMock;
    }
});