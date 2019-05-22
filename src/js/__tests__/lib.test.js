import {calculate} from "../lib.js";


 test('it should calculate bonus', () => {
     const a = 10;
     const b = 20;

     const expected = 30;

     const result = calculate(a, b);

     expect(result).toBe(expected);
});

