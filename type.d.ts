type Product = {
  rating?: number;
  hasPrime?: boolean;
  id: number;
  title: string;
  price;
  description: string;
  category: string;
  image: string;
};

type Order = {
  id: number;
  amount: number;
  amountShipping: number;
  items: Product[];
  timestamp: number;
  images: string[];
};
