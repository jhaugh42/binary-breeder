'use strict';
describe('validation of binary breeder inputs', function() {
    var expect = require('chai').expect;
    var breed = require('../../lib/binary-breeder.js');

    var BAD_CHROMOSOMES_NON_STRING = [
        ['0010110', 10001101],
        [10001101, '0010110']
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
        {name: 'function', data: function(){}},
        {name: 'object literal', data: {}}
    ];

    BAD_CHROMOSOMES_NOT_TWO_ELEMENTS.forEach(function(inputChromosomes) {
        it('should throw an Error when the length of the parent chromosome array is ' + inputChromosomes.length, function() {
            function doTest() {
                breed(inputChromosomes, 2, 0.0001);
            }

            expect(doTest).to.throw(Error);
        });
    });

    BAD_CHROMOSOMES_INVALID_CHARACTERS.forEach(function(inputChromosomes, index) {
        it('should throw an Error when the element at index ' + index + ' contains characters not 0 or 1', function() {
            function doTest() {
                breed(inputChromosomes, 2, 0.0001);
            }

            expect(doTest).to.throw(Error);
        });
    });

    BAD_CHROMOSOMES_NON_STRING.forEach(function(inputChromosomes, index) {
        it('should throw an Error when the element at index ' + index + ' is not a string', function() {
            function doTest() {
                breed(inputChromosomes, 2, 0.0001);
            }

            expect(doTest).to.throw(Error);
        });
    });

    it('should throw an Error when the length of the parent chromosomes are not equal', function() {
        function doTest() {
            breed(['10001101', '0010110'], 2, 0.0001);
        }

        expect(doTest).to.throw(Error);
    });

    BAD_INPUT_NON_ARRAYS.forEach(function(badInput) {
        it('should throw an Error data type of the input chromosome is ' + badInput.name, function() {
            function doTest() {
                breed(badInput.data, 2, 0.0001);
            }

            expect(doTest).to.throw(Error);
        });
    });
});
