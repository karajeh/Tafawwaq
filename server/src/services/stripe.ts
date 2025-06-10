import Stripe from 'stripe';
import {
  PLATFORM_FEE_PERCENTAGE,
  STUDENT_SERVICE_FEE_PERCENTAGE,
  TEACHER_PAYOUT_PERCENTAGE,
} from '../constants/payment';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
  typescript: true,
});

interface ICheckOutObj {
  subject: string;
  teacherId: string;
  studentId: string;
  tutorName: string;
  date: Date;
  selectedHours: number;
  hourPrice: number;
}

// Create a checkout session
export const createCheckoutSessions = async ({
  subject,
  teacherId,
  studentId,
  tutorName,
  date,
  selectedHours,
  hourPrice,
}: ICheckOutObj) => {
  // Calculate costs
  const totalHoursCost = selectedHours * hourPrice; // e.g., $850
  const studentServiceFee = totalHoursCost * STUDENT_SERVICE_FEE_PERCENTAGE; // e.g., $85
  const totalCost = totalHoursCost + studentServiceFee; // e.g., $935
  const platformFee =
    totalHoursCost * PLATFORM_FEE_PERCENTAGE + studentServiceFee; // e.g., $382.5
  const teacherPayout = totalHoursCost * TEACHER_PAYOUT_PERCENTAGE; //

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [
      {
        price_data: {
          currency: 'usd',
          unit_amount: totalCost * 100, // Convert to cents
          product_data: {
            name: 'English teacher',
            description: `Tutor: ${tutorName} - Hourly Price: $${hourPrice} - Hours Booked: ${selectedHours} - Total Hour Cost: $${totalHoursCost} - Service Fee: $${studentServiceFee}`,
          },
        },
        quantity: 1,
      },
    ],
    payment_intent_data: {
      transfer_group: `lesson-${teacherId}-${studentId}`,
    },
    metadata: {
      subject,
      teacherId,
      studentId,
      date: date.toISOString(),
      duration: selectedHours,
      totalCost,
      studentServiceFee,
      platformFee,
      teacherPayout,
    },
    success_url: `${process.env.CLIENT_BASE_URL}/payment/success`,
    cancel_url: `${process.env.CLIENT_BASE_URL}/payment/cancel`,
  });

  return session.url;
};

// create connected account and return the account ID
export const generateConnectedAccountID = async (email: string) => {
  const account = await stripe.accounts.create({
    email,
    country: 'US',
    controller: {
      stripe_dashboard: {
        type: 'express',
      },
      fees: {
        payer: 'application',
      },
      losses: {
        payments: 'application',
      },
    },
  });

  return account.id;
};

// create account link for the connected account
export const getConnectedAccountOnboardingUrl = async (account: string) => {
  const accountLink = await stripe.accountLinks.create({
    account,
    refresh_url: `${process.env.CLIENT_BASE_URL}/teacher`,
    return_url: `${process.env.CLIENT_BASE_URL}/teacher`,
    type: 'account_onboarding',
  });

  return accountLink.url;
};

export const getDashboardLink = async (accountId: string) => {
  // Get the current logged-in teacher with req.userID

  const accountLink = await stripe.accounts.createLoginLink(accountId);
  return accountLink.url;
};

// Payout teacher
export const payoutTransfer = async ({
  amount,
  connectedAccountId,
  teacherId,
  lessonsIds,
}: {
  amount: number;
  connectedAccountId: string;
  teacherId: string;
  lessonsIds: string[];
}) => {
  return await stripe.transfers.create({
    amount: amount * 100, // Convert to cents
    currency: 'usd',
    destination: connectedAccountId,
    transfer_group: `teacher_${teacherId}`,
    metadata: {
      lessonsIds: JSON.stringify(lessonsIds),
      teacherId: JSON.stringify(teacherId),
    },
  });
};
