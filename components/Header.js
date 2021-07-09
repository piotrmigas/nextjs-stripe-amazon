import Image from "next/image";
import { MenuIcon, SearchIcon, ShoppingCartIcon } from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const Header = () => {
  const [session] = useSession();
  const router = useRouter();
  const { items } = useSelector((state) => state.basket);

  return (
    <header>
      <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
          <Image
            onClick={() => router.push("/")}
            alt=""
            src="/img/amazon.png"
            width={150}
            height={40}
            objectFit="contain"
            className="cursor-pointer"
          />
        </div>
        <div className="hidden sm:flex flex-grow items-center h-10 rounded-md bg-yellow-400 hover:bg-yellow-500 cursor-pointer">
          <input type="text" className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4" />
          <SearchIcon className="h-12 p-4" />
        </div>
        <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
          <div className="link" onClick={!session ? signIn : signOut}>
            <p>{session ? `Hello ${session.user.name}` : "Sign In"}</p>
            <p className="font-extrabold md:text-sm">Account &amp; Lists</p>
          </div>
          <div className="link" onClick={() => router.push("/orders")}>
            <p>Returns</p>
            <p className="font-extrabold md:text-sm">&amp; Orders</p>
          </div>
          <div className="relative link flex items-center" onClick={() => router.push("/checkout")}>
            <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">
              {items.length}
            </span>
            <ShoppingCartIcon className="h-10" />
            <p className="hidden md:inline font-extrabold md:text-sm mt-2">Basket</p>
          </div>
        </div>
      </div>
      <div className="p-2 pl-6 flex items-center space-x-3 bg-amazon_blue-light text-white text-sm">
        <p className="link flex items-center">
          <MenuIcon className="h-6 mr-1" /> All
        </p>
        <p className="link">Prime Video</p>
        <p className="link">Amazon Business</p>
        <p className="link">Today&apos;s Deals</p>
        <p className="link hidde lg:inline-flex">Electronics</p>
        <p className="link hidde lg:inline-flex">Food &amp; Grocery</p>
        <p className="link hidde lg:inline-flex">Prime</p>
        <p className="link hidde lg:inline-flex">Buy Again</p>
        <p className="link hidde lg:inline-flex">Shopper Toolkit</p>
        <p className="link hidde lg:inline-flex">Health &amp; Personal Care</p>
      </div>
    </header>
  );
};

export default Header;
