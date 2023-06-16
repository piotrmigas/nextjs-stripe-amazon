import Head from 'next/head';
import axios from 'axios';
import { getSession } from 'next-auth/react';
import Header from '../components/Header';
import Banner from '../components/Banner';
import ProductFeed from '../components/ProductFeed';
import { GetServerSideProps } from 'next';

type Props = {
  products: Product[];
};

export default function Home({ products }: Props) {
  return (
    <div className='bg-gray-100'>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <main className='max-w-screen-2xl mx-auto'>
        <Banner />
        <ProductFeed products={products} />
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const { data } = await axios('https://fakestoreapi.com/products');

  return {
    props: { products: data, session },
  };
};
