import { useState } from 'react';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/solid';
import { useDispatch } from 'react-redux';
import { addToBasket } from '../redux/basketSlice';

const MAX_RATING = 5;
const MIN_RATING = 1;

type Props = {
  product: Product;
};

export default function Product({ product: { id, title, price, description, category, image } }: Props) {
  const [rating] = useState(Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING);
  const [hasPrime] = useState(Math.random() < 0.5);

  const dispatch = useDispatch();

  const addItemToBasket = () => {
    const product = { id, title, price, description, category, image, hasPrime };
    dispatch(addToBasket(product));
  };

  return (
    <div className='relative flex flex-col m-5 bg-white z-30 p-10'>
      <p className='absolute top-2 right-2 text-xs italic text-gray-400'>{category}</p>
      <Image src={image} height={200} width={200} style={{ objectFit: 'contain' }} alt='' />
      <h4 className='my-3'>{title}</h4>
      <div className='flex'>
        {Array(rating)
          .fill(undefined)
          .map((_, i) => (
            <StarIcon className='h-5 text-yellow-500' key={i} />
          ))}
      </div>
      <p className='text-xs my-2 line-clamp-2'>{description}</p>
      <div className='mb-5'>
        {Intl.NumberFormat('pl', {
          style: 'currency',
          currency: 'PLN',
        }).format(price)}
      </div>
      {hasPrime && (
        <div className='flex items-center space-x-2 -mt-5'>
          <img className='w-12' src='/img/prime.png' alt='' />
          <p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
        </div>
      )}
      <button onClick={addItemToBasket} className='mt-auto button'>
        Add to Basket
      </button>
    </div>
  );
}
