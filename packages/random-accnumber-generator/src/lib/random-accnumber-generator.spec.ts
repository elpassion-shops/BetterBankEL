import { AccountGenerator } from './account-generator';

describe('randomAccnumberGenerator', () => {
  it('should return 26 length number', () => {
    expect(AccountGenerator.generateRandomNumber()).toHaveLength(26);
  });
});
