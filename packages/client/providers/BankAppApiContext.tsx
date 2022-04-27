import { createContext } from 'react';
import { BankAppAPI } from '../helpers/BankAPI';

export const BankAppApiContext = createContext({
  BankAppAPI,
});

export default BankAppAPI;
