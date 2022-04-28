import { IAccountDetails } from '@bank-el/interfaces';
import { createContext, useEffect, useState } from 'react';
import SendTransferForm from '../components/SendTransferForm';
import AccountHistory from '../components/AccountHistory';
import { BankAppAPI } from '../helpers/BankAPI';
import withAuth from '../hoc/withAuth';
import AccountDetails from '../components/AccountDetails';

export const AccountContext = createContext<IAccountDetails | null>(null);

export function Account() {
  const [userAccountData, setAccountData] = useState<IAccountDetails | null>(
    null
  );

  useEffect(() => {
    BankAppAPI.getAccountDetails().then((data) => {
      setAccountData(data);
    });
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold underline">Account</h1>
      {userAccountData && (
        <AccountContext.Provider value={userAccountData}>
          {userAccountData && <AccountDetails />}

          <SendTransferForm />

          <AccountHistory />
        </AccountContext.Provider>
      )}
    </>
  );
}

export const getServerSideProps = withAuth('/login')();

export default Account;
