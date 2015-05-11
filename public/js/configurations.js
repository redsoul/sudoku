/* exported configs */
var configs = (function () {
    'use strict';

    return {
        totalSquares: 81,
        legalNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        gameMode: {
            easy: 36,
            medium: 32,
            hard: 28,
            extreme: 26
        },
        events: {
            boardUpdate: 'boardUpdate'
        }
    };
}());
