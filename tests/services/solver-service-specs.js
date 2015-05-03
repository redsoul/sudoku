describe("SolverService - ", function () {
    'use strict';

    var SolverService;

    //mock Application to allow us to inject our own dependencies
    beforeEach(angular.mock.module('Sudoku'));
    beforeEach(angular.mock.inject(function ($rootScope, _SolverService_) {
        SolverService = _SolverService_;
    }));

    describe("createPuzzle function - ", function () {
        it("", function () {
            debugger;
            SolverService.createPuzzle();
        });
    });
});