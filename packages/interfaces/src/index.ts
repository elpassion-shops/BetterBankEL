export * from './ITransferSendFormData';

export interface ITransfer {
  id?: number;
  created_at?: string;
  updated_at?: string;
  amount: number;
  title: string;
  address?: string;
  sender?: string;
  senderIBAN?: string;
  receiver: string;
  receiverIBAN: string;
}

export interface IAccountDetails {
  email?: string;
  accountBalance: number;
  accountNumber: string;
  createdAt?: string;
  updatedAt?: string;
}

export type ITransferHistory = ITransfer[];

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
