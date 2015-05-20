angular.module('Sudoku').controller('TimerController', ['$scope', '$rootScope', 'TimerService',

    function ($scope, $rootScope, TimerService) {
        'use strict';

        TimerService.clear();
        TimerService.start();

    }
]);