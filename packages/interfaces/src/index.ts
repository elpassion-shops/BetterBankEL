export interface ITransfer {
  id?: string;
  type: 'outgoing' | 'incoming';
  date: string;
  amount: number;
  fromOrToName?: string;
}

export interface IAccountDetails {
  accountBalance: number;
  accountNumber: string;
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
  transferID: string;
  accountBalance: number;
  message: string;
}

export type IJSONData = IGetTransfersByDateRangeData | ITransfer;

export interface IBankAppAPI {
  serverUrl: string;
  postJson: (url: string, method: string, data: IJSONData) => Promise<Response>;
  getAccountDetails: () => Promise<IAccountDetails>;
  getTransfersHistory: () => Promise<ITransferHistory>;
  getTransfersByDateRange: (
    data: IGetTransfersByDateRangeData
  ) => Promise<ITransferHistory>;
  sendTransfer: (data: ITransfer) => Promise<ISendTransferResponse>;
}
