
const functions = require("./reorganize.js");

test('increase one',() => {
    const input = ["1","2","3","4"];
    const expected = ['2','3','4','1'];
   expect(functions.shiftUp(input)).toStrictEqual(expected); 
});

test('decrease one',() => {
    const input = ["1","2","3","4"];
    const expected = ["4","1","2","3"];
   expect(functions.shiftDown(input)).toStrictEqual(expected); 
});

test('only one shifted up', () => {
    const input = ["1"];
    const expected = ["1"];
    expect(functions.shiftUp(input)).toStrictEqual(expected); 
});

test('only one shifted down', () => {
    const input = ["1"];
    const expected = ["1"];
    expect(functions.shiftDown(input)).toStrictEqual(expected); 
});

test('empty shifted down', () => {
    const input = [];
    const expected = [];
    expect(functions.shiftDown(input)).toStrictEqual(expected); 
});

test('empty shifted up', () => {
    const input = [];
    const expected = [];
    expect(functions.shiftUp(input)).toStrictEqual(expected); 
});

