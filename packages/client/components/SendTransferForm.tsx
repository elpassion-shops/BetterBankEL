import { ISendTransferResponse, ITransfer } from '@bank-el/interfaces';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import 'tailwindcss/tailwind.css';
import { BankAppApiContext } from '../pages';
import Modal from './Modal';

export interface ITransferFormData {
  receiverAddress: string;
  receiverBankAccountNumber: string;
  recipientName: string;
  senderBankAccountNumber: string;
  transferAmount: number;
  transferDate: Date;
  transferTitle: string;
}

export default function SendTransfer() {
  const { BankAppAPI } = useContext(BankAppApiContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sendTranferResponse, setSendTranferResponse] =
    useState<ISendTransferResponse | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: ITransferFormData) => {
    console.log(data);

    const transferData: ITransfer = {
      type: 'outgoing',
      date: (data.transferDate && data.transferDate.toString()) || '',
      amount: data.transferAmount,
      title: data.transferTitle,
      address: data.receiverAddress || '',
      fromOrToName: data.recipientName,
      accountId: 1,
    };

    BankAppAPI.sendTransfer(transferData).then((data) => {
      setSendTranferResponse(data);
    });

    reset();
  };

  return (
    <div className="bg-white	p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col overflow-hidden relative z-0 "
      >
        <div className="relative z-0 outline w-full mb-5 px-2 pl-4 pt-4 border border-b-2 rounded-[2px] border-b-gray-400 focus-within:border-blue-500">
          <input
            type="text"
            name="recipientName"
            id="recipientName"
            placeholder=" "
            className=" text-gray-800 pt-2 pb-2 block w-full px-0 mt-0 bg-transparent border-0 appearance-none focus:outline-none focus:ring-0"
            {...register('recipientName', {})}
          />
          <label
            htmlFor="recipientName"
            className="absolute duration-300 top-4 -z-1 origin-0 text-gray-500 text-lg"
          >
            Recipient
          </label>
        </div>

        <div className="relative z-0 outline w-full mb-5 px-2 pl-4 pt-4 border border-b-2 rounded-[2px] border-b-gray-400 focus-within:border-blue-500">
          <input
            type="number"
            name="senderBankAccountNumber"
            id="senderBankAccountNumber"
            placeholder=" "
            className=" text-gray-800 pt-2 pb-2 block w-full px-0 mt-0 bg-transparent border-0 appearance-none focus:outline-none focus:ring-0"
            {...register('senderBankAccountNumber', {})}
          />
          <label
            htmlFor="senderBankAccountNumber"
            className="absolute duration-300 top-4 -z-1 origin-0 text-gray-500 text-lg"
          >
            From account
          </label>
        </div>

        <div className="relative z-0 outline w-full mb-5 px-2 pl-4 pt-4 border border-b-2 rounded-[2px] border-b-gray-400 focus-within:border-blue-500">
          <input
            type="text"
            name="receiverAddress"
            id="receiverAddress"
            placeholder=" "
            className=" text-gray-800 pt-2 pb-2 block w-full px-0 mt-0 bg-transparent border-0 appearance-none focus:outline-none focus:ring-0"
            {...register('receiverAddress', {})}
          />
          <label
            htmlFor="receiverAddress"
            className="absolute duration-300 top-4 -z-1 origin-0 text-gray-500 text-lg"
          >
            Enter address (optional)
          </label>
        </div>

        <div className="relative z-0 outline w-full mb-5 px-2 pl-4 pt-4 border border-b-2 rounded-[2px] border-b-gray-400 focus-within:border-blue-500">
          <input
            type="text"
            name="receiverBankAccountNumber"
            id="receiverBankAccountNumber"
            placeholder=" "
            className=" text-gray-800 pt-2 pb-2 block w-full px-0 mt-0 bg-transparent border-0 appearance-none focus:outline-none focus:ring-0"
            {...register('receiverBankAccountNumber', {})}
          />
          <label
            htmlFor="receiverBankAccountNumber"
            className="absolute duration-300 top-4 -z-1 origin-0 text-gray-500 text-lg"
          >
            To account number
          </label>
        </div>

        <div className="relative z-0 outline w-full mb-5 px-2 pl-4 pt-4 border border-b-2 rounded-[2px] border-b-gray-400 focus-within:border-blue-500">
          <input
            type="date"
            name="transferDate"
            id="transferDate"
            placeholder=" "
            className=" text-gray-800 pt-2 pb-2 block w-full px-0 mt-0 bg-transparent border-0 appearance-none focus:outline-none focus:ring-0"
            {...register('transferDate', {})}
          />
          <label
            htmlFor="transferDate"
            className="absolute duration-300 top-4 -z-1 origin-0 text-gray-500 text-lg"
          >
            Transfer date
          </label>
        </div>

        <div className="relative z-0 outline w-full mb-5 px-2 pl-4 pt-4 border border-b-2 rounded-[2px] border-b-gray-400 focus-within:border-blue-500">
          <input
            type="text"
            name="transferTitle"
            id="transferTitle"
            placeholder=" "
            className=" text-gray-800 pt-2 pb-2 block w-full px-0 mt-0 bg-transparent border-0 appearance-none focus:outline-none focus:ring-0"
            {...register('transferTitle', {})}
          />
          <label
            htmlFor="transferTitle"
            className="absolute duration-300 top-4 -z-1 origin-0 text-gray-500 text-lg"
          >
            Transfer title
          </label>
        </div>

        <div className="relative z-0 outline w-full mb-5 px-2 pl-4 pt-4 border border-b-2 rounded-[2px] border-b-gray-400 focus-within:border-blue-500">
          <input
            type="number"
            name="transferAmount"
            id="transferAmount"
            placeholder=" "
            className=" text-gray-800 pt-2 pb-2 block w-full px-0 mt-0 bg-transparent border-0 appearance-none focus:outline-none focus:ring-0"
            {...register('transferAmount', {})}
          />
          <label
            htmlFor="transferAmount"
            className="absolute duration-300 top-4 -z-1 origin-0 text-gray-500 text-lg"
          >
            Amount
          </label>
        </div>

        <input type="text" placeholder="name" {...register('name', {})} />

        <input
          value="Send"
          type="submit"
          className="bg-red-500 hover:bg-red-600 text-white font-light font-bold py-1 px-2 mb-7 rounded-full"
        />

        <button
          value="Cancel"
          className="bg-white-500 hover:bg-gray-200 text-red-500 font-bold font-light py-1 px-2 mb-7 rounded-full"
        >
          Cancel
        </button>
      </form>

      {isModalOpen && <Modal />}
    </div>
  );
}
