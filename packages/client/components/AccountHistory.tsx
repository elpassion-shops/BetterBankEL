import { ReactNode, useContext } from 'react';
import { FaCreditCard, FaRegCreditCard } from 'react-icons/fa';
import Loader from '../components/Loader';
import { BankAppAPI } from '../helpers/BankAPI';
import { AccountContext } from '../pages/account';
import { useQuery } from 'react-query';

export default function AccountHistory() {
  const account = useContext(AccountContext);

  const { isLoading, data, isError } = useQuery(
    'userAccountHistory',
    async () => {
      return await BankAppAPI.getTransfersHistory().then((data) => {
        return data;
      });
    }
  );

  if (isLoading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  if (isError) {
    return (
      <>
        <h1 className="text-xl font-bold">Transaction history</h1>
        <p>Failed to fetch data from database.</p>
      </>
    );
  }

  return (
    <>
      <h1 className="text-xl font-bold">Transaction history</h1>

      <div className="relative overflow-x-auto">
        <table className="w-full border-collapse text-sm text-left text-gray-500 dark:text-gray-400 table-auto">
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr className="border-b">
              <th scope="col" className="px-6 py-3 w-3">
                Type
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Receiver
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Amount
              </th>
            </tr>
          </thead>

          <tbody>
            {data.reverse().map((transfer) => (
              <tr
                key={transfer.id}
                className="bg-white dark:bg-gray-800 border-b"
              >
                <TableCell type="td">
                  {getTransferTypeIcon(
                    isTransferOutgoingOrIncoming(
                      account.accountNumber,
                      transfer.senderIBAN
                    )
                  )}
                </TableCell>
                <TableCell type="td">
                  {new Date(transfer.created_at)
                    .toLocaleString(undefined, {
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric',
                    })
                    .replace(/\//g, '.')}
                </TableCell>
                <TableCell type="td">{transfer.title}</TableCell>
                <TableCell type="td">{transfer.receiver}</TableCell>
                <TableCell type="td" centered>
                  {transfer.amount.toFixed(2)} PLN
                </TableCell>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function getTransferTypeIcon(transferType: 'outgoing' | 'incoming') {
  if (transferType === 'outgoing') {
    return <FaCreditCard title="outgoing" color="blue" />;
  } else {
    return <FaRegCreditCard title="incoming" color="green" />;
  }
}

function isTransferOutgoingOrIncoming(accountIBAN: string, senderIBAN: string) {
  if (accountIBAN === senderIBAN) {
    return 'outgoing';
  }

  return 'incoming';
}

function TableCell({
  children,
  type,
  centered,
  extraClasses,
}: {
  children: ReactNode;
  type: 'td' | 'th';
  centered?: boolean;
  extraClasses?: string;
}) {
  let classList = 'px-6 py-4';
  if (centered) {
    classList += ' text-center';
  }

  if (type === 'td') {
    classList += ' border-b';
  }

  if (extraClasses) {
    classList += ` ${extraClasses}`;
  }

  if (type === 'td') {
    return <td className={classList}>{children}</td>;
  } else {
    return <th className={classList}>{children}</th>;
  }
}
