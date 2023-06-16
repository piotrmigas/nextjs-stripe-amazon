import Image from 'next/image';
import { useSelector } from 'react-redux';
import { useSession } from 'next-auth/react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { selectItems, selectTotal } from '../redux/basketSlice';
import Header from '../components/Header';
import CheckoutItem from '../components/CheckoutItem';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string);

export default function Checkout() {
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const { data: session } = useSession();

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;
    const checkoutSession = await axios.post('/api/create-checkout-session', {
      items,
      email: session?.user?.email,
    });

    const result = await stripe?.redirectToCheckout({ sessionId: checkoutSession.data.id });
    if (result?.error) alert(result.error.message);
  };

  return (
    <div className='bg-gray-100'>
      <Header />
      <main className='lg:flex max-w-screen-2xl mx-auto'>
        <div className='flex-grow m-5 shadow-sm'>
          <Image src='/img/checkoutBanner.png' alt='' width={1020} height={250} style={{ objectFit: 'contain' }} />
          <div></div>
          <div className='flex flex-col p-5 space-y-10 bg-white'>
            <h1 className='text-3xl border-b pb-4'>
              {items.length === 0 ? 'Your basket is empty.' : 'Your Shopping Basket'}
            </h1>
            {items.map((item) => (
              <CheckoutItem item={item} key={item.id} />
            ))}
          </div>
        </div>
        {items.length > 0 && (
          <div className='flex flex-col bg-white p-10 shadow-md'>
            <h2 className='whitespace-nowrap'>
              Subtotal ({items.length} items):{' '}
              <span className='font-bold'>
                {Intl.NumberFormat('pl', {
                  style: 'currency',
                  currency: 'PLN',
                }).format(total)}
              </span>
            </h2>
            <button
              onClick={createCheckoutSession}
              role='link'
              disabled={!session}
              className={`button mt-2 ${
                !session && 'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'
              }`}
            >
              {!session ? 'Sign in to checkout' : 'Proceed to checkout'}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
