angular.module('Sudoku').factory('SolverService', [

    function () {
        'use strict';

        var board = angular.array2D(9, 9);
        var legalNums = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        function checkRow(row, value) {
            var index;
            for(index=0; index<board[row].length; index++){
                if(board[row][index] === value){
                    return false;
                }
            }
            return true;
        }

        function checkColumn(column, value) {
            var index;
            for(index=0; index<board.length; index++){
                if(board[index][column] === value){
                    return false;
                }
            }
            return true;
        }

        function checkSection(row, column, value) {
            // Save the upper left corner
            var columnCorner = 0,
                rowCorner = 0,
                squareSize = 3;

            // Find the left-most column
            while(column >= columnCorner + squareSize) {
                columnCorner += squareSize;
            }

            // Find the upper-most row
            while(row >= rowCorner + squareSize) {
                rowCorner += squareSize;
            }
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
            for (indexC = 0; indexC < board.length; indexC++) {
                board[0][indexC] = _randNumber(indexC);
            }

            for (indexC = 1; indexC <= board.length; indexC++) {
                _shuffleValues();
                for (indexR = 0; indexR <= board.length; indexR++) {

                    while (!found && inc < limit) {
                        value = _randNumber(inc);
                        if (checkValue(indexR, indexC, value)) {
                            board[indexR][indexC] = value;
                            found = true;
                        }
                        else {
                            inc++;
                        }
                    }
                }
            }
        }

        return {
            createPuzzle: createPuzzle
        };
    }

])
;
