import { randomAccnumberGenerator } from './random-accnumber-generator';

describe('randomAccnumberGenerator', () => {
  it('should return 26 length number', () => {
    expect(randomAccnumberGenerator()).toHaveLength(26);
  });
});
