import { useState } from 'react';

export function Account() {
  const [balance, setBalance] = useState(0);
  const [accountNumber, setAccountNumber] = useState(123123123123);

  return (
    <>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold underline">Account</h1>

        <ul>
          <li>Account number: {accountNumber}</li>
          <li>Account balance: {balance}</li>
        </ul>
      </div>
    </>
  );
}

export default Account;
