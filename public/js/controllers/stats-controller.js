angular.module('Sudoku').controller('StatsController', ['$scope', '$rootScope', 'BoardService',

    function ($scope, $rootScope, BoardService) {
        'use strict';

        $scope.legalNumbersCounter = BoardService.getLegalNumbersCounter();

        $scope.fillSquare = function (number) {
            BoardService.fillSquare(number);
            BoardService.printBoard(BoardService.getSameNumbersHighlightBoard());
            BoardService.printBoard(BoardService.getInvalidNumbersHighlightBoard());
            BoardService.printBoard(BoardService.getHighlightBoard());
        };
    }
]);