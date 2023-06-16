import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Image from 'next/image';
import banner1 from '../public/img/banner1.jpg';
import banner2 from '../public/img/banner2.jpg';
import banner3 from '../public/img/banner3.jpg';

export default function Banner() {
  return (
    <div className='relative'>
      <div className='absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20' />
      <Carousel interval={5000} autoPlay infiniteLoop showStatus={false} showIndicators={false} showThumbs={false}>
        <div>
          <Image src={banner1} alt='' />
        </div>
        <div>
          <Image src={banner2} alt='' />
        </div>
        <div>
          <Image src={banner3} alt='' />
        </div>
      </Carousel>
    </div>
  );
}
