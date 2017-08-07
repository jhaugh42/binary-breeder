'use strict';

module.exports = {
    real() {
        return Math.random();
    },
    integer(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
};
