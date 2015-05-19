describe("SolverService - ", function () {
    'use strict';

    var SolverService;
    var BoardService;
    var $scope;

    //mock Application to allow us to inject our own dependencies
    beforeEach(angular.mock.module('Sudoku'));
    beforeEach(angular.mock.inject(function ($rootScope, _SolverService_, _BoardService_) {
        $scope = $rootScope;
        SolverService = _SolverService_;
        BoardService = _BoardService_;
    }));

    describe("checkValue function - ", function () {
        beforeEach(function () {
            SolverService.init();
            SolverService.setBoardValue(0, 0, 1);
            SolverService.setBoardValue(1, 0, 7);
            SolverService.setBoardValue(2, 0, 8);
            SolverService.setBoardValue(3, 0, 9);
            SolverService.setBoardValue(4, 0, 6);
            SolverService.setBoardValue(5, 0, 3);

            SolverService.setBoardValue(0, 1, 2);
            SolverService.setBoardValue(0, 2, 3);
            SolverService.setBoardValue(0, 3, 4);
            SolverService.setBoardValue(0, 4, 5);
            SolverService.setBoardValue(0, 5, 6);
        });

        it("Check 3X3 square", function () {
            expect(SolverService.checkValue(1, 1, 6)).toBeTruthy();
            expect(SolverService.checkValue(1, 1, 7)).toBeFalsy();
        });

        it("Check row", function () {
            expect(SolverService.checkValue(0, 6, 7)).toBeTruthy();
            expect(SolverService.checkValue(0, 6, 1)).toBeFalsy();
        });

        it("Check column", function () {
            expect(SolverService.checkValue(6, 0, 2)).toBeTruthy();
            expect(SolverService.checkValue(6, 0, 3)).toBeFalsy();
        });
    });

    describe("createPuzzle function - ", function () {
        beforeEach(function () {
            SolverService.init();
            spyOn($scope, '$broadcast').andCallFake(function(){return;});
        });

        function countPuzzleHints(board) {
            var indexR;
            var indexC;
            var count = 0;

            for (indexR = 0; indexR < board.length; indexR++) {
                for (indexC = 0; indexC < board[indexR].length; indexC++) {
                    if (angular.isNumber(board[indexR][indexC])) {
                        count++;
                    }
                }
            }

            return count;
        }

        it("create puzzle - extreme mode", function () {
            SolverService.createPuzzle(configs.gameMode.extreme);
            expect(countPuzzleHints(SolverService.getBoard())).toBe(configs.gameMode.extreme);
        });

        it("create puzzle - hard mode", function () {
            SolverService.createPuzzle(configs.gameMode.hard);
            expect(countPuzzleHints(SolverService.getBoard())).toBe(configs.gameMode.hard);
        });

        it("create puzzle - medium mode", function () {
            SolverService.createPuzzle(configs.gameMode.medium);
            expect(countPuzzleHints(SolverService.getBoard())).toBe(configs.gameMode.medium);
        });

        it("create puzzle - extreme mode", function () {
            SolverService.createPuzzle(configs.gameMode.extreme);
            expect(countPuzzleHints(SolverService.getBoard())).toBe(configs.gameMode.extreme);
        });
    });

    describe("createEmptySquares function - ", function () {
        beforeEach(function () {
            SolverService.init();
        });

        it("create puzzle - extreme mode", function () {

        });
    });
});