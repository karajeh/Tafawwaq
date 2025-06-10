"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import note from "../../../../public/images/payments/note.svg";
import money from "../../../../public/images/payments/moeny-icon.svg";
import clock from "../../../../public/images/payments/clock-icon.svg";
import dollar from "../../../../public/images/payments/dollor-icon.svg";
import stripe from "../../../../public/images/payments/stripe-icon.svg";
import linkIcon from "../../../../public/images/payments/link-icon.svg";
import paymentSuccessfull from "../../../../public/images/payments/payment-successfull.svg";
import paymentFailed from "../../../../public/images/payments/payment-failed.svg";
import cross from "../../../../public/images/payments/cross.svg";

interface Transaction {
  id: number;
  title: string;
  description: string;
  amount: string;
  type: "income" | "expense";
}

interface TransactionHistoryModalProps {
  transactions: Transaction[];
  onClose: () => void;
}

// Added modal components for backend use (not connected)

const PaymentSuccessModal1 = ({ onClose }: { onClose: () => void }) => {
  return (
    <>
      <div className="w-full h-screen fixed top-0 left-0 flex items-center justify-center bg-black opacity-80 z-20" />
      <div className="w-full h-screen fixed top-0 left-0 flex items-center justify-center bg-transparent z-30">
        <div className="bg-white rounded-2xl max-w-sm w-full p-6 opacity-100 relative">
          {/* Close button */}
          <div
            className="absolute top-3 right-3 p-2 rounded-full cursor-pointer"
            onClick={onClose} // Ensure onClose is called here
          >
            <Image src={cross} alt="close" width={25} height={25} />
          </div>
          {/* Icon */}
          <div className="flex justify-center items-center mb-4">
            <Image
              src={paymentSuccessfull}
              alt="success"
              width={50}
              height={50}
            />
          </div>

          {/* Content */}
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-6 text-xs">
              Please allow 3-5 business days for the funds to reflect in your
              bank account
            </p>
          </div>

          {/* Actions */}
          <button
            onClick={onClose} // Ensure onClose is called here
            className="w-full py-3 px-4 bg-[#8BC34A] text-white rounded-lg hover:bg-[#7CB342] transition-colors mb-4"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    </>
  );
};

const PaymentSuccessModal2 = ({ onClose }: { onClose: () => void }) => {
  return (
    <>
      <div className="w-full h-screen fixed top-0 left-0 flex items-center justify-center bg-black opacity-80 z-20" />
      <div className="w-full h-screen fixed top-0 left-0 flex items-center justify-center bg-transparent z-30">
        <div className="bg-white rounded-2xl max-w-sm w-full p-6 opacity-100 relative">
          {/* Close button */}
          <div
            className="absolute top-3 right-3 p-2 rounded-full cursor-pointer"
            onClick={onClose} // Ensure onClose is called here
          >
            <Image src={cross} alt="close" width={25} height={25} />
          </div>
          {/* Icon */}
          <div className="flex justify-center items-center mb-4">
            <Image
              src={paymentSuccessfull}
              alt="success"
              width={50}
              height={50}
            />
          </div>

          {/* Content */}
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-6 text-xs">
              Your transaction has been processed successfully. Your lesson is
              now confirmed, get ready to learn and grow!
            </p>
          </div>

          {/* Actions */}
          <button
            onClick={onClose} // Ensure onClose is called here
            className="w-full py-3 px-4 bg-[#8BC34A] text-white rounded-lg hover:bg-[#7CB342] transition-colors mb-4"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    </>
  );
};

const PaymentFailedModal1 = ({ onClose }: { onClose: () => void }) => {
  return (
    <>
      <div className="w-full h-screen fixed top-0 left-0 flex items-center justify-center bg-black opacity-80 z-20" />
      <div className="w-full h-screen fixed top-0 left-0 flex items-center justify-center bg-transparent z-30">
        <div className="bg-white rounded-2xl max-w-sm w-full p-6 opacity-100 relative">
          {/* Close button */}
          <div
            className="absolute top-3 right-3 p-2 rounded-full cursor-pointer"
            onClick={onClose} // Ensure onClose is called here
          >
            <Image src={cross} alt="close" width={25} height={25} />
          </div>
          {/* Icon */}
          <div className="flex justify-center items-center mb-4">
            <Image src={paymentFailed} alt="failed" width={50} height={50} />
          </div>

          {/* Content */}
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Payment Failed!</h2>
            <p className="text-gray-600 mb-6 text-xs">
              Sorry, your transaction was unsuccessful. Please try again and if
              the issue persists, contact us for assistance.
            </p>
          </div>

          {/* Actions */}
          <button
            onClick={onClose} // Ensure onClose is called here
            className="w-full py-3 px-4 bg-[#8BC34A] text-white rounded-lg hover:bg-[#7CB342] transition-colors mb-4"
          >
            Done
          </button>

          <Link
            href={"#"}
            className="underline text-black text-sm w-full flex items-center justify-center"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </>
  );
};

