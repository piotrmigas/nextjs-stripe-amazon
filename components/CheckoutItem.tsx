import { StarIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { addToBasket, removeFromBasket } from '../redux/basketSlice';

type Props = {
  item: Product;
};

export default function CheckoutItem({ item: { image, title, rating, description, price, hasPrime, id } }: Props) {
  const dispatch = useDispatch();

  const addItemToBasket = () => {
    const product = { image, title, rating, description, price, hasPrime, id };
    dispatch(addToBasket(product));
  };

  const removeItemFromBasket = () => {
    dispatch(removeFromBasket({ id }));
  };

  return (
    <div className='grid grid-cols-5'>
      <Image src={image} width={200} height={200} alt='' objectFit='contain' />
      <div className='col-span-3 mx-5'>
        <p>{title}</p>
        <div>
          {Array(rating)
            .fill(undefined)
            .map((_, i) => (
              <StarIcon key={i} className='h-5 text-yellow-500' />
            ))}
        </div>
        <p className='text-xs my-2 line-clamp-3'>{description}</p>
        {Intl.NumberFormat('pl', {
          style: 'currency',
          currency: 'PLN',
        }).format(price)}
        {hasPrime && (
          <div className='flex items-center space-x-2'>
            <img src='/img/prime.png' alt='' className='w-12' />
            <p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
          </div>
        )}
      </div>
      <div className='flex flex-col space-y-2 my-auto justify-self-end'>
        <button className='button' onClick={addItemToBasket}>
          Add to Basket
        </button>
        <button className='button' onClick={removeItemFromBasket}>
          Remove from Basket
        </button>
      </div>
    </div>
  );
}
