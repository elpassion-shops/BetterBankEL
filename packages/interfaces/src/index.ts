export interface ITransfer {
  id?: string;
  type: 'outgoing' | 'incoming';
  date: string;
  amount: number;
  fromOrToName?: string;
}

export interface IAccountDetails {
  accountBalance: number;
  accountNumber: number;
}

export interface ITransferHistory {
  transfers: ITransfer[];
}

export interface IGetTransfersByDateRangeData {
  from: string;
  to: string;
}

export interface ISendTransferResponse {
  isCorrect: boolean;
  transferID: number;
  accountBalance: number;
  message: string;
}

export interface IBankAppInterface {
  getAccountDetails(): () => Promise<IAccountDetails>;
  getTransfersHistory(): () => Promise<ITransferHistory>;
  getTransfersByDateRange(): (
    data: IGetTransfersByDateRangeData
  ) => Promise<ITransferHistory>;
  sendTransfer(): (data: ITransfer) => Promise<ISendTransferResponse>;
}
