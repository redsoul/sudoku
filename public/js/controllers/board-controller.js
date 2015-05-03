angular.module('Sudoku').controller('BoardController', ['$scope', '$rootScope',

    function ($scope, $rootScope) {
        'use strict';

        //var boardModel = BoardService.getBoard();
        var selected = [];

        $rootScope.loggingEnabled = false;
        $scope.hintBoard = angular.array2D(9, 9);
        $scope.hintBoard[4][4]=1;
        $scope.userBoard = angular.array2D(9, 9);
        $scope.userBoard[3][3]=2;

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