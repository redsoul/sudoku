angular.module('Sudoku').factory('BoardService', ['$rootScope', 'SolverService',

    function ($rootScope, SolverService) {
        'use strict';

        var hintBoard;
        var userBoard;

        function initBoard() {
            hintBoard = SolverService.getBoard();
            userBoard = angular.array2D(9, 9);
        }

        function getHintBoard() {
            return hintBoard;
        }

        function getUserBoard() {
            return userBoard;
        }

        function printBoard(board) {
            var column;
            var row;
            var line;

            console.log("\nBoard:\n");
            for (row = 0; row < board.length; row++) {
                line = (row + 1) + ' | ';
                for (column = 0; column < board[row].length; column++) {
                    if (!isNaN(board[row][column])) {
                        line += (" " + board[row][column] + " ");
                    }
                    else {
                        line += " - ";
                    }
                }
                console.log(line);
            }

            console.log("   ----------------------------");
            line = '    ';
            for (row = 0; row < board.length; row++) {
                line += (" " + (row + 1) + " ");
            }
            console.log(line);
        }

        initBoard();

        return {
            initBoard: initBoard,
            printBoard: printBoard,
            getHintBoard: getHintBoard,
            getUserBoard: getUserBoard
        };
    }
]);
