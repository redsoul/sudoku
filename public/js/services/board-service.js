angular.module('Sudoku').factory('BoardService', ['$rootScope', 'SolverService',

    function ($rootScope, SolverService) {
        'use strict';

        var hintBoard;
        var userBoard;
        var legalNumbersCounter = [];
        var selectedSquare = [];
        var highlightBoard = angular.array2D(9, 9);
        var sameNumbersHighlightBoard = angular.array2D(9, 9);
        var invalidNumbersHighlightBoard = angular.array2D(9, 9);

        function initBoard(mode){
            hintBoard = SolverService.getBoard();
            userBoard = angular.array2D(9, 9);
            createPuzzle(mode);
            printBoard(hintBoard);

            invalidNumbersHighlightBoard = angular.array2D(9, 9);
            sameNumbersHighlightBoard = angular.array2D(9, 9);
            highlightBoard = angular.array2D(9, 9);
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

        function createPuzzle(mode) {
            SolverService.createPuzzle(mode);
            hintBoard = SolverService.getBoard();
        }

        function setSelectedSquare(row, column) {
            selectedSquare[0] = row;
            selectedSquare[1] = column;

            invalidNumbersHighlightBoard = angular.array2D(9, 9);

            highlight(row, column);
        }

        function getSelectedSquare() {
            return selectedSquare;
        }

        function _setBoardValue(row, column, value) {
            userBoard[row][column] = value;
            $rootScope.$broadcast(configs.events.boardUpdate);
        }

        function _highlightSameNumber(board, row, column) {
            var indexR;
            var indexC;
            var number = board[row][column];

            if (!angular.isUndefined(number)) {
                for (indexR = 0; indexR < 9; indexR++) {
                    for (indexC = 0; indexC < 9; indexC++) {
                        if (hintBoard[indexR][indexC] === number || userBoard[indexR][indexC] === number) {
                            sameNumbersHighlightBoard[indexR][indexC] = 1;
                        }
                    }
                }
            }
        }

        function highlight(row, column) {
            var index;
            var indexR;
            var indexC;
            var squareSize = 3;
            var columnCorner = 0;
            var rowCorner = 0;

            selectedSquare[0] = row;
            selectedSquare[1] = column;

            highlightBoard = angular.array2D(9, 9);
            sameNumbersHighlightBoard = angular.array2D(9, 9);

            //highlight same row
            for (index = 0; index < 9; index++) {
                highlightBoard[row][index] = 1;
            }

            //highlight same column
            for (index = 0; index < 9; index++) {
                highlightBoard[index][column] = 1;
            }


            //highlight same 3x3 square

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

            //highlight same numbers
            _highlightSameNumber(hintBoard, row, column);
            _highlightSameNumber(userBoard, row, column);
        }

        function validateNumber(row, column, number) {
            var indexR;
            var indexC;
            var squareSize = 3;
            var columnCorner = 0;
            var rowCorner = 0;
            var valid = true;

            invalidNumbersHighlightBoard = angular.array2D(9, 9);

            for (indexC = 0; indexC < 9; indexC++) {
                if (hintBoard[row][indexC] === number || userBoard[row][indexC] === number) {
                    invalidNumbersHighlightBoard[row][indexC] = 1;
                    valid = false;
                }
            }

            for (indexR = 0; indexR < 9; indexR++) {
                if (hintBoard[indexR][column] === number || userBoard[indexR][column] === number) {
                    invalidNumbersHighlightBoard[indexR][column] = 1;
                    valid = false;
                }
            }

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
                    if (hintBoard[indexR][indexC] === number || userBoard[indexR][indexC] === number) {
                        invalidNumbersHighlightBoard[indexR][indexC] = 1;
                        valid = false;
                    }
                }
            }

            return valid;
        }

        function fillSquare(number) {
            var selectedSquare = getSelectedSquare();
            if (!angular.isUndefined(selectedSquare[0]) && !angular.isUndefined(selectedSquare[1])) {
                if (validateNumber(selectedSquare[0], selectedSquare[1], number)) {
                    _setBoardValue(selectedSquare[0], selectedSquare[1], number);
                    highlight(selectedSquare[0], selectedSquare[1]);
                }

                $rootScope.$broadcast(configs.events.highlightBoardUpdate);
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
                    if (angular.isNumber(hintBoard[indexR][indexC]) || angular.isNumber(userBoard[indexR][indexC])) {
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
            setBoardValue: _setBoardValue,
            fillSquare: fillSquare,
            highlight: highlight,
            getLegalNumbersCounter: function () {
                return legalNumbersCounter;
            },
            getHighlightBoard: function () {
                return highlightBoard;
            },
            getSameNumbersHighlightBoard: function () {
                return sameNumbersHighlightBoard;
            },
            getInvalidNumbersHighlightBoard: function () {
                return invalidNumbersHighlightBoard;
            }
        };
    }]);
