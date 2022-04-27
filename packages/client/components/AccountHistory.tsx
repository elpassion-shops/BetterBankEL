import { ReactNode, useEffect, useState } from 'react';
import { ITransfer } from '@bank-el/interfaces';
import { FaCreditCard, FaRegCreditCard } from 'react-icons/fa';
import Loader from '../components/Loader';
import { BankAppAPI } from '../helpers/BankAPI';

export default function AccountHistory() {
  const [accountHistory, setAccountHistory] = useState<Array<ITransfer>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    BankAppAPI.getTransfersHistory().then((data) => {
      setAccountHistory(data.transfers);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <>
        <Loader />
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
            {accountHistory.map((transfer) => (
              <tr
                key={transfer.id}
                className="bg-white dark:bg-gray-800 border-b"
              >
                <TableCell type="td">
                  {getTransferTypeIcon('outgoing')}
                </TableCell>
                <TableCell type="td">
                  {new Date(transfer.createdAt)
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
    return <FaCreditCard title="outgoing" />;
  } else {
    return <FaRegCreditCard title="incoming" />;
  }
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
