import { Container } from "@mui/material";
import ListRating from "./ListRating";
import OrderDetails from "./OrderDetails";
import getOrderById from "@/actions/getOrderById";

interface IParams {
  orderId?: string;
}

const Order = async ({ params }: { params: IParams }) => {
  const order = await getOrderById({ orderId: params.orderId });
  return (
    <div className="p-8">
      <Container>
        <OrderDetails order={order} />
      </Container>
    </div>
  );
};

export default Order;
