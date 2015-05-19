angular.module('Sudoku', ['ngRoute', 'ngCookies'])
    .config(["$routeProvider",
        function ($routeProvider) {
            'use strict';

            $routeProvider.when("/", {
                templateUrl: '/js/views/game-controller.html',
                controller: 'GameController'
            }).otherwise({
                redirectTo: "/"
            });
        }
    ]);

