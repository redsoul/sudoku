describe("SolverService - ", function () {
    'use strict';

    var SolverService;
    var BoardService;

    //mock Application to allow us to inject our own dependencies
    beforeEach(angular.mock.module('Sudoku'));
    beforeEach(angular.mock.inject(function ($rootScope, _SolverService_, _BoardService_) {
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

            //BoardService.printBoard(SolverService.getBoard());
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
        });

        it("", function () {
            SolverService.createPuzzle();
            BoardService.printBoard(SolverService.getBoard());
        });
    });
});