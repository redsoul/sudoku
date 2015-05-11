angular.module('Sudoku').controller('StatsController', ['$scope', '$rootScope', 'BoardService',

    function ($scope, $rootScope, BoardService) {
        'use strict';


        $scope.hintBoard = BoardService.getHintBoard();
        $scope.userBoard = angular.array2D(9, 9);

        $scope.legalNumbersCounter = BoardService.getLegalNumbersCounter();
    }
]);