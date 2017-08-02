'use strict';

var expect = require('chai').expect;
var mockery = require('mockery');
var sinon = require('sinon');

describe('binary-breeder', function() {

    var callbackSpy;
    var randomIntegerStub;
    var randomRealStub;
    var breeder;

    before(function() {
        mockery.enable({useCleanCache: true});

        mockery.registerMock('./random-wrapper.js', {
            real: randomRealStub = sinon.stub(),
            integer: randomIntegerStub = sinon.stub()
        });
        callbackSpy = sinon.spy();

        mockery.registerAllowable('../../lib/binary-breeder.js');
        breeder = require('../../lib/binary-breeder.js');
    });

    after(function() {
        mockery.deregisterAll();
        mockery.disable();
    });

    describe('breed', function() {

    });

    describe('_setDefaultOptionsIfNecessary', function() {

    });

    describe('_validateParentChromosomes', function() {

    });

    describe('_killRandomChildren', function() {

    });

    describe('_mutate', function() {

    });

    describe('_crossover', function() {
        var chromosome1;
        var chromosome2;

        it('should invoke Random.integer with ')
    });
});