angular.module('Sudoku').factory('SolverService', [

    function () {
        'use strict';

        var board = angular.array2D(9, 9);
        var legalNums = [1, 2, 3, 4, 5, 6, 7, 8, 9];

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

            for(indexR=rowCorner; indexR<=rowCorner + squareSize; indexR++){
                for(indexC=columnCorner; indexC<=columnCorner + squareSize; indexC++){
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

        function _shuffleValues() {
            legalNums = _shuffle(legalNums);
        }

        function _randNumber(index) {
            return legalNums[index];
        }

        function createPuzzle() {
            var indexC;
            var indexR;
            var inc = 0;
            var limit = board.length;
            var value = 1;
            var found = false;

            //fill the first column
            _shuffleValues();
            for (indexR = 0; indexR < board.length; indexR++) {
                board[0][indexR] = _randNumber(indexR);
            }

            for (indexC = 0; indexC <= board.length; indexC++) {
                _shuffleValues();
                for (indexR = 1; indexR <= board.length; indexR++) {
                    found = false;
                    while (!found && inc < limit) {
                        value = _randNumber(inc);
                        console.log(indexR, indexC, value);
                        if (checkValue(indexR, indexC, value)) {
                            board[indexR][indexC] = value;
                            found = true;
                        }
                        inc++;
                    }
                }
            }
            debugger;
        }

        return {
            createPuzzle: createPuzzle
        };
    }

])
;
