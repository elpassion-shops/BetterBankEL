import { IAccountDetails } from '@bank-el/interfaces';
import { useEffect, useState } from 'react';
import SendTransferForm from '../components/SendTransferForm';
import AccountHistory from '../components/AccountHistory';
import { BankAppAPI } from '../helpers/BankAPI';
import withAuth from '../hoc/withAuth';

export function Account() {
  const [userAccount, setAccountData] = useState<IAccountDetails | null>(null);

  useEffect(() => {
    BankAppAPI.getAccountDetails().then((data) => {
      setAccountData(data);
    });
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold underline">Account</h1>

      {userAccount && (
        <ul>
          <li>Account number: {userAccount.accountNumber}</li>
          <li>Account balance: {userAccount.accountBalance}</li>
        </ul>
      )}

      <SendTransferForm />

      <AccountHistory />
    </>
  );
}

export const getServerSideProps = withAuth('/login')();

export default Account;
