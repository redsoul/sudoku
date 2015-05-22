angular.module('Sudoku').controller('MenuController', ['$scope', '$rootScope', 'BoardService', 'TimerService',

    function ($scope, $rootScope, BoardService, TimerService) {
        'use strict';

        function newGame(){
            BoardService.initBoard(configs.gameMode.medium);
            TimerService.reset();
        }

        function getHint(){}

        $scope.items = [
            ['New Game', newGame],
            ['Get Hint', getHint]
        ];
    }
]);