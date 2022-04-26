import { ITransfer } from '@bank-el/interfaces';
import React, { useState, useCallback, useEffect } from 'react';
import { BankAppAPI } from '../helpers/BankAPI';

export const LoginForm = () => {
  // Store the username so we can reference it in a submit handler
  const [username, setUsername] = useState('');

  // Create a state for the user data we are going to receive
  // from the API call upon form submit.
  const [userData, setUserData] = useState(null);

  const [userAccount, setAccountData] = useState(null);

  useEffect(() => {
    BankAppAPI.getAccountDetails().then((data) => {
      console.log('getAccountDetails', data);
      setAccountData(data);
    });

    BankAppAPI.getTransfersHistory().then((data) => {
      console.log('getTransfersHistory', data);
    });
  }, []);

  // Whenever we change our username input's value
  // update the corresponding state's value.
  const handleUsernameChange = useCallback((event) => {
    setUsername(event.target.value);
  }, []);

  // Handle a submit event of the form
  const handleFormSubmit = useCallback(
    (event) => {
      // Prevent the default behavior, as we don't want
      // for our page to reload upon submit.
      event.preventDefault();

      // Perform a POST /login request and send the username
      fetch(`${process.env.NEXT_PUBLIC_SERVER}/login`, {
        method: 'POST',
        body: JSON.stringify({
          username,
        }),
      })
        .then((res) => res.json())
        // Update the state with the received response
        .then(setUserData);
    },

    [username]
  );
  return (
    <>
      {userData && (
        <>
          <div>
            <p data-testid="firstName">{userData.firstName}</p>
            <p data-testid="lastName">{userData.lastName}</p>
            <p data-testid="id">{userData.id}</p>
          </div>
        </>
      )}

      {userAccount && (
        <>
          <div>
            <h2>Account Balance</h2>
            <p data-testid="accountBalance">{userAccount.accountBalance}</p>
            <h2>Account Number</h2>
            <p data-testid="accountNumber">{userAccount.accountNumber}</p>
          </div>
        </>
      )}

      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            name="username"
            value={username}
            onChange={handleUsernameChange}
          />
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
