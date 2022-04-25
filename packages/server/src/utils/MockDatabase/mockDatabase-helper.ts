export class MockDatabaseHelper {
  static setBalanceAfterTransfer(
    transferType: 'incoming' | 'outgoing',
    accountBalance: number,
    transferAmount: number
  ) {
    return transferType === 'incoming'
      ? accountBalance + transferAmount
      : accountBalance - transferAmount;
  }

  static setIsCorrect(accountBalanceAfterTransfer: number) {
    return accountBalanceAfterTransfer >= 0;
  }

  static setMessage(accountBalanceAfterTransfer: number) {
    return accountBalanceAfterTransfer >= 0 ? 'ok' : 'Something went wrong';
  }

  static setAccountBalanceIfBelowZero(
    accountBalance: number,
    accountBalanceAfterTransfer: number
  ) {
    return accountBalanceAfterTransfer >= 0
      ? accountBalanceAfterTransfer
      : accountBalance;
  }
}
