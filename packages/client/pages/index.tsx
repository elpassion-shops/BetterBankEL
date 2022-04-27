import React from 'react';
import { BankAppAPI } from '../helpers/BankAPI';

export const BankAppApiContext = React.createContext({
  BankAppAPI: BankAppAPI,
});

export default function Index() {
  return (
    <>
      <p>Home page</p>
    </>
  );
}
