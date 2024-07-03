import { getName, sumNumber } from '../src/test'

describe('Test file test.ts', () => {

  it('should have value of sum function', () => {
    expect(sumNumber(1, 1)).toEqual(2)
  });

});