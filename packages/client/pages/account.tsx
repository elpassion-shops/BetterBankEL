import { useEffect, useState } from 'react';
import SendTransferForm from '../components/SendTransferForm';
import { BankAppAPI } from '../helpers/BankAPI';
import { IAccountDetails } from '@bank-el/interfaces';

export function Account() {
  const [accountDetails, setAccountDetails] = useState<IAccountDetails | null>(
    null
  );
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    BankAppAPI.getAccountDetails().then((data) => {
      setAccountDetails({
        id: 0,
        userId: 0,
        accountNumber: data.accountNumber,
        accountBalance: data.accountBalance,
      });
      setIsLoaded(true);
    });
  }, []);

  if (!isLoaded) {
    return (
      <>
        <div className="container mx-auto px-4">
          <p className="text-xl font-bold text-center p-4">Loading...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold underline">Account</h1>

        <ul>
          <li>Account number: {accountDetails.accountNumber}</li>
          <li>Account balance: {accountDetails.accountBalance}</li>
        </ul>

        <SendTransferForm />
      </div>
    </>
  );
}

export default Account;
