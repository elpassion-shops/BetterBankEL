import { useForm } from 'react-hook-form';

export default function SendTransfer() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data, errors);

    reset();
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col text-gray-500"
      >
        <input
          type="text"
          placeholder="Receiver"
          {...register('Receiver', {})}
        />

        <input
          type="text"
          placeholder="To account number"
          {...register('To account number', {})}
        />

        <input
          type="text"
          placeholder="Title of transfer"
          {...register('Title of transfer', {})}
        />

        <input
          type="text"
          placeholder="From account"
          {...register('From account', {})}
        />

        <input
          type="datetime"
          placeholder="Transfer date"
          {...register('Transfer date', {})}
        />

        <input value="Send" type="submit" />
      </form>
    </div>
  );
}
