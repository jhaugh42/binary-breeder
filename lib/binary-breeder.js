'use strict';

var Random = require('./random-wrapper.js');
var breeder;

module.exports = breeder = {

    breed: function(parentChromosomes, options) {

        breeder._setDefaultOptionsIfNecessary(options);
        breeder._validateParentChromosomes(parentChromosomes);

        var newChildren = [];
        for (var i = 1; i < options.numOffspring; ++i) {

            var offspring = breeder._crossover(parentChromosomes[0], parentChromosomes[1]);

            offspring.forEach(function (child) {
                var mutated = breeder._mutate(child, options.mutationChance);
                newChildren.push(mutated);
            });
        }

        return breeder._killRandomChildren(newChildren, options.numOffspring);
    },

    _setDefaultOptionsIfNecessary: function(options) {
        options = options || {};
        options.mutationChance = options.mutationChance || 0.01;
        options.numOffspring = options.numOffspring || 10;
    },

    _validateParentChromosomes: function(parentChromosomes) {
        if(!Array.isArray(parentChromosomes)) {
            throw new Error('Parent chromosomes must be provided in an array.');
        }

        if(parentChromosomes.length !== 2) {
            throw new Error('Exactly two parent chromosomes should be specified.');
        }

        if(typeof parentChromosomes[0] !== 'string' || typeof parentChromosomes[1] !== 'string') {
            throw new Error('Both parent chromosomes must be strings.');
        }

        if(parentChromosomes[0].length !== parentChromosomes[1].length) {
            throw new Error('Both chromosomes must be the same length');
        }

        var only0and1Regex = /^[01]+$/g;
        if(parentChromosomes[0].match(only0and1Regex) === null || parentChromosomes[1].match(only0and1Regex) === null) {
            throw new Error('Both chromosomes may only contain only 0s and 1s.')
        }
    },
    _killRandomChildren: function(newChildren, numRequestedChildren) {
        var numGenerated = newChildren.length;
        for(var i = 0; i < numGenerated - numRequestedChildren; ++i) {
            var randomIndexToKill = Random.integer(0, newChildren.length - 1);
            newChildren.splice(randomIndexToKill, 1);
        }
        return newChildren;
    },

    _mutate: function(chromosome, mutationChance) {
        var mutatedChromosome = '';
        for(var i = 0; i < chromosome.length; ++i) {
            if(Random.real(0, 0.999999) < mutationChance) {
                mutatedChromosome += chromosome[i] === '0' ? '1' : '0';
            } else {
                mutatedChromosome += chromosome[i];
            }
        }
        return mutatedChromosome;
    },

    _crossover: function(chromosome1, chromosome2, callback) {
        var crossoverStartIndex = Random.integer(1, chromosome1.length - 1);
        var newChromosome1 = '';
        var newChromosome2 = '';

        newChromosome1 += chromosome1.slice(0, crossoverStartIndex);
        newChromosome2 += chromosome2.slice(0, crossoverStartIndex);

        newChromosome1 += chromosome2.slice(crossoverStartIndex, chromosome1.length);
        newChromosome2 += chromosome1.slice(crossoverStartIndex, chromosome1.length);

        callback(null, [
            newChromosome1,
            newChromosome2
        ]);
    }
};