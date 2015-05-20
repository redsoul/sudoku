angular.module('Sudoku').controller('BoardController', ['$scope', '$rootScope', 'BoardService',

    function ($scope, $rootScope, BoardService) {
        'use strict';

        function init() {
            BoardService.initBoard();
            $rootScope.loggingEnabled = false;
            $scope.hintBoard = BoardService.getHintBoard();
            $scope.userBoard = BoardService.getUserBoard();
            $scope.highlightBoard = BoardService.getHighlightBoard();
            $scope.numberHighlightBoard = BoardService.getNumberHighlightBoard();

            $scope.selectSquare(0, 0);
        }

        $scope.isSelected = function (row, column) {
            var selectedSquare = BoardService.getSelectedSquare();
            return selectedSquare[0] === row && selectedSquare[1] === column;
        };

        $scope.isHighlighted = function (row, column) {
            return $scope.highlightBoard[row][column] === 1 && angular.isUndefined($scope.hintBoard[row][column]);
        };

        $scope.isNumberHighlighted = function (row, column) {
            return $scope.numberHighlightBoard[row][column] === 1;
        };

        $scope.selectSquare = function (row, column) {
            BoardService.setSelectedSquare(row, column);
            $scope.highlightBoard = BoardService.getHighlightBoard();
            $scope.numberHighlightBoard = BoardService.getNumberHighlightBoard();
        };

        init();
    }
]);