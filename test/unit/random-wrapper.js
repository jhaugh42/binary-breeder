'use strict';

var expect = require('chai').expect;
var mockery = require('mockery');
var sinon = require('sinon');

describe('random-wrapper', function() {

    describe('real', function() {
        var randomWrapper;

        beforeEach(function () {
            mockery.enable({
                useCleanCache: true
            });

            sinon.stub(Math, 'random');

            mockery.registerAllowable('../../lib/random-wrapper.js');
            randomWrapper = require('../../lib/random-wrapper.js');
            randomWrapper.integer = {};

        });

        afterEach(function () {
            Math.random.restore();
            mockery.deregisterAll();
            mockery.disable();
        });

        it('should call Math.random once, without parameters', function() {
            randomWrapper.real();

            expect(Math.random.args).to.eql([[]]);
        });

        it('should return the result of Math.random', function() {
            Math.random.returns('result of random');

            var result = randomWrapper.real();

            expect(result).to.eql('result of random');
        });
    });

    describe('integer', function() {
        var randomWrapper;

        beforeEach(function () {
            mockery.enable({
                useCleanCache: true
            });

            sinon.stub(Math, 'random');
            sinon.stub(Math, 'floor');

            mockery.registerAllowable('../../lib/random-wrapper.js');
            randomWrapper = require('../../lib/random-wrapper.js');
            randomWrapper.real = {};
        });

        afterEach(function () {
            Math.random.restore();
            Math.floor.restore();
            mockery.deregisterAll();
            mockery.disable();
        });

        it('should call Math.random once, without parameters', function() {
            randomWrapper.integer();

            expect(Math.random.args).to.eql([[]]);
        });

        it('should call Math.floor once, with the result of Math.random * (max - min + 1) when min=1 and max=1', function() {
            Math.random.returns(1);

            randomWrapper.integer(1, 1);

            expect(Math.floor.args).to.eql([
                [1]
            ]);

        });

        it('should call Math.floor once, with the result of Math.random * (max - min + 1) when min=6 and max=20', function() {
            Math.random.returns(1);

            randomWrapper.integer(6, 20);

            expect(Math.floor.args).to.eql([
                [15]
            ]);
        });

        it('should return the result of Math.floor + min when min=3', function() {
            Math.floor.returns(94);

            var result = randomWrapper.integer(3, 49);

            expect(result).to.equal(94 + 3);
        });
    });
});
