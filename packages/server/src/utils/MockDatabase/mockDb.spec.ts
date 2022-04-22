class MockDataBase {}

describe('MockDataBase', () => {
  let mockDb: MockDataBase;

  beforeEach(() => {
    mockDb = new MockDataBase();
  });
  it('should create new instance of class', () => {
    expect(mockDb).toBeTruthy;
  });
});
