'use strict';

const expect = require('chai').expect;
const mockery = require('mockery');
const sinon = require('sinon');

describe('random-wrapper', () => {

    describe('real', () => {
        let randomWrapper;

        beforeEach(() => {
            mockery.enable({
                useCleanCache: true
            });

            sinon.stub(Math, 'random');

            mockery.registerAllowable('../../lib/random-wrapper.js');
            randomWrapper = require('../../lib/random-wrapper.js');
            randomWrapper.integer = {};

        });

        afterEach(() => {
            Math.random.restore();
            mockery.deregisterAll();
            mockery.disable();
        });

        it('should call Math.random once, without parameters', () => {
            randomWrapper.real();

            expect(Math.random.args).to.eql([[]]);
        });

        it('should return the result of Math.random', () => {
            Math.random.returns('result of random');

            const result = randomWrapper.real();

            expect(result).to.eql('result of random');
        });
    });

    describe('integer', () => {
        let randomWrapper;

        beforeEach(() => {
            mockery.enable({
                useCleanCache: true
            });

            sinon.stub(Math, 'random');
            sinon.stub(Math, 'floor');

            mockery.registerAllowable('../../lib/random-wrapper.js');
            randomWrapper = require('../../lib/random-wrapper.js');
            randomWrapper.real = {};
        });

        afterEach(() => {
            Math.random.restore();
            Math.floor.restore();
            mockery.deregisterAll();
            mockery.disable();
        });

        it('should call Math.random once, without parameters', () => {
            randomWrapper.integer();

            expect(Math.random.args).to.eql([[]]);
        });

        it('should call Math.floor once, with the result of Math.random * (max - min + 1) when min=1 and max=1', () => {
            Math.random.returns(1);

            randomWrapper.integer(1, 1);

            expect(Math.floor.args).to.eql([
                [1]
            ]);

        });

        it('should call Math.floor once, with the result of Math.random * (max - min + 1) when min=6 and max=20', () => {
            Math.random.returns(1);

            randomWrapper.integer(6, 20);

            expect(Math.floor.args).to.eql([
                [15]
            ]);
        });

        it('should return the result of Math.floor + min when min=3', () => {
            Math.floor.returns(94);

            const result = randomWrapper.integer(3, 49);

            expect(result).to.equal(94 + 3);
        });
    });
});
