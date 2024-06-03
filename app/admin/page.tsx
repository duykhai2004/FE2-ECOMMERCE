import getOrders from "@/actions/getOrders";
import Summary from "./Summary";
import getProducts from "@/actions/getProducts";
import getUsers from "@/actions/getUsers";
import Container from "../components/Container";
import BarGraph from "./BarGraph";
import getGraphData from "@/actions/getGraphData";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "../components/products/NullData";

const Admin = async () => {


  const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role !== 'ADMIN') {
        return <NullData title="Oops! Access Denied"/>
    }

  const products = await getProducts({ category: null });
  const orders = await getOrders();
  const users = await getUsers();
  const graphData = await getGraphData();
  return (
    <div className="pt-8">
      <Container>
        <Summary products={products} orders={orders} users={users} />

      <div className="mt-4 mx-auto max-w[1150px]">
        <BarGraph data={graphData} />
      </div>

      </Container>
    </div>
  );
};

export default Admin;
