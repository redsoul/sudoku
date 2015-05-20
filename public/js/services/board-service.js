angular.module('Sudoku').factory('BoardService', ['$rootScope', 'SolverService',

    function ($rootScope, SolverService) {
        'use strict';

        var hintBoard;
        var userBoard;
        var legalNumbersCounter = [];
        var selectedSquare = [];
        var highlightBoard = angular.array2D(9, 9);
        var numberHighlightBoard = angular.array2D(9, 9);

        function initBoard() {
            userBoard = angular.array2D(9, 9);
            hintBoard = SolverService.getBoard();
            createPuzzle();
            printBoard(hintBoard);
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

        function createPuzzle() {
            SolverService.createPuzzle(configs.gameMode.medium);
            hintBoard = SolverService.getBoard();
        }

        function setSelectedSquare(row, column) {
            selectedSquare[0] = row;
            selectedSquare[1] = column;

            clearHighlightBoards();
            highlightRow(row);
            highlightColumn(column);
            highlight3x3square(row, column);

            if (!angular.isUndefined(hintBoard[row][column])) {
                highlightNumbers(hintBoard[row][column]);
            }
        }

        function getSelectedSquare() {
            return selectedSquare;
        }

        function setBoardValue(row, column, value) {
            userBoard[row][column] = value;
            $rootScope.$broadcast(configs.events.boardUpdate);
        }

        function clearHighlightBoards() {
            highlightBoard = angular.array2D(9, 9);
            numberHighlightBoard = angular.array2D(9, 9);
        }

        function highlightRow(row) {
            var index;
            for (index = 0; index < 9; index++) {
                highlightBoard[row][index] = 1;
            }
        }

        function highlightColumn(column) {
            var index;
            for (index = 0; index < 9; index++) {
                highlightBoard[index][column] = 1;
            }
        }

        function highlight3x3square(row, column) {
            var indexR;
            var indexC;
            var squareSize = 3;
            var columnCorner = 0;
            var rowCorner = 0;

            // Find the left-most column
            while (column >= columnCorner + squareSize) {
                columnCorner += squareSize;
            }

            // Find the upper-most row
            while (row >= rowCorner + squareSize) {
                rowCorner += squareSize;
            }

            for (indexR = rowCorner; indexR < rowCorner + squareSize; indexR++) {
                for (indexC = columnCorner; indexC < columnCorner + squareSize; indexC++) {
                    highlightBoard[indexR][indexC] = 1;
                }
            }
        }

        function highlightNumbers(number) {
            var indexR;
            var indexC;

            for (indexR = 0; indexR < 9; indexR++) {
                for (indexC = 0; indexC < 9; indexC++) {
                    if (hintBoard[indexR][indexC] === number) {
                        numberHighlightBoard[indexR][indexC] = 1;
                    }
                }
            }
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
            setSelectedSquare: setSelectedSquare,
            getSelectedSquare: getSelectedSquare,
            setBoardValue: setBoardValue,
            clearHighlightBoards: clearHighlightBoards,
            highlightRow: highlightRow,
            highlightColumn: highlightColumn,
            highlight3x3square: highlight3x3square,
            highlightNumbers: highlightNumbers,
            getLegalNumbersCounter: function () {
                return legalNumbersCounter;
            },
            getHighlightBoard: function () {
                return highlightBoard;
            },
            getNumberHighlightBoard: function () {
                return numberHighlightBoard;
            }
        };
    }
]);
