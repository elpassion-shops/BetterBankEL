import { randomAccnumberGenerator } from './random-accnumber-generator';

describe('randomAccnumberGenerator', () => {
  it('should return any number', () => {
    expect(randomAccnumberGenerator()).toEqual('49102028922276300500000000');
  });
});
