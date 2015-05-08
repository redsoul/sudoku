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

        function getEmptySquares(targetBoard){
            var indexC;
            var indexR;
            var emptySquares = [];
            for (indexR = 0; indexR < targetBoard.length; indexR++) {
                for (indexC = 0; indexC < targetBoard[indexR].length; indexC++) {
                    if(angular.isUndefined(targetBoard[indexR][indexC])){
                        emptySquares.push([indexR, indexC]);
                    }
                }
            }
            return emptySquares;
        }

        function createPuzzle() {
            var indexC;
            var indexR;
            var inc;
            var limit = board.length;
            var value = 1;
            var found = false;
            var attempts = 0;
            var squareAttempts;
            var columnCorner = 0;
            var squareSize = 3;
            var index;

            //fill the first column
            _shuffleValues();
            for (indexR = 0; indexR < board.length; indexR++) {
                board[0][indexR] = _randNumber(indexR);
            }

            for (indexR = 1; indexR < board.length; indexR++) {
                _shuffleValues();
                inc = 0;
                squareAttempts = 0;
                for (indexC = 0; indexC < board[indexR].length; indexC++) {
                    found = false;
                    attempts = 0;
                    columnCorner = 0;
                    while (!found && inc < limit) {
                        value = _randNumber();

                        if (checkValue(indexR, indexC, value)) {
                            board[indexR][indexC] = value;
                            found = true;
                            inc++;
                        }
                        else {
                            legalNums.unshift(value);
                            attempts++;

                            if (attempts > 0 && attempts >= legalNums.length) {
                                // Find the left-most column
                                if (squareAttempts < 3) {
                                    while (indexC >= columnCorner + squareSize) {
                                        columnCorner += squareSize;
                                    }
                                }
                                else {
                                    columnCorner = 0;
                                    squareAttempts = 0;
                                }


                                for (index = indexC; index >= columnCorner; index--) {
                                    indexC = 8 - legalNums.length;
                                    inc--;
                                    attempts = 0;

                                    if (indexC < 0) {
                                        indexC = board[indexR].length - 1;
                                        indexR--;
                                        inc = 0;
                                    }

                                    legalNums.unshift(board[indexR][indexC]);
                                    delete board[indexR][indexC];
                                }

                                _shuffleValues(legalNums);
                                found = true;
                                indexC = indexC > 0 ? indexC - 1 : 0;
                                squareAttempts++;
                            }
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
