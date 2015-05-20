angular.module('Sudoku').controller('BoardController', ['$scope', '$rootScope', 'BoardService',

    function ($scope, $rootScope, BoardService) {
        'use strict';

        var selected = [];

        function init() {
            BoardService.initBoard();
            $rootScope.loggingEnabled = false;
            $scope.hintBoard = BoardService.getHintBoard();
            $scope.userBoard = BoardService.getUserBoard();
        }

        init();

        $scope.isSelected = function (row, column) {
            var selectedSquare = BoardService.getSelectSquare();
            return angular.isUndefined($scope.hintBoard[row][column]) && selectedSquare[0] === row && selectedSquare[1] === column;
        };

        $scope.selectSquare = function (row, column) {
            BoardService.setSelectSquare(row, column);
        }
    }
]);