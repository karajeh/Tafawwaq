"use client";
import Image from "next/image";
import React, { useState } from "react";
import mastercardLogo from "public/images/student/Mastercard.svg";
import { FaPlus } from "react-icons/fa6";

const cardData = [
  {
    id: 1,
    balance: 4560,
    lastFour: 4456,
    name: "Lloyd Lyons",
    bank: "My Bank",
    color: "bg-secondary",
    logo: "mastercard",
  },
  {
    id: 2,
    balance: 6753,
    lastFour: 6753,
    name: "Jane Doe",
    bank: "My Bank",
    color: "bg-cardiary",
    logo: "mastercard",
  },
  {
    id: 1,
    balance: 4560,
    lastFour: 4456,
    name: "Lloyd Lyons",
    bank: "My Bank",
    color: "bg-yellowish",
    logo: "mastercard",
  },
  {
    id: 2,
    balance: 6753,
    lastFour: 6753,
    name: "Jane Doe",
    bank: "My Bank",
    color: "bg-shade",
    logo: "mastercard",
  },
];

const Cards = () => {
  const [selectedCard, setSelectedCard] = useState(cardData[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
  });

  // Update form inputs
  const handleChange = (e: { target: { name: string; value: unknown } }) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Function to toggle the modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <div className="flex items-center space-y-4">
        {/* Enlarged Card View */}
        {selectedCard && (
          <div
            className={`p-8 rounded-lg ${selectedCard.color} w-80 text-white shadow-[20px_41px_32px_20px_#fbe5e3] relative flex justify-between`}
          >
            <div className="left">
              {/* Card Balance */}
              <h2 className="text-3xl font-bold mb-4">
                ${selectedCard.balance}
              </h2>

              {/* Card Number with masked last four digits */}
              <p className="text-sm mt-2 font-bold text-gray-300">
                <span className="mx-1">....</span>
                <span className="mx-1">....</span>
                <span className="mx-1">....</span>
                {selectedCard.lastFour}
              </p>

              {/* Name */}
              <p className="text-sm mt-4 text-gray-400">{selectedCard.name}</p>
            </div>

            {/* Bank Name */}
            <div className="flex justify-end mb-4">
              <p className="text-lg">{selectedCard.bank}</p>
            </div>

            {/* Mastercard Logo */}
            <Image
              src={mastercardLogo}
              alt=" Logo"
              className="absolute bottom-4 right-4 w-10 h-10"
            />
          </div>
        )}
        <div className="pr-3 flex flex-col space-y-4 overflow-y-auto h-[200px] mx-5 scrollbar-thin">
          <div
            className="p-4 rounded-md bg-gray-300 w-16 h-10 flex justify-center items-center 
            text-white cursor-pointer relative hover:scale-105 transition-transform duration-300"
            onClick={toggleModal}
          >
            <FaPlus className="text-xl text-black" /> {/* Plus icon */}
          </div>
          {cardData.map((card) => (
            <div
              key={card.id}
              className={`p-4 rounded-md ${card.color} w-16 h-10 flex flex-col justify-between items-start 
      text-white cursor-pointer relative hover:scale-105 transition-transform duration-300`}
              onClick={() => setSelectedCard(card)}
            >
              <p className="text-xs">{card.lastFour}</p>

              {/* Mastercard Logo */}
              <Image
                src={mastercardLogo}
                alt="Mastercard Logo"
                className="absolute bottom-1 right-1 w-4 h-4 mix-blend-lighten "
              />
            </div>
          ))}
        </div>
        {isModalOpen && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            onClick={toggleModal}
          >
            <div
              className="bg-white rounded-lg p-8 shadow-lg w-[400px] relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={toggleModal}
              >
                ✕
              </button>

              {/* Credit Card Preview */}
              <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 rounded-lg p-6 shadow-md mb-6">
                <div className="flex justify-between items-center text-white mb-4">
                  <span className="text-lg font-medium">
                    {cardDetails.name || "Cardholder Name"}
                  </span>
                  <span>{cardDetails.expiry || "MM/YY"}</span>
                </div>
                <div className="text-2xl text-white font-bold tracking-widest mb-4">
                  {cardDetails.number
                    ? cardDetails.number.replace(/\d{4}(?=.)/g, "$& ")
                    : "XXXX XXXX XXXX XXXX"}
                </div>
                <div className="flex justify-end text-white">
                  <span>{cardDetails.cvv ? "***" : "CVV"}</span>
                </div>
              </div>

              {/* Payment Details Form */}
              <h2 className="text-2xl mb-4">Payment Details</h2>
              <p className="text-gray-600 mb-6">Once you add a payment method, Tafawwaq will deduct a $1 fee, which will be reversed within 5 business days.</p>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium">
                    Name on card
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={cardDetails.name}
                    onChange={handleChange}
                    className="w-full bg-gray-100 mt-2 p-2 rounded-md"
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
                    className="w-full bg-gray-100 mt-2 p-2 rounded-md"
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    value={cardDetails.cvv}
                    onChange={handleChange}
                    className="w-full bg-gray-100 mt-2 p-2 rounded-md"
                    placeholder="***"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium">
                    Card number
                  </label>
                  <input
                    type="text"
                    name="number"
                    value={cardDetails.number}
                    onChange={handleChange}
                    className="w-full bg-gray-100 mt-2 p-2 rounded-md"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center mt-6">
                <button
                  className="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500 transition-colors duration-300"
                  onClick={toggleModal}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300 active:scale-95"
                  onClick={toggleModal}
                >
                  Add Card
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Adding custom scrollbar styling using inline styles for Webkit browsers */}
        <style jsx>{`
          .scrollbar-thin::-webkit-scrollbar {
            width: 6px; /* Thin scrollbar */
            height: 100px
          }

          .scrollbar-thin::-webkit-scrollbar-thumb {
            background-color: #ff6633;
            border-radius: 10px;
            height: 2px; /* Smaller thumb length */
          }

          .scrollbar-thin::-webkit-scrollbar-track {
            background: transparent;

          /* Removing scrollbar arrows */
          .scrollbar-thin::-webkit-scrollbar-button {
            display: none;
          }
        `}</style>
      </div>

      {/* Additional Text and Form */}
      <h1 className="hidden md:block mt-[20px] md:mt-[40px] md:text-[22px] font-medium">
        Once you add a payment method, Tafawwaq will deduct a $1 fee, which 
        {" "}
        <br />
        will be reversed within 5 business days.
      </h1>
      <h1 className="md:hidden mt-[20px] md:mt-[40px] md:text-[22px] font-medium">
        Once you add a payment method, Tafawwaq will deduct a $1 fee, which
        {" "}
        will be reversed within 5 business days.
      </h1>

      {/* Credit Card Details Form */}
      {/* <div className="mt-[20px] md:mt-[40px]">
        <h1 className="text-[20px] md:text-[22px] font-medium">
          Credit Card Details:
        </h1>
        <div className="flex w-full gap-[16px] mt-[20px]">
          <div className="w-full">
            <h1 className="text-[14px]">First Name</h1>
            <input
              type="text"
              className="w-full bg-[#F7F7F7] mt-[10px] h-[35px] md:h-[42px] px-2 md:px-5 rounded-[8px] hover:scale-105 transition-transform duration-300"
              placeholder="Alex"
            />
          </div>
          <div className="w-full">
            <h1 className="text-[14px]">Last Name</h1>
            <input
              type="text"
              className="w-full bg-[#F7F7F7] mt-[10px] h-[35px] md:h-[42px] px-2 md:px-5 rounded-[8px] hover:scale-105 transition-transform duration-300"
              placeholder="Thompson"
            />
          </div>
        </div>
        <div className="flex w-full gap-[16px] mt-[20px]">
          <div className="w-full">
            <h1 className="text-[14px]">Card Number</h1>
            <input
              type="text"
              className="w-full bg-[#F7F7F7] mt-[10px] h-[35px] md:h-[42px] px-2 md:px-5 rounded-[8px] hover:scale-105 transition-transform duration-300"
              placeholder=".... .... .... 4325"
            />
          </div>
          <div className="w-full">
            <h1 className="text-[14px]">Expiry date</h1>
            <input
              type="text"
              className="w-full bg-[#F7F7F7] mt-[10px] h-[35px] md:h-[42px] px-2 md:px-5 rounded-[8px] hover:scale-105 transition-transform duration-300"
              placeholder="12-12-24"
            />
          </div>
          <div className="w-full">
            <h1 className="text-[14px]">CVV</h1>
            <input
              type="text"
              className="w-full bg-[#F7F7F7] mt-[10px] h-[35px] md:h-[42px] px-2 md:px-5 rounded-[8px] hover:scale-105 transition-transform duration-300"
              placeholder="..."
            />
          </div>
        </div>
        <div className="flex items-center justify-center cursor-pointer">
          <div className="bg-[#A3D154] w-full md:w-[213px] h-[40px] flex items-center justify-center rounded-[8px] mt-[30px] hover:bg-[#8cbf45] transition-colors duration-300 active:scale-95">
            <h1 className="text-white">Save</h1>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Cards;
