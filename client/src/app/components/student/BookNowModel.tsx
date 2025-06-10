'use client';
import React, { useState } from 'react';
import { Button } from '../admin-panel/ui/button';
import Image from 'next/image';
import mastercardLogo from 'public/images/student/Mastercard.svg';
import applepay from 'public/images/student/vector.svg';
import cardmockup from 'public/images/student/card-mockup.png';

const BookNowModel = ({
  handleClose,
}: {
  handleClose: () => void;
  onTimeChange: (time: string) => void;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [cardDetails, setCardDetails] = useState({
    name: '',
    number: '',
    expiry: '',
    cvv: '',
  });

  // Update form inputs
  const handleChange = (e: { target: { name: string; value: unknown } }) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="">
      <div className="flex justify-between">
        {selectedCard ? (
          <div
            className={`p-8 rounded-lg ${selectedCard.color} w-80 text-white relative flex justify-between`}
          >
            <div className="left">
              <h2 className="text-3xl font-bold mb-4">
                ${selectedCard.balance}
              </h2>

              <p className="text-sm mt-2 font-bold text-gray-300">
                <span className="mx-1">....</span>
                <span className="mx-1">....</span>
                <span className="mx-1">....</span>
                {selectedCard.lastFour}
              </p>
              <p className="text-sm mt-4 text-gray-400">{selectedCard.name}</p>
            </div>
            <div className="flex justify-end mb-4">
              <p className="text-lg">{selectedCard.bank}</p>
            </div>
            <Image
              src={mastercardLogo}
              alt="Logo"
              className="absolute bottom-4 right-4 w-10 h-10"
            />
          </div>
        ) : (
          <div>
            <Image
              src={cardmockup}
              alt="card mockup"
              width={334}
              height={206}
              className="w-[334px] h-[206px]"
            />
          </div>
        )}
        <div className="py-6">
          <div className="pr-2 h-[160px] flex flex-col gap-[20px] overflow-y-scroll scrollbar-thin">
            {cardData.map((card) => (
              <div
                key={card.id}
                className={`p-4 rounded-md ${card.color} w-16 h-10 flex flex-col justify-between items-start text-white cursor-pointer relative hover:scale-105 transition-transform duration-300`}
                onClick={() => setSelectedCard(card)}
              >
                <p className="text-xs">{card.lastFour}</p>
                <Image
                  src={mastercardLogo}
                  alt="Mastercard Logo"
                  className="absolute bottom-1 right-1 w-4 h-4 mix-blend-lighten "
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="pt-6">
        <h3 className="text-[18px] font-bold">Payment details</h3>
        <p className="text-[14px] mt-2 text-[#475467]">
          Update your card details.
        </p>

        <div className="grid grid-cols-4 gap-4 mt-5">
          <div className="col-span-3">
            <label className="block text-sm font-medium">Name on card</label>
            <input
              type="text"
              name="name"
              value={cardDetails.name}
              onChange={handleChange}
              className="w-full bg-gray-100 mt-2 p-2 rounded-md border"
              placeholder="Olivia Rhye"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Expiry</label>
            <input
              type="text"
              name="expiry"
              value={cardDetails.expiry}
              onChange={handleChange}
              className="w-full bg-gray-100 mt-2 p-2 rounded-md border"
              placeholder="MM/YY"
            />
          </div>
          <div className="col-span-3">
            <label className="block text-sm font-medium">Card number</label>
            <input
              type="text"
              name="number"
              value={cardDetails.number}
              onChange={handleChange}
              className="w-full bg-gray-100 mt-2 p-2 rounded-md border"
              placeholder="1234 5678 9012 3456"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">CVV</label>
            <input
              type="text"
              name="cvv"
              value={cardDetails.cvv}
              onChange={handleChange}
              className="w-full bg-gray-100 mt-2 p-2 rounded-md border"
              placeholder="***"
            />
          </div>
        </div>

        <p className="text-[18px] font-bold mt-2">Or pay with </p>
        <button
          aria-label="apple pay"
          className="p-2 mt-2 border-2 border-black rounded-md"
        >
          <Image src={applepay} alt="apple pay" />
        </button>
      </div>
      <div className="mt-4 flex justify-between w-full gap-3">
        <Button
          onClick={handleClose}
          outline
          className="bg-transparent border border-slate !text-[#111111af] sm:py-2 px-4 w-full rounded-md"
        >
          Cancel
        </Button>
        <Button
          color="button_primary"
          className="bg-admin_button text-white sm:py-2 px-4 w-full rounded-md"
        >
          Pay Now
        </Button>
      </div>
      {/* Adding custom scrollbar styling using inline styles for Webkit browsers */}
      <style jsx>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px; /* Thin scrollbar */
          height: 100px;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: #ff6633;
          border-radius: 10px;
          height: 2px; /* Smaller thumb length */
        }

        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }

        /* Removing scrollbar arrows */
        .scrollbar-thin::-webkit-scrollbar-button {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default BookNowModel;
const cardData = [
  {
    id: 1,
    balance: 4560,
    lastFour: 4456,
    name: 'Lloyd Lyons',
    bank: 'My Bank',
    color: 'bg-secondary',
    logo: 'mastercard',
  },
  {
    id: 2,
    balance: 6753,
    lastFour: 6753,
    name: 'Jane Doe',
    bank: 'My Bank',
    color: 'bg-cardiary',
    logo: 'mastercard',
  },
  {
    id: 3,
    balance: 4560,
    lastFour: 4456,
    name: 'Lloyd Lyons',
    bank: 'My Bank',
    color: 'bg-yellowish',
    logo: 'mastercard',
  },
  {
    id: 4,
    balance: 6753,
    lastFour: 6753,
    name: 'Jane Doe',
    bank: 'My Bank',
    color: 'bg-shade',
    logo: 'mastercard',
  },
];
