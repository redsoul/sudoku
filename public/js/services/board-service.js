angular.module('Sudoku').factory('BoardService', ['$rootScope', 'SolverService',

    function ($rootScope, SolverService) {
        'use strict';

        var hintBoard;
        var userBoard;
        var legalNumbersCounter=[];

        function initBoard() {
            var index;

            hintBoard = SolverService.getBoard();
            userBoard = angular.array2D(9, 9);
            createPuzzle();
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

        function createPuzzle(){
            SolverService.createPuzzle(configs.gameMode.extreme);
            hintBoard = SolverService.getBoard();
        }

        $rootScope.$on(configs.events.boardUpdate, function () {
            var indexR;
            var indexC;
            var index;

            for (index = 0; index < configs.legalNumbers.length; index++) {
                legalNumbersCounter[configs.legalNumbers[index]] = 0;
            }

            for (indexR = 0; indexR < hintBoard.length; indexR++) {
                for (indexC = 0; indexC < hintBoard[indexR].length; indexC++) {
                    if (angular.isNumber(hintBoard[indexR][indexC])) {
                        legalNumbersCounter[hintBoard[indexR][indexC]]++;
                    }
                }
            }
        });

        return {
            initBoard: initBoard,
            printBoard: printBoard,
            getHintBoard: getHintBoard,
            getUserBoard: getUserBoard,
            getLegalNumbersCounter: function(){
                return legalNumbersCounter;
            }
        };
    }
]);
