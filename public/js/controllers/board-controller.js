angular.module('Sudoku').controller('BoardController', ['$scope', '$rootScope', 'BoardService',

    function ($scope, $rootScope, BoardService) {
        'use strict';

        var selected = [];

        $rootScope.loggingEnabled = false;
        $scope.hintBoard = BoardService.getHintBoard();
        $scope.userBoard = angular.array2D(9, 9);

        BoardService.initBoard();

        function reset(){
        }

        //BoardService.initBoard();
        reset();

        $scope.isSelected = function (row, column) {
            return angular.isUndefined($scope.hintBoard[row][column]) && selected[0] === row && selected[1] === column;
        };

        $scope.selectSquare = function(row, column){
            selected[0] = row;
            selected[1] = column;
        }
    }
]);