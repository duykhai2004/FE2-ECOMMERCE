'use client';

import { Order } from "@prisma/client";
import { useRouter } from "next/navigation";

interface OrderDetailsProps {
    order: Order;
}

const OrderDetails:React.FC<OrderDetailsProps> = ({order}) => {
    const router = useRouter();
    return ( <div>
        
    </div> );
}
 
export default OrderDetails;