const PaymentFailedModal2 = ({ onClose }: { onClose: () => void }) => {
  return (
    <>
      <div className="w-full h-screen fixed top-0 left-0 flex items-center justify-center bg-black opacity-80 z-20" />
      <div className="w-full h-screen fixed top-0 left-0 flex items-center justify-center bg-transparent z-30">
        <div className="bg-white rounded-2xl max-w-sm w-full p-6 opacity-100 relative">
          {/* Close button */}
          <div
            className="absolute top-3 right-3 p-2 rounded-full cursor-pointer"
            onClick={onClose} // Ensure onClose is called here
          >
            <Image src={cross} alt="close" width={25} height={25} />
          </div>
          {/* Icon */}
          <div className="flex justify-center items-center mb-4">
            <Image src={paymentFailed} alt="failed" width={50} height={50} />
          </div>

          {/* Content */}
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Payment Failed!</h2>
            <p className="text-gray-600 mb-6 text-xs">
              Oops! Something went wrong with your payment. Don’t worry, you can
              try again or contact us for assistance.
            </p>
          </div>

          {/* Actions */}
          <button
            onClick={onClose} // Ensure onClose is called here
            className="w-full py-3 px-4 bg-[#8BC34A] text-white rounded-lg hover:bg-[#7CB342] transition-colors mb-4"
          >
            Done
          </button>

          <Link
            href={"#"}
            className="underline text-black text-sm w-full flex items-center justify-center"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </>
  );
};

