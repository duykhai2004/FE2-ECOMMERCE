import { buffer } from "micro";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";


export const config = {
  api: {
    bodyParser: false,
  },
};
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-04-10",
});
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("Webhook handler called");
  const buf = await buffer(req);
  const sig = req.headers["stripe-signature"];

  if (!sig) {
    return res.status(400).send("No signature");
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    return res.status(400).send(`Webhook Error: ${error}`);
  }
  console.log("Event type: " + event.type);
  switch (event.type) {
    
    
    case "charge.succeeded":
      const charge: any = event.data.object as Stripe.Charge;
      if (typeof charge.payment_intent === "string") {
        await prisma?.order.update({
          where: {
            paymentIntentId: charge.payment_intent,
          },
          data: {
            status: "complete",
            address: charge.shipping?.address,
          },
        });
      }
      break;
    default:
      console.log("Undefine event type: " + event.type);
  }

  res.json({ received: true})
  console.log("Webhook response sent successfully" + event.type);
}

