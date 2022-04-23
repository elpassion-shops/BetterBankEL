import { useEffect, useState } from 'react';
import SendTransferForm from '../components/SendTransferForm';
import { BankAppAPI } from '../helpers/BankAPI';

export function Account() {
  const [balance, setBalance] = useState<number | null>(null);
  const [accountNumber, setAccountNumber] = useState<number | null>(null);

  useEffect(() => {
    setTimeout(() => {
      // ! delay set to give time for msw to turn on ([MSW] Mocking enabled.)
      BankAppAPI.getAccountDetails().then((data) => {
        console.log('getAccountDetails', data);
        setAccountNumber(data.accountNumber);
        setBalance(data.accountBalance);
      });
    }, 500);
  }, []);

  return (
    <>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold underline">Account</h1>

        {balance && accountNumber && (
          <ul>
            <li>Account number: {accountNumber}</li>
            <li>Account balance: {balance}</li>
          </ul>
        )}
      </div>

      <SendTransferForm />
    </>
  );
}

export default Account;
