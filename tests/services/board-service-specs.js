describe("BoardService - ", function () {
    'use strict';

    var BoardService;

    //mock Application to allow us to inject our own dependencies
    beforeEach(angular.mock.module('Sudoku'));
    beforeEach(angular.mock.inject(function ($rootScope, _BoardService_) {
        BoardService = _BoardService_;
    }));

    describe("createPuzzle function - ", function () {
        it("", function () {
        });
    });
});