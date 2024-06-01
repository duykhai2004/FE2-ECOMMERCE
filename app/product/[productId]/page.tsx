import { Container } from "@mui/material";
import ProductDetails from "./ProductDetails";
import ListRating from "./ListRating";
import { products } from "@/utils/products";
import getProductById from "@/actions/getProductById";
import NullData from "@/app/components/products/NullData";

interface IParams {
  productId?: string;
}

const Product = async ({params}: {params:IParams}) => {

  const product = await getProductById(params);
  if (!product) {
    return <NullData title="No product"></NullData>
  }
   return (
    <div className="p-8">
      <Container>
        <ProductDetails product={product} /> 
        <div className="flex flex-col mt-20 gap-4">
          <div>Add Rating</div>
          <ListRating product={product} />
        </div>
      </Container>
    </div>
  );
};

export default Product;
