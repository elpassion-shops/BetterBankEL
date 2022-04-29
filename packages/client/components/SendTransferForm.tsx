import { ITransfer, ITransferSendFormData } from '@bank-el/interfaces';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BankAppApiContext } from '../providers/BankAppApiContext';
import Modal from './Modal';
import { SendTransferValidation } from '../helpers/SendTransferValidation';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import Loader from './Loader';

export default function SendTransfer() {
  const { BankAppAPI } = useContext(BankAppApiContext);
  const [isModalOpen] = useState(false);
  const userAccount = useQuery('userAccountData', () =>
    BankAppAPI.getAccountDetails()
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SendTransferValidation>({
    resolver: classValidatorResolver(SendTransferValidation),
  });

  const queryClient = useQueryClient();
  const mutation = useMutation(
    (transferData: ITransfer) => BankAppAPI.sendTransfer(transferData),
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries('userAccountHistory');
        queryClient.invalidateQueries('userAccountData');
      },
    }
  );

  const onSubmit = (data: ITransferSendFormData) => {
    console.log(data);

    const transferData: ITransfer = {
      createdAt: (data.transferDate && data.transferDate.toString()) || '',
      amount: data.transferAmount,
      title: data.transferTitle,
      address: data.receiverAddress || '',
      sender: '',
      senderIBAN: userAccount.data.accountNumber,
      receiver: data.receiverName,
      receiverIBAN: data.receiverBankAccountNumber.replace(/ /g, ''),
    };

    mutation.mutate(transferData);

    reset();
  };

  if (userAccount.isLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-white	p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col overflow-hidden relative z-0 "
      >
        <div className="">
          <div className=" relative z-0 outline outline-transparent w-full px-2 pl-4 pt-4 border border-b-2 rounded-[2px] border-b-gray-400 focus-within:border-blue-500">
            <input
              type="text"
              name="receiverName"
              id="receiverName"
              placeholder=" "
              className=" text-gray-800 pt-2 pb-2 block w-full px-0 mt-0 bg-transparent border-0 appearance-none focus:outline-none focus:ring-0"
              {...register('receiverName', {})}
            />
            <label
              htmlFor="receiverName"
              className="absolute duration-300 top-4 -z-1 origin-0 text-gray-500 text-lg"
            >
              Receiver
            </label>
          </div>
          <div className="pl-4 h-7">
            {errors.receiverName && (
              <span role="alert" className="text-sm text-red-600">
                {errors.receiverName.message}
              </span>
            )}
          </div>
        </div>

        <div className="relative z-0 outline outline-transparent w-full px-2 pl-4 pt-4 border border-b-2 rounded-[2px] border-b-gray-400 focus-within:border-blue-500">
          <input
            type="text"
            name="senderBankAccountNumber"
            id="senderBankAccountNumber"
            value={userAccount && userAccount.data.accountNumber}
            placeholder=" "
            className=" text-gray-800 pt-2 pb-2 block w-full px-0 mt-0 bg-transparent border-0 appearance-none focus:outline-none focus:ring-0"
            onChange={() => null}
          />
          <label
            htmlFor="senderBankAccountNumber"
            className="absolute duration-300 top-4 -z-1 origin-0 text-gray-500 text-lg"
          >
            From account
          </label>
        </div>

        <div className="pl-4 h-7">
          {/* {errors.senderBankAccountNumber && (
            <span role="alert" className="text-sm text-red-600">
              {errors.senderBankAccountNumber.message}
            </span>
          )} */}
        </div>

        <div className="relative z-0 outline outline-transparent w-full px-2 pl-4 pt-4 border border-b-2 rounded-[2px] border-b-gray-400 focus-within:border-blue-500">
          <input
            type="text"
            name="receiverAddress"
            id="receiverAddress"
            placeholder=" "
            className=" text-gray-800 pt-2 pb-2 block w-full px-0 mt-0 bg-transparent border-0 appearance-none focus:outline-none focus:ring-0"
            {...register('receiverAddress', {
              setValueAs: (v) => {
                return v === '' ? undefined : v;
              },
            })}
          />
          <label
            htmlFor="receiverAddress"
            className="absolute duration-300 top-4 -z-1 origin-0 text-gray-500 text-lg"
            onChange={() => null}
          >
            Enter address (optional)
          </label>
        </div>

        <div className="pl-4 h-7">
          {errors.receiverAddress && (
            <span role="alert" className="text-sm text-red-600">
              {errors.receiverAddress.message}
            </span>
          )}
        </div>

        <div className="">
          <div className="relative z-0 outline outline-transparent w-full px-2 pl-4 pt-4 border border-b-2 rounded-[2px] border-b-gray-400 focus-within:border-blue-500">
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
        </div>

        <div className="pl-4 h-7">
          {errors.receiverBankAccountNumber && (
            <span role="alert" className="text-sm text-red-600">
              {errors.receiverBankAccountNumber.message}
            </span>
          )}
        </div>

        <div className="relative z-0 outline outline-transparent w-full px-2 pl-4 pt-4 border border-b-2 rounded-[2px] border-b-gray-400 focus-within:border-blue-500">
          <input
            type="date"
            name="transferDate"
            id="transferDate"
            placeholder=" "
            className=" text-gray-800 pt-2 pb-2 block w-full px-0 mt-0 bg-transparent border-0 appearance-none focus:outline-none focus:ring-0"
            {...register('transferDate', {
              setValueAs: (v) => new Date(v),
            })}
          />
          <label
            htmlFor="transferDate"
            className="absolute duration-300 top-4 -z-1 origin-0 text-gray-500 text-lg"
          >
            Transfer date
          </label>
        </div>

        <div className="pl-4 h-7">
          {errors.transferDate && (
            <span role="alert" className="text-sm text-red-600">
              {errors.transferDate.message}
            </span>
          )}
        </div>

        <div className="relative z-0 outline outline-transparent w-full  px-2 pl-4 pt-4 border border-b-2 rounded-[2px] border-b-gray-400 focus-within:border-blue-500">
          <input
            type="text"
            name="transferTitle"
            id="transferTitle"
            placeholder=" "
            className=" text-gray-800 pt-2 pb-2 block w-full px-0 mt-0 bg-transparent border-0 appearance-none focus:outline-none focus:ring-0"
            {...register('transferTitle')}
          />
          <label
            htmlFor="transferTitle"
            className="absolute duration-300 top-4 -z-1 origin-0 text-gray-500 text-lg"
          >
            Transfer title
          </label>
        </div>

        <div className="pl-4 h-7">
          {errors.transferTitle && (
            <span role="alert" className="text-sm text-red-600">
              {errors.transferTitle.message}
            </span>
          )}
        </div>

        <div className="relative z-0 outline outline-transparent w-full  px-2 pl-4 pt-4 border border-b-2 rounded-[2px] border-b-gray-400 focus-within:border-blue-500">
          <input
            type="number"
            name="transferAmount"
            id="transferAmount"
            step=".01"
            placeholder=" "
            className=" text-gray-800 pt-2 pb-2 block w-full px-0 mt-0 bg-transparent border-0 appearance-none focus:outline-none focus:ring-0"
            {...register('transferAmount', {
              setValueAs: (v) => Number.parseFloat(v),
            })}
          />
          <label
            htmlFor="transferAmount"
            className="absolute duration-300 top-4 -z-1 origin-0 text-gray-500 text-lg"
          >
            Amount
          </label>
        </div>

        <div className="pl-4 h-7 mb-4">
          {errors.transferAmount && (
            <span role="alert" className="text-sm text-red-600">
              {errors.transferAmount.message}
            </span>
          )}
        </div>

        <input
          value="Send"
          type="submit"
          className="bg-red-500 hover:bg-red-600 text-white font-light font-bold py-1 px-2 mb-7 rounded-full"
        />

        <button
          value="Cancel"
          className="bg-white-500 hover:bg-gray-200 text-red-500 font-bold font-light py-1 px-2 mb-7 rounded-full"
          onClick={() => reset()}
        >
          Cancel
        </button>
      </form>

      {isModalOpen && <Modal />}
    </div>
  );
}
