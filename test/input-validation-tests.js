describe('validation of binary breeder inputs', function() {
    var expect = require('chai').expect;
    var breed = require('../lib/binary-breeder.js');

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

    BAD_CHROMOSOMES_NOT_TWO_ELEMENTS.forEach(function(inputChromosomes){
        it('should throw an Error when the length of the parent chromosome array is ' + inputChromosomes.length, function () {
            function doTest() {
                breed(inputChromosomes);
            }
            expect(doTest).to.throw;
        });
    });

    BAD_CHROMOSOMES_INVALID_CHARACTERS.forEach(function(inputChromosomes, index){
        it('should throw an Error when the element at index ' + index + ' contains characters not 0 or 1', function () {
            function doTest() {
                breed(inputChromosomes);
            }
            expect(doTest).to.throw;
        });
    });

    BAD_CHROMOSOMES_NON_STRING.forEach(function(inputChromosomes, index){
        it('should throw an Error when the element at index ' + index + ' is not a string', function () {
            function doTest() {
                breed(inputChromosomes);
            }
            expect(doTest).to.throw;
        });
    });

    it('should throw an Error when the length of the parent chromosomes are not equal', function () {
        function doTest() {
            breed(['10001101', '0010110']);
        }
        expect(doTest).to.throw;
    });
});