const TransactionHistoryModal: React.FC<TransactionHistoryModalProps> = ({
  transactions,
  onClose,
}) => {
  return (
    <div className="fixed top-0 left-0 z-30 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="relative bg-white rounded-2xl max-w-2xl w-full p-6 overflow-auto max-h-[90vh]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold">Transaction History</h2>
        </div>

        {/* Transaction List */}
        <div className="overflow-y-auto max-h-[60vh]">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 border-b border-gray-200"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 ${
                    transaction.type === "income" ? "bg-green-50" : "bg-red-50"
                  } rounded-lg flex items-center justify-center`}
                >
                  <span className="text-white font-semibold">
                    {transaction.type === "income" ? "+" : "-"}
                  </span>
                </div>
                <div>
                  <span className="text-gray-700 text-sm block">
                    {transaction.description}
                  </span>
                  <span className="text-gray-500 text-xs">
                    {transaction.title}
                  </span>
                </div>
              </div>
              <span
                className={`text-sm font-semibold ${
                  transaction.type === "income"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {transaction.amount}
              </span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={onClose}
            className="py-3 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const Page: React.FC = () => {
  // const [showNotice, setShowNotice] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successModal1, setSuccessModal1] = useState(false);
  const [successModal2, setSuccessModal2] = useState(false);
  const [failModal1, setFailModal1] = useState(false);
  const [failModal2, setFailModal2] = useState(false);

  const transactions: Transaction[] = [...Array(15)].map((_, i) => ({
    id: i,
    title: `Transaction ${i + 1}`,
    description: `UI/UX Prototyping with Proto.io`,
    amount: i % 2 === 0 ? "+$50" : "-$25",
    type: i % 2 === 0 ? "income" : "expense",
  }));

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const closeSuccessModal1 = () => {
    setSuccessModal1(false);
  };
  const closeSuccessModal2 = () => {
    setSuccessModal2(false);
  };
  const closeFailModal1 = () => {
    setFailModal1(false);
  };
  const closeFailModal2 = () => {
    setFailModal2(false);
  };

  return (
    <>
      {isModalOpen && (
        <TransactionHistoryModal
          transactions={transactions}
          onClose={closeModal}
        />
      )}
      {successModal1 && <PaymentSuccessModal1 onClose={closeSuccessModal1} />}
      {successModal2 && <PaymentSuccessModal2 onClose={closeSuccessModal2} />}
      {failModal1 && <PaymentFailedModal1 onClose={closeFailModal1} />}
      {failModal2 && <PaymentFailedModal2 onClose={closeFailModal2} />}
      <div className="p-5 pt-0 mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Payments</h1>
        </div>

        <div className="bg-amber-50 w-full p-4 mb-6 flex items-center gap-2">
          <Image src={note} alt="note" width={30} height={30} />
          <p className="text-sm">
            Note: You can withdraw your funds once every{" "}
            <span className="font-medium">14 days</span>.
          </p>
        </div>

        <div className="w-full flex md:flex-row flex-col md:items-start items-center justify-between md:gap-0 gap-3">
          <div className="md:w-[59%] w-full px-2 flex flex-col bg-white gap-3">
            <div className="w-full flex flex-wrap gap-3">
              <div className="rounded-lg border border-slate md:w-[31%] sm:w-[48%] w-[98%] p-3 flex flex-col justify-between h-36">
                <div className="flex flex-col gap-2">
                  <div className="w-9 h-9 flex items-center justify-center rounded-full bg-[#E6E6E6]">
                    <Image src={money} alt="message" width={14} height={14} />
                  </div>
                  <h3 className="text-gray-700 text-xs">Total Earnings</h3>
                </div>
                <h2 className="text-black text-base font-semibold">$2,300</h2>
              </div>
              <div className="rounded-lg border border-slate md:w-[31%] sm:w-[48%] w-[98%] p-3 flex flex-col justify-between h-36">
                <div className="flex flex-col gap-2">
                  <div className="w-9 h-9 flex items-center justify-center rounded-full bg-[#FEF8E5]">
                    <Image src={clock} alt="message" width={14} height={14} />
                  </div>
                  <h3 className="text-gray-700 text-xs">Pending Balance</h3>
                </div>
                <h2 className="text-black text-base font-semibold">$320</h2>
              </div>
              <div className="rounded-lg border border-slate md:w-[31%] sm:w-[48%] w-[98%] p-3 flex flex-col justify-between h-36">
                <div className="flex flex-col gap-2">
                  <div className="w-9 h-9 flex items-center justify-center rounded-full bg-[#D6FFCC]">
                    <Image src={dollar} alt="message" width={14} height={14} />
                  </div>
                  <h3 className="text-gray-700 text-xs">
                    Available for Withdrawal
                  </h3>
                </div>
                <h2 className="text-black text-base font-semibold">$1,450</h2>
              </div>
            </div>

            <div className="md:w-[55%] sm:w-[75%] w-[99%] flex flex-col justify-between h-36 bg-[#F2F2F2] rounded-lg px-2 py-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-[#635BFF]">
                  <Image src={stripe} alt="message" width={14} height={14} />
                </div>
                <h3 className="text-gray-700 text-xs">
                  Manage your billing details on Stripe
                </h3>
              </div>
              <Link
                href={"#"}
                className="w-full rounded-lg p-3 bg-[#A3D154] flex items-center justify-center gap-2"
              >
                <span className="text-white font-semibold text-sm">
                  Billing Information
                </span>
                <Image src={linkIcon} alt="message" width={14} height={14} />
              </Link>
            </div>
          </div>
          <div className="md:w-[39%] w-full bg-white rounded-lg border border-slate">
            <div className="flex justify-between items-center p-4">
              <h2 className="font-semibold text-gray-900">
                Transaction history
              </h2>
              <button onClick={openModal} className="text-gray-500 text-sm">
                View All
              </button>
            </div>
            {[...Array(7)].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-16 h-14 ${
                      i % 2 === 0 ? "bg-black" : "bg-[#e8f5e9]"
                    } rounded-lg flex items-center justify-center`}
                  >
                    {i % 2 === 0 ? (
                      <span className="text-white font-semibold">P</span>
                    ) : (
                      <span role="img" aria-label="books" className="text-lg">
                        📚
                      </span>
                    )}
                  </div>
                  <span className="text-gray-700 text-sm">
                    UI/UX Prototyping with Proto.io
                  </span>
                </div>
                <div className="px-3 py-1 rounded-lg flex items-center justify-center bg-[#f2fafe] ">
                  <span className="text-sm text-[#99c183]">$150.5</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
