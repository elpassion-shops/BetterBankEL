import { IAccountDetails } from '@bank-el/interfaces';
import { useEffect, useState } from 'react';
import SendTransferForm from '../components/SendTransferForm';
import { BankAppAPI } from '../helpers/BankAPI';

export function Account() {
  const [userAccount, setAccountData] = useState<IAccountDetails | null>(null);

  useEffect(() => {
    setTimeout(() => {
      // ! delay set to give time for msw to turn on ([MSW] Mocking enabled.)
      BankAppAPI.getAccountDetails().then((data) => {
        setAccountData(data);
      });
    }, 500);
  }, []);

  return (
    <>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold underline">Account</h1>

        {userAccount && (
          <ul>
            <li>Account number: {userAccount.accountNumber}</li>
            <li>Account balance: {userAccount.accountBalance}</li>
          </ul>
        )}
      </div>

      <SendTransferForm />
    </>
  );
}

export default Account;
