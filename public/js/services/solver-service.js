angular.module('Sudoku').factory('SolverService', [

    function () {
        'use strict';

        var board;
        var legalNums;

        function init() {
            board = angular.array2D(9, 9);
            initLegalNums();
        }

        function initLegalNums() {
            legalNums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        }

        function checkRow(row, value) {
            var index;
            for (index = 0; index < board[row].length; index++) {
                if (board[row][index] === value) {
                    return false;
                }
            }
            return true;
        }

        function checkColumn(column, value) {
            var index;
            for (index = 0; index < board.length; index++) {
                if (board[index][column] === value) {
                    return false;
                }
            }
            return true;
        }

        function checkSection(row, column, value) {
            // Save the upper left corner
            var columnCorner = 0;
            var rowCorner = 0;
            var squareSize = 3;
            var indexR;
            var indexC;

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
                    if (board[indexR][indexC] === value) {
                        return false;
                    }
                }
            }
            return true;
        }

        function checkValue(row, column, value) {
            if (checkRow(row, value) &&
                checkColumn(column, value) &&
                checkSection(row, column, value)) {
                return true;
            } else {
                return false;
            }
        }

        function _shuffle(obj) {
            var rand;
            var index = 0;
            var shuffled = [];

            angular.forEach(obj, function (value) {
                rand = _random(index++);
                shuffled[index - 1] = shuffled[rand];
                shuffled[rand] = value;
            });
            return shuffled;
        }

        function _random(min, max) {
            if (max == null) {
                max = min;
                min = 0;
            }
            return min + Math.floor(Math.random() * (max - min + 1));
        }

        function _shuffleValues(obj) {
            if (obj) {
                legalNums = obj;
            }
            else {
                initLegalNums();
            }

            legalNums = _shuffle(legalNums);
        }

        function _randNumber() {
            return legalNums.pop();
        }

        function setBoardValue(row, column, value) {
            board[row][column] = value
        }

        function createPuzzle() {
            var indexC;
            var indexR;
            var inc;
            var limit = board.length;
            var value = 1;
            var found = false;
            var attempts = 0;

            //fill the first column
            _shuffleValues();
            for (indexR = 0; indexR < board.length; indexR++) {
                board[0][indexR] = _randNumber(indexR);
            }

            debugger;
            for (indexR = 1; indexR < board.length; indexR++) {
                _shuffleValues();
                inc = 0;
                debugger;
                for (indexC = 0; indexC < board[indexR].length; indexC++) {
                    found = false;
                    attempts = 0;
                    debugger;
                    while (!found && inc < limit) {
                        value = _randNumber();

                        if (checkValue(indexR, indexC, value)) {
                            board[indexR][indexC] = value;
                            found = true;
                            inc++;
                        }
                        else {
                            legalNums.unshift(value);
                            _shuffleValues(legalNums);
                            attempts++;
                        }

                        if (attempts > 3 && indexC > 0) {
                            delete board[indexR][indexC - 1];
                            indexC--;
                            inc--;
                            attempts = 0;
                        }
                        inc++;
                    }
                }
            }
            debugger;
        }

        init();

        return {
            init: init,
            setBoardValue: setBoardValue,
            checkRow: checkRow,
            checkColumn: checkColumn,
            checkSection: checkSection,
            checkValue: checkValue,
            createPuzzle: createPuzzle,
            getBoard: function () {
                return board;
            }
        };
    }

])
;
