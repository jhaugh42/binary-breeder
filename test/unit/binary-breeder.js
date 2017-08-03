'use strict';

var expect = require('chai').expect;
var mockery = require('mockery');
var sinon = require('sinon');

describe('binary-breeder', function() {

    describe('breed', function() {

    });

    describe('_getDefaultOptions', function() {

    });

    describe('_validateParentChromosomes', function() {

    });

    describe('_killRandomChildren', function() {
        var randomMock;
        var breeder;

        beforeEach(function () {
            mockery.enable({
                useCleanCache: true
            });

            mockery.registerAllowable('../../lib/binary-breeder.js');

            randomMock = {
                integer: sinon.stub()
            };
            mockery.registerMock('./random-wrapper.js', randomMock);

            breeder = require('../../lib/binary-breeder.js');
            breeder._crossover = {};
            breeder._mutate = {};
            breeder._validateParentChromosomes = {};
            breeder._getDefaultOptions = {};
            breeder.breed = {};
        });

        afterEach(function () {
            mockery.deregisterAll();
            mockery.disable();
        });

        it('should call Random.integer 4 times with 0 and length of new children - 1, ' +
            'when the number of requested children is 4 and the length of new children is 8', function() {
            randomMock.integer.returns(0);

            breeder._killRandomChildren([1, 2, 3, 4, 5, 6, 7, 8], 4);

            expect(randomMock.integer.args).to.eql([
                [0, 7],
                [0, 6],
                [0, 5],
                [0, 4]
            ]);
        });

        it('should call Random.integer 5 times with 0 and length of new children - 1, ' +
            'when the number of requested children is 4 and the length of new children is 9', function() {
            randomMock.integer.returns(0);

            breeder._killRandomChildren([1, 2, 3, 4, 5, 6, 7, 8, 9], 4);

            expect(randomMock.integer.args).to.eql([
                [0, 8],
                [0, 7],
                [0, 6],
                [0, 5],
                [0, 4]
            ]);
        });

        it('should remove the child at index 0, when Random.integer returns 0, and only one child needs to be removed', function() {
            randomMock.integer.returns(0);

            var result = breeder._killRandomChildren([1, 2, 3, 4, 5, 6, 7, 8, 9], 8);

            expect(result).to.eql([2, 3, 4, 5, 6, 7, 8, 9]);
        });

        it('should remove the child at index 8, when Random.integer returns 8, and only one child needs to be removed', function() {
            randomMock.integer.returns(8);

            var result = breeder._killRandomChildren([1, 2, 3, 4, 5, 6, 7, 8, 9], 8);

            expect(result).to.eql([1, 2, 3, 4, 5, 6, 7, 8]);
        });

        it('should remove the child at index 4, when Random.integer returns 4, and only one child needs to be removed', function() {
            randomMock.integer.returns(4);

            var result = breeder._killRandomChildren([1, 2, 3, 4, 5, 6, 7, 8, 9], 8);

            expect(result).to.eql([1, 2, 3, 4, 6, 7, 8, 9]);
        });
    });

    describe('_mutate', function() {
        var randomMock;
        var breeder;

        beforeEach(function () {
            mockery.enable({
                useCleanCache: true
            });

            mockery.registerAllowable('../../lib/binary-breeder.js');

            randomMock = {
                real: sinon.stub()
            };
            mockery.registerMock('./random-wrapper.js', randomMock);

            breeder = require('../../lib/binary-breeder.js');
            breeder._crossover = {};
            breeder._killRandomChildren = {};
            breeder._validateParentChromosomes = {};
            breeder._getDefaultOptions = {};
            breeder.breed = {};
        });

        afterEach(function () {
            mockery.deregisterAll();
            mockery.disable();
        });

        it('should return a chromosome with all bits mutated from 0 to 1 when Random.real returns a number less than the mutation chance', function() {
            randomMock.real.returns(0.5);

            var mutatedChromosome = breeder._mutate('000000', 1);

            expect(mutatedChromosome).to.equal('111111');
        });

        it('should return a chromosome with all bits mutated from 1 to 0 when Random.real returns a number less than the mutation chance', function() {
            randomMock.real.returns(0.5);

            var mutatedChromosome = breeder._mutate('111111', 1);

            expect(mutatedChromosome).to.equal('000000');
        });

        it('should not mutate any bits when Random.real returns a number greater than the mutation chance', function() {
            randomMock.real.returns(1.0);

            var mutatedChromosome = breeder._mutate('000000', 0.2);

            expect(mutatedChromosome).to.equal('000000');
        });

        it('should call Random.real once for each bit in the chromosome, with min of 0 and max of 0.999999', function() {
            breeder._mutate('000000', 0.2);

            expect(randomMock.real.args).to.eql([
                [0, 0.999999],
                [0, 0.999999],
                [0, 0.999999],
                [0, 0.999999],
                [0, 0.999999],
                [0, 0.999999]
            ]);
        });

    });

    describe('_crossover', function() {
        var randomMock;
        var breeder;

        beforeEach(function () {
            mockery.enable({
                useCleanCache: true
            });

            mockery.registerAllowable('../../lib/binary-breeder.js');

            randomMock = {
                integer: sinon.stub()
            };
            mockery.registerMock('./random-wrapper.js', randomMock);

            breeder = require('../../lib/binary-breeder.js');
            breeder._mutate = {};
            breeder._killRandomChildren = {};
            breeder._validateParentChromosomes = {};
            breeder._getDefaultOptions = {};
            breeder.breed = {};
        });

        afterEach(function () {
            mockery.deregisterAll();
            mockery.disable();
        });

        it('should call Random.integer once, with 1 and (chromosome1.length -1)', function() {
            breeder._crossover('0000', '1111');

            expect(randomMock.integer.args).to.eql([
                [1, 3]
            ]);
        });

        it('should return two chromosomes with only the last bit swapped when the crossover starting point is 3 and the chromosome length is 4', function () {
            randomMock.integer.returns(3);

            var offspring = breeder._crossover('0000', '1111');

            expect(offspring).to.eql(['0001', '1110']);
        });

        it('should return two chromosomes with the last two bits swapped when the crossover starting point is 2 and the chromosome length is 4', function () {
            randomMock.integer.returns(2);

            var offspring = breeder._crossover('0000', '1111');

            expect(offspring).to.eql(['0011', '1100']);
        });

        it('should return two chromosomes with the last three bits swapped when the crossover starting point is 1 and the chromosome length is 4', function () {
            randomMock.integer.returns(1);

            var offspring = breeder._crossover('0000', '1111');

            expect(offspring).to.eql(['0111', '1000']);
        });

        it('should return two chromosomes with all bits swapped when the crossover starting point is 0 and the chromosome length is 4', function () {
            randomMock.integer.returns(0);

            var offspring = breeder._crossover('0000', '1111');

            expect(offspring).to.eql(['1111', '0000']);
        });
    });
});
