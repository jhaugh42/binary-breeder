'use strict';

const Random = require('./random-wrapper.js');
const only0and1Regex = /^[01]+$/g;

let breeder;

module.exports = breeder = {

    breed(parentChromosomes, options) {

        const optionsToUse = breeder._getDefaultOptions(options);
        breeder._validateParentChromosomes(parentChromosomes);

        const newChildren = [];
        for (let i = 0; i < optionsToUse.numOffspring; ++i) {

            const offspring = breeder._crossover(parentChromosomes[0], parentChromosomes[1]);

            offspring.forEach(child => {
                const mutated = breeder._mutate(child, optionsToUse.mutationChance);
                newChildren.push(mutated);
            });
        }

        return breeder._killRandomChildren(newChildren, optionsToUse.numOffspring);
    },

    _getDefaultOptions(options) {
        return {
            mutationChance: (options || {}).mutationChance || 0.01,
            numOffspring: (options || {}).numOffspring || 10
        };
    },

    _validateParentChromosomes(parentChromosomes) {
        if (!Array.isArray(parentChromosomes)) {
            throw new Error('Parent chromosomes must be provided in an array.');
        }

        if (parentChromosomes.length !== 2) {
            throw new Error('Exactly two parent chromosomes should be specified.');
        }

        if (typeof parentChromosomes[0] !== 'string' || typeof parentChromosomes[1] !== 'string') {
            throw new Error('Both parent chromosomes must be strings.');
        }

        if (parentChromosomes[0].length !== parentChromosomes[1].length) {
            throw new Error('Both chromosomes must be the same length.');
        }

        if (parentChromosomes[0].match(only0and1Regex) === null || parentChromosomes[1].match(only0and1Regex) === null) {
            throw new Error('Both chromosomes may only contain only 0s and 1s.');
        }
    },

    _killRandomChildren(newChildren, numRequestedChildren) {
        const numGenerated = newChildren.length;
        for (let i = 0; i < numGenerated - numRequestedChildren; ++i) {
            const randomIndexToKill = Random.integer(0, newChildren.length - 1);
            newChildren.splice(randomIndexToKill, 1);
        }
        return newChildren;
    },

    _mutate(chromosome, mutationChance) {
        let mutatedChromosome = '';
        for (let i = 0; i < chromosome.length; ++i) {
            if (Random.real(0, 0.999999) < mutationChance) {
                mutatedChromosome += chromosome[i] === '0' ? '1' : '0';
            } else {
                mutatedChromosome += chromosome[i];
            }
        }
        return mutatedChromosome;
    },

    _crossover(chromosome1, chromosome2) {
        const crossoverStartIndex = Random.integer(1, chromosome1.length - 1);
        let newChromosome1 = '';
        let newChromosome2 = '';

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
