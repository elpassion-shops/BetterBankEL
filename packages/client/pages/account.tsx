import SendTransferForm from '../components/SendTransferForm';
import AccountHistory from '../components/AccountHistory';
import withAuth from '../hoc/withAuth';
import AccountDetails from '../components/AccountDetails';

export function Account() {
  return (
    <>
      <h1 className="text-3xl font-bold underline">Account</h1>

      <AccountDetails />
      <SendTransferForm />
      <AccountHistory />
    </>
  );
}

export const getServerSideProps = withAuth('/login')();

export default Account;
