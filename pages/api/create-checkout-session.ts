import type { NextApiRequest, NextApiResponse } from 'next';

const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { items, email } = req.body;

  const transformedItems = items.map((item: Product) => ({
    description: item.description,
    quantity: 1,
    price_data: {
      currency: 'pln',
      unit_amount: item.price * 100,
      product_data: {
        name: item.title,
        images: [item.image],
      },
    },
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    shipping_rates: ['shr_1JBKroKgIpBOIIMtG4nzjHfs'],
    shipping_address_collection: {
      allowed_countries: ['US', 'GB', 'PL'],
    },
    line_items: transformedItems,
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_HOST}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_HOST}/checkout`,
    metadata: {
      email,
      images: JSON.stringify(items.map((item: Product) => item.image)),
    },
  });

  res.status(200).json({ id: session.id });
}
