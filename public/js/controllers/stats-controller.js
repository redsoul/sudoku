angular.module('Sudoku').controller('StatsController', ['$scope', '$rootScope', 'BoardService',

    function ($scope, $rootScope, BoardService) {
        'use strict';


        $scope.fillSquare = function (number) {
            BoardService.fillSquare(number);
            BoardService.printBoard(BoardService.getSameNumbersHighlightBoard());
            BoardService.printBoard(BoardService.getInvalidNumbersHighlightBoard());
            BoardService.printBoard(BoardService.getHighlightBoard());
        };

        function init() {
            $scope.legalNumbersCounter = BoardService.getLegalNumbersCounter();
            countLegalNumbers();
        }

        function countLegalNumbers() {
            var indexR;
            var indexC;
            var index;
            var board = BoardService.getBoard();
            for (index = 0; index < configs.legalNumbers.length; index++) {
                $scope.legalNumbersCounter[configs.legalNumbers[index]] = 0;
            }

            for (indexR = 0; indexR < board.length; indexR++) {
                for (indexC = 0; indexC < board[indexR].length; indexC++) {
                    if (angular.isNumber(board[indexR][indexC])) {
                        $scope.legalNumbersCounter[board[indexR][indexC]]++;
                    }
                }
            }
        }

        $rootScope.$on(configs.events.boardUpdate, function () {
            countLegalNumbers();
        });

        init();
    }
]);