import React from "react";

const Payment = () => {
  return (
    <div>
      <h2 className="text-3xl font-semibold text-gray-900">
        Your Payment Details
      </h2>
      <p className="text-[#666666] mt-4">
        During the registration process, you’ll set your own default hourly rate
        and can offer discounts for 2 or more hour bookings if you wish.
        Students will pay for lessons via the Tafawwaq platform only after each
        lesson is complete—tutors do not receive direct payments from students
        at any time.
      </p>
      <p className="text-[#666666] mt-4">
        You’ll receive 65% of your hourly rate for each lesson, with Tafawwaq
        retaining a 35% platform fee. As an independent tutor, taxes and other
        fees are not withheld from your payments.
      </p>
      <p className="text-[#666666] mt-4">
        Tutor payments are issued via direct deposit, and you can opt for
        bimonthly payments. This allows you to receive payments in as little as
        5 business days following a submitted lesson.
      </p>
    </div>
  );
};

export default Payment;
