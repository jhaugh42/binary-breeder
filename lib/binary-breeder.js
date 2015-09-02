'use strict';

var Random = require('random-js');

module.exports = function(parentChromosomes, numChildrenRequested, options) {

    validateParentChromosomes(parentChromosomes);

    var newChildren = [];
    for(var i = 1; i < numChildrenRequested; ++i) {

        var offspring = crossover(parentChromosomes[0], parentChromosomes[1]);

        offspring.forEach(function(child) {
            var mutated = mutate(child, options.mutationChance);
            newChildren.push(mutated);
        });
    }

    return killRandomChildren(newChildren, numChildrenRequested);

    function validateParentChromosomes(parentChromosomes) {
        if(parentChromosomes.length !== 2) {
            throw new Error('Exactly two parent chromosomes should be specified.');
        }

        if(typeof parentChromosomes[0] !== 'string' || typeof parentChromosomes[1] !== 'string') {
            throw new Error('Both parent chromosomes must be strings.');
        }

        if(parentChromosomes[0].length !== parentChromosomes[1].length) {
            throw new Error('Both chromosomes must be the same length');
        }

        var only0and1Regex = /[01]+/g;
        if(parentChromosomes[0].match(only0and1Regex) === null || parentChromosomes[1].match(only0and1Regex) === null) {
            throw new Error('Both chromosomes may only contain only 0s and 1s.')
        }
    }

    function killRandomChildren(newChildren, numRequestedChildren) {
        var numGenerated = newChildren.length;
        for(var i = 0; i < numGenerated - numRequestedChildren; ++i) {
            var randomIndexToKill = Random.integer(0, newChildren.length - 1)(Random.engines.nativeMath);
            newChildren.splice(randomIndexToKill, 1);
        }
        return newChildren;
    }

    function mutate(chromosome, mutationChance) {
        var mutatedChromosome = '';
        for(var i = 0; i < chromosome.length; ++i) {
            if(Random.real(0, 0.999999)(Random.engines.nativeMath) < mutationChance) {
                if(chromosome[i] === '0') {
                    mutatedChromosome += '1';
                } else {
                    mutatedChromosome += '0';
                }
            } else {
                mutatedChromosome += chromosome[i];
            }
        }
        return mutatedChromosome;
    }

    function crossover(chromosome1, chromosome2) {
        var crossoverStartIndex = Random.integer(1, chromosome1.length - 1)(Random.engines.nativeMath);
        var newChromosome1 = '';
        var newChromosome2 = '';

        newChromosome1 += chromosome1.slice(0, crossoverStartIndex);
        newChromosome2 += chromosome2.slice(0, crossoverStartIndex);

        newChromosome1 += chromosome2.slice(crossoverStartIndex, chromosome1.length);
        newChromosome2 += chromosome1.slice(crossoverStartIndex, chromosome1.length);

        return [
            newChromosome1,
            newChromosome2
        ];
    }
};