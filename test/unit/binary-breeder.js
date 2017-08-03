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
        var BAD_CHROMOSOMES_NON_STRING = [
            ['0010110', 10001101],
            [10001101, '0010110'],
            [, '11001'],
            [null, '100100'],
            [[], '00101001']
        ];

        var BAD_CHROMOSOMES_NOT_TWO_ELEMENTS = [
            [],
            ['0010110'],
            ['10001101', '0010110', '1010110']
        ];

        var BAD_CHROMOSOMES_INVALID_CHARACTERS = [
            ['10043210', '10001101'],
            ['10001101', '010abc10']
        ];

        var BAD_INPUT_NON_ARRAYS = [
            {name: 'integer', data: 12345},
            {name: 'string of two zeros', data: '00'},
            {name: 'string of two ones', data: '11'},
            {name: 'decimal', data: 0.1},
            {
                name: 'function', data: function () {
            }
            },
            {name: 'object literal', data: {}},
            {name: 'null', data: null},
            {name: 'undefined', data: undefined}
        ];

        var breeder;

        beforeEach(function () {
            mockery.enable({
                useCleanCache: true
            });

            mockery.registerAllowable('../../lib/binary-breeder.js');

            mockery.registerMock('./random-wrapper.js', {});

            breeder = require('../../lib/binary-breeder.js');
            breeder._crossover = {};
            breeder._mutate = {};
            breeder._killRandomChildren = {};
            breeder._getDefaultOptions = {};
            breeder.breed = {};
        });

        afterEach(function () {
            mockery.deregisterAll();
            mockery.disable();
        });

        BAD_CHROMOSOMES_NOT_TWO_ELEMENTS.forEach(function (parentChromosomes) {
            it('should throw an Error when the length of the parent chromosome array is ' + parentChromosomes.length, function () {
                var doIt = breeder._validateParentChromosomes.bind(null, parentChromosomes);
                expect(doIt).to.throw('Exactly two parent chromosomes should be specified.')
            });
        });

        BAD_CHROMOSOMES_INVALID_CHARACTERS.forEach(function (parentChromosomes, index) {
            it('should throw an Error when the element at index ' + index + ' contains characters not 0 or 1', function () {
                var doIt = breeder._validateParentChromosomes.bind(null, parentChromosomes);
                expect(doIt).to.throw('Both chromosomes may only contain only 0s and 1s.')
            });
        });

        BAD_CHROMOSOMES_NON_STRING.forEach(function (parentChromosomes, index) {
            it('should throw an Error when one element is not a string, with parent chromosomes specified as ' + JSON.stringify(parentChromosomes), function () {
                var doIt = breeder._validateParentChromosomes.bind(null, parentChromosomes);
                expect(doIt).to.throw('Both parent chromosomes must be strings.')
            });
        });

        it('should throw an Error when the length of the parent chromosomes are not equal', function () {
            var doIt = breeder._validateParentChromosomes.bind(null, ['0000', '00000']);
            expect(doIt).to.throw('Both chromosomes must be the same length.')
        });

        BAD_INPUT_NON_ARRAYS.forEach(function (badInput) {
            it('should throw an Error data type of the input chromosome is ' + badInput.name, function () {
                var doIt = breeder._validateParentChromosomes.bind(null, badInput.data);
                expect(doIt).to.throw('Parent chromosomes must be provided in an array.')
            });
        });

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
