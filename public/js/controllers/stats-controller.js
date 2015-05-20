angular.module('Sudoku').controller('StatsController', ['$scope', '$rootScope', 'BoardService',

    function ($scope, $rootScope, BoardService) {
        'use strict';

        $scope.legalNumbersCounter = BoardService.getLegalNumbersCounter();

        $scope.fillSquare = function (number) {
            var selectedSquare = BoardService.getSelectSquare();
            if (!angular.isUndefined(selectedSquare[0]) && !angular.isUndefined(selectedSquare[1])) {
                BoardService.setBoardValue(selectedSquare[0], selectedSquare[1], number);
            }
        };
    }
]);