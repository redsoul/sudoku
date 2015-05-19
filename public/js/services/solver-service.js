angular.module('Sudoku').factory('SolverService', ['$rootScope',


    function ($rootScope) {
        'use strict';

        var board;
        var legalNumbers;

        function init() {
            board = angular.array2D(9, 9);
            initLegalNumbers();
        }

        function initLegalNumbers() {
            legalNumbers = configs.legalNumbers.clone();
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
            if(min === null){
                throw "_random - required min parameter";
            }
            if (angular.isUndefined(max)) {
                max = min;
                min = 0;
            }
            return min + Math.floor(Math.random() * (max - min + 1));
        }

        function _shuffleValues(obj) {
            if (obj) {
                legalNumbers = obj;
            }
            else {
                initLegalNumbers();
            }

            legalNumbers = _shuffle(legalNumbers);
        }

        function _randNumber() {
            return legalNumbers.pop();
        }

        function setBoardValue(row, column, value) {
            board[row][column] = value
        }

        function getEmptySquares(targetBoard) {
            var indexC;
            var indexR;
            var emptySquares = [];
            for (indexR = 0; indexR < targetBoard.length; indexR++) {
                for (indexC = 0; indexC < targetBoard[indexR].length; indexC++) {
                    if (angular.isUndefined(targetBoard[indexR][indexC])) {
                        emptySquares.push([indexR, indexC]);
                    }
                }
            }
            return emptySquares;
        }

        function _createPuzzle() {
            var inc;
            var limit = board.length;
            var value = 1;
            var found = false;
            var attempts = 0;
            var index;
            var breakpoint = 0;
            var attemptIndex;
            var emptySquares;
            var square;
            var row;
            var column;

            //fill the first column
            _shuffleValues();
            for (row = 0; row < board.length; row++) {
                board[0][row] = _randNumber();
            }

            emptySquares = getEmptySquares(board);

            for (index = 0; index < emptySquares.length;) {
                square = emptySquares[index];
                row = square[0];
                column = square[1];
                _shuffleValues();
                value = _randNumber();
                found = false;
                inc = 0;
                attempts = Math.min(attempts, limit);

                if (index > breakpoint) {
                    attempts = 0;
                }

                while (!found && inc < limit) {
                    if (checkValue(row, column, value)) {
                        board[row][column] = value;
                        found = true;
                        index++
                    }
                    else {
                        inc++;
                        value = _randNumber();
                    }
                }

                if (!found) {
                    if (attempts === 0) {
                        breakpoint = index;
                    }

                    attempts++;
                    for (attemptIndex = 0; attemptIndex < attempts; attemptIndex++) {
                        if (index > 0) {
                            index--;
                            delete board[emptySquares[index][0]][emptySquares[index][1]];
                        }
                    }
                }
            }
        }

        function createEmptySquares(num) {
            var index;
            var row;
            var column;

            for (index = 0; index < num;) {
                row = _random(0, 8);
                column = _random(0, 8);
                console.log(index, row, column, board[row][column]);
                if (!angular.isUndefined(board[row][column])) {
                    board[row][column] = undefined;
                    index++;
                }
                else{
                    debugger;
                }
            }
            console.log('--------------------');
        }

        function createPuzzle(mode) {
            _createPuzzle();
            //console.log('_createPuzzle', board);
            createEmptySquares(configs.totalSquares - mode);
            //createEmptySquares(4);
            //console.log('createEmptySquares', board);
            $rootScope.$broadcast(configs.events.boardUpdate);
        }

        init();

        return {
            init: init,
            setBoard: function(_board){
                board = _board;
            },
            setBoardValue: setBoardValue,
            checkRow: checkRow,
            checkColumn: checkColumn,
            checkSection: checkSection,
            checkValue: checkValue,
            createPuzzle: createPuzzle,
            createEmptySquares: createEmptySquares,
            getBoard: function () {
                return board;
            }
        };
    }
]);
