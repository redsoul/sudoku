describe("Extensions - ", function () {
    'use strict';

    describe("Array clone - ", function () {
        it("clone 1 dimension array", function () {
            var testArr = [1,2,3];
            var cloneArr = testArr.clone();
            testArr[0] = 4;

            expect(testArr[0]).toBe(4);
            expect(cloneArr[0]).toBe(1);
        });

        it("clone 2 dimensions array", function () {
            var testArr = [[1,2,3],[4,5,6]];
            var cloneArr = testArr.clone();
            testArr[0][0] = 4;

            expect(testArr[0][0]).toBe(4);
            expect(cloneArr[0][0]).toBe(1);
        });
    });

    describe("Array sortBy - ", function () {
        var testArr = [];

        beforeEach(function () {
            testArr.push({prop1: 1, prop2: 'a'});
            testArr.push({prop1: 2, prop2: 'b'});
            testArr.push({prop1: 3, prop2: 'c'});
        });

        it("Sort by numeric property descending", function () {
            var newArr = testArr.clone();

            expect(newArr[0].prop1).toBe(1);
            expect(newArr[0].prop2).toBe('a');
            newArr.sortBy('-prop1');
            expect(newArr[0].prop1).toBe(3);
            expect(newArr[0].prop2).toBe('c');
        });

        it("Sort by numeric property ascending", function () {
            var newArr = testArr.clone();

            expect(newArr[0].prop1).toBe(1);
            expect(newArr[0].prop2).toBe('a');
            newArr.sortBy('prop1');
            expect(newArr[0].prop1).toBe(1);
            expect(newArr[0].prop2).toBe('a');
        });

        it("Sort by string property descending", function () {
            var newArr = testArr.clone();

            expect(newArr[0].prop1).toBe(1);
            expect(newArr[0].prop2).toBe('a');
            newArr.sortBy('-prop2');
            expect(newArr[0].prop1).toBe(3);
            expect(newArr[0].prop2).toBe('c');
        });

        it("Sort by string property ascending", function () {
            var newArr = testArr.clone();

            expect(newArr[0].prop1).toBe(1);
            expect(newArr[0].prop2).toBe('a');
            newArr.sortBy('prop2');
            expect(newArr[0].prop1).toBe(1);
            expect(newArr[0].prop2).toBe('a');
        });

    });
});