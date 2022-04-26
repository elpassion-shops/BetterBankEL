import { IAccountDetails } from '@bank-el/interfaces';
import React from 'react';
import { useEffect, useState } from 'react';
import AccountDetails from '../components/AccountDetails';
import SendTransferForm from '../components/SendTransferForm';
import { BankAppAPI } from '../helpers/BankAPI';

export const BankAppApiContext = React.createContext({ BankAppAPI });

export function Dashboard() {
  const [userAccount, setAccountData] = useState<IAccountDetails | null>(null);

  return (
    <>
      <BankAppApiContext.Provider value={{ BankAppAPI }}>
        <AccountDetails />
        <SendTransferForm />
      </BankAppApiContext.Provider>
    </>
  );
}

export default Dashboard;
