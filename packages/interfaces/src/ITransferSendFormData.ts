export interface ITransferSendFormData {
  receiverAddress: string;
  receiverBankAccountNumber: string;
  receiverName: string;
  senderBankAccountNumber: string;
  transferAmount: number;
  transferDate: Date;
  transferTitle: string;
}
