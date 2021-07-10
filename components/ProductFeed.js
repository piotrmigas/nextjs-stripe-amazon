import Product from "./Product";

const ProductFeed = ({ products }) => {
  return (
    <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto">
      {products.slice(0, 4).map((product) => (
        <Product key={product.id} product={product} />
      ))}
      <img src="/img/banner4.jpg" className="md:col-span-full" alt="" />
      <div className="md:col-span-2">
        {products.slice(4, 5).map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
      {products.slice(5, products.length).map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductFeed;
