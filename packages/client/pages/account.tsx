import { IAccountDetails } from '@bank-el/interfaces';
import { useEffect, useState } from 'react';
import Container from '../components/Container';
import SendTransferForm from '../components/SendTransferForm';
import AccountHistory from '../components/AccountHistory';
import { BankAppAPI } from '../helpers/BankAPI';

export function Account() {
  const [userAccount, setAccountData] = useState<IAccountDetails | null>(null);

  useEffect(() => {
    BankAppAPI.getAccountDetails().then((data) => {
      setAccountData(data);
    });
  }, []);

  return (
    <>
      <Container>
        <h1 className="text-3xl font-bold underline">Account</h1>

        {userAccount && (
          <ul>
            <li>Account number: {userAccount.accountNumber}</li>
            <li>Account balance: {userAccount.accountBalance}</li>
          </ul>
        )}

        <AccountHistory />
      </Container>

      {/*<SendTransferForm />*/}
    </>
  );
}

export default Account;
