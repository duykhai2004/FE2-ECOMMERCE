"use client";

import {
  CartProductType,
  SelectedImgType,
} from "@/app/product/[productId]/ProductDetails";
import Image from "next/image";

interface ProductImageProps {
  cartProuduct: CartProductType;
  product: any;
  handleColorSelect: (value: SelectedImgType) => void;
}

const ProductImage: React.FC<ProductImageProps> = ({
  cartProuduct,
  product,
  handleColorSelect,
}) => {
  return (
    <div
      className="
    grid
    grid-cols-6
    gap-2
    h-full
    max-h-[500px]
    min-h-[300px]
    sm:min-h-[400px]
    "
    >
      <div
        className="
        flex
        flex-col
        items-center
        justify-center
        gap-4
        cursor-pointer
        border
        h-full
        max-h-[500px]
        min-h-[300px]
        sm:min-h-[400px]
        "
      >
        {product.images.map((image: SelectedImgType) => {
            return <div key={image.color} className={`relative w-[80%]
            aspect-square rounded border-teal-300
            ${
                cartProuduct.selectedImg.color === image.color ? "border-[1.5px]" : "border-none"
            }
            `} onClick={()=>{
                handleColorSelect(image)
            
            }}>
               <Image
               src={image.image}
               alt={product.color}
               fill
               className="object-contain"
               />
            </div>
        })}
      </div>
      <div className="col-span-5 relative
      aspect-square
      
      ">
        <Image 
        alt={cartProuduct.name}
        fill
        src={cartProuduct.selectedImg.image}
        className="
        w-full
        object-contain
        max-h-[500px]
        min-h-[300px]
        sm:min-h-[400px]
        "
        />
      </div>
    </div>
  );
};

export default ProductImage;
