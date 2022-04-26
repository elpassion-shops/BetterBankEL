import React from 'react';

export default function AccountDetails() {
  return (
    <>
      <div className="bg-white	p-4 text-black  ">
        <div className="text-lg font-bold mb-3">eKonto</div>
        <div className="font-extralight">Available funds</div>
        <div className="mb-3">
          323,00<span className="text-xs">PLN</span>
        </div>
        <div className="font-extralight">
          Upcoming payments<span className="text-xs"> 0,00 PLN</span>
        </div>
      </div>
    </>
  );
}
