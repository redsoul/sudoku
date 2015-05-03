angular.module('Sudoku').factory('BoardService', ['$rootScope', 'SolverService',

    function ($rootScope, SolverService) {
        'use strict';

        var hintBoard;
        var userBoard;

        function initBoard() {
            hintBoard = angular.array2D(9, 9);
            userBoard = angular.array2D(9, 9)
        }

        initBoard();

        return {
            initBoard: initBoard
        };
    }
]);
