import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

export async function GET(request: Request) {
  const url = new URL(request.url);
  const sessionId = url.searchParams.get("sessionId");
  try {
    if (sessionId?.startsWith("cs_")) {
      const checkoutSession = await stripe.checkout.sessions.retrieve(
        sessionId,
        {
          expand: ["payment_intent", "line_items.data.price.product"],
        }
      );

      return NextResponse.json(checkoutSession, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(null, { status: 500 });
  }
}
