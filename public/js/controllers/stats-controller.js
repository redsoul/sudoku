angular.module('Sudoku').controller('StatsController', ['$scope', '$rootScope', 'BoardService',

    function ($scope, $rootScope, BoardService) {
        'use strict';

        $scope.legalNumbersCounter = BoardService.getLegalNumbersCounter();
    }
]);