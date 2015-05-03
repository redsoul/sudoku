angular.module('Sudoku', ['ngRoute', 'ngCookies'])
    .config(["$routeProvider",
        function ($routeProvider) {
            'use strict';
            $routeProvider.when("/", {
                templateUrl: '/js/views/board-controller.html',
                controller: 'BoardController'
            }).otherwise({
                redirectTo: "/"
            });
        }
    ]);

