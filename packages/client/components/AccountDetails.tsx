import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import Loader from './Loader';
import { BankAppApiContext } from '../providers/BankAppApiContext';

export default function AccountDetails() {
  const { BankAppAPI } = useContext(BankAppApiContext);
  const userAccount = useQuery('userAccountData', () =>
    BankAppAPI.getAccountDetails()
  );

  if (userAccount.isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="bg-white	p-4 text-black">
        <div data-testid="accountType" className="text-lg font-bold mb-3">
          eKonto
        </div>
        <div data-testid="availableFounds" className="font-extralight">
          Available funds
        </div>
        <div className="mb-3">
          {userAccount && userAccount.data && userAccount.data.accountBalance}
          <span data-testid="foundsCurrency" className="text-xs font-normal	">
            PLN
          </span>
        </div>
        <div data-testid="upcomingPayments" className="font-extralight">
          Upcoming payments
          <span className="text-xs font-normal	"> 0,00 PLN</span>
        </div>
      </div>
    </>
  );
}
