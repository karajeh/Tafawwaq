import { Request, Response } from 'express';
import Stripe from 'stripe';
import { stripe } from '../services/stripe';
import { updateConnectedTeacherAction } from '../actions/teacherActions';
import logger from '../utils/logger';
import {
  createLessonAction,
  markPayoutsAsTransferred,
} from '../actions/lessonActions';

export const stripeWebhookController = async (req: Request, res: Response) => {
  try {
    let event = req.body;
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (endpointSecret) {
      // get the signature from the header
      const signature = req.headers['stripe-signature'] as string;

      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          signature,
          endpointSecret,
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err);
      }
    }

    switch (event.type) {
      // When teacher account onboarding successfully -> Update DB to inform he is connected
      case 'account.updated':
        {
          const account = event.data.object as Stripe.Account;
          const isConnectedAccount =
            account.capabilities?.transfers === 'active';
          await updateConnectedTeacherAction(account.id, isConnectedAccount);
          logger.info(
            `Teacher account ${account.id} connected status updated to ${isConnectedAccount}`,
          );
        }
        break;
      // When student checkout successfully -> we should save new lesson
      case 'checkout.session.completed':
        {
          const session = event.data.object;
          const paymentIntentId = session.payment_intent as string;

          const {
            subject,
            teacherId,
            studentId,
            date,
            duration,
            totalCost,
            studentServiceFee,
            platformFee,
            teacherPayout,
          } = session.metadata as Stripe.MetadataParam;

          // Step 1: Create the lesson & hold teacher's money
          const payoutAvailableDate = new Date();
          payoutAvailableDate.setDate(payoutAvailableDate.getDate() + 14);

          // Create new lesson
          const newLesson = await createLessonAction({
            subject: subject as string,
            teacherId: teacherId as string,
            studentId: studentId as string,
            date: new Date(date as string),
            duration: Number(duration),
            totalCost: Number(totalCost),
            studentServiceFee: Number(studentServiceFee),
            platformFee: Number(platformFee),
            amountHeldForTeacher: Number(teacherPayout),
            payoutAvailableDate,
            stripeSessionId: session.id,
            stripePaymentIntentId: paymentIntentId,
          });

          logger.info(`New lesson created ${newLesson._id}`);
        }
        break;
      // Update lessons status to Transferred when a transfer is success
      case 'transfer.created':
        {
          const transfer = event.data.object;
          const teacherId = JSON.parse(transfer.metadata.teacherId);
          const lessonsIds = JSON.parse(transfer.metadata.lessonsIds);

          await markPayoutsAsTransferred(teacherId, lessonsIds);

          logger.info(
            `Lesson payout transfer updated ${lessonsIds.join(',')} related to teacher id ${teacherId}`,
          );
        }
        break;
      default:
        logger.warn(`Unhandled event type ${event.type}.`);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.sendStatus(200);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    logger.error(`Stripe webhook error: ${errorMessage}`);
    res.status(500).json({ message: 'An internal server error occurred' });
  }
};
