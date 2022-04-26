import React from 'react';

export default function AccountDetails() {
  return (
    <>
      <div className="bg-white	p-4 text-black  ">
        <div data-testid="accountType" className="text-lg font-bold mb-3">
          eKonto
        </div>
        <div data-testid="availableFounds" className="font-extralight">
          Available funds
        </div>
        <div className="mb-3">
          323,00
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
