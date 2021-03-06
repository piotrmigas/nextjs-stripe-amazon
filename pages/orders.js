import moment from "moment";
import { getSession, useSession } from "next-auth/client";
import Order from "../components/Order";
import Header from "../components/Header";
import db from "../firebase";

const Orders = ({ orders }) => {
  const [session] = useSession();

  return (
    <div>
      <Header />
      <main className="max-screen-lg mx-auto p-10">
        <h1 className="text-3x1 border-b mb-2 pb-1 border-yellow-400">Your Orders</h1>
        {session ? <h2>{orders.length} Orders</h2> : <h2>Please sign in to see your orders</h2>}
        <div className="mt-5 space-y-4">
          {orders?.map((order) => (
            <Order order={order} key={order.id} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Orders;

export async function getServerSideProps(context) {
  const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
  const session = await getSession(context);

  if (!session) {
    return {
      props: {},
    };
  }

  const stripeOrders = await db
    .collection("users")
    .doc(session.user.email)
    .collection("orders")
    .orderBy("timestamp", "desc")
    .get();

  const orders = await Promise.all(
    stripeOrders.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      amountShipping: order.data().amount_shipping,
      images: order.data().images,
      timestamp: moment(order.data().timestamp.toDate()).unix(),
      items: (await stripe.checkout.sessions.listLineItems(order.id, { limit: 100 })).data,
    }))
  );

  return { props: { orders, session } };
}
