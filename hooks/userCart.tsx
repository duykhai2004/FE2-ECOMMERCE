import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

type CartContextType = {
  cartTotalQty: number;
  cartTotalAmount: number;
  cartProducts: CartProductType[] | null;
  handleAddProductToCart: (product: CartProductType) => void;
  handleRemoveProductFromCart: (product: CartProductType) => void;
  handleCartQtyIncrease: (product: CartProductType) => void;
  handleCartQtyDecrease: (product: CartProductType) => void;
  handleClearCart: () => void;
  paymentIntent: string | null;
  handleSetPaymentIntent: (val: string | null) => void;
};

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
  [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
  const [cartTotalQty, setCartTotalQty] = useState(0);
  const [cartTotalAmount, setCartTotalAmount] = useState(0);
  const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null);
  const [paymentIntent, setPaymentIntent] = useState<string | null>(null);

  useEffect(() => {
    const cartItems: any = localStorage.getItem("eShopCart-Items");
    const cProducts: CartProductType[] | null = cartItems ? JSON.parse(cartItems) : null;
    const eShopPaymentIntent: any = localStorage.getItem("eShopPaymentIntent");
    const paymentIntent: string | null = eShopPaymentIntent ? JSON.parse(eShopPaymentIntent) : null;
    setCartProducts(cProducts);
    setPaymentIntent(paymentIntent);
  }, []);

  useEffect(() => {
    const getTotals = () => {
      if (cartProducts) {
        const { total, qty } = cartProducts.reduce(
          (acc, item) => {
            const itemTotal = item.price * item.quantity;
            acc.total += itemTotal;
            acc.qty += item.quantity;
            return acc;
          },
          {
            total: 0,
            qty: 0,
          }
        );
        setCartTotalQty(qty);
        setCartTotalAmount(total);
      } else {
        setCartTotalQty(0);
        setCartTotalAmount(0);
      }
    };
    getTotals();
  }, [cartProducts]);

  const handleAddProductToCart = useCallback(
    (product: CartProductType) => {
      setCartProducts((prev) => {
        let updatedCart;
        if (prev) {
          const existingProductIndex = prev.findIndex(
            (item) =>
              item.id === product.id &&
              item.selectedImg.color === product.selectedImg.color
          );
          if (existingProductIndex > -1) {
            updatedCart = prev.map((item, index) =>
              index === existingProductIndex
                ? { ...item, quantity: item.quantity + product.quantity }
                : item
            );
          } else {
            updatedCart = [...prev, product];
          }
        } else {
          updatedCart = [product];
        }
        localStorage.setItem("eShopCart-Items", JSON.stringify(updatedCart));
        return updatedCart;
      });
      toast.success("Product added to cart");
    },
    [setCartProducts]
  );

  const handleRemoveProductFromCart = useCallback(
    (product: CartProductType) => {
      if (cartProducts) {
        const filteredProducts = cartProducts.filter(
          (item) =>
            !(item.id === product.id && item.selectedImg.color === product.selectedImg.color)
        );
        setCartProducts(filteredProducts);
        toast.success("Product removed");
        localStorage.setItem("eShopCart-Items", JSON.stringify(filteredProducts));
      }
    },
    [cartProducts]
  );

  const handleCartQtyIncrease = useCallback(
    (product: CartProductType) => {
      if (product.quantity === 20) {
        return toast.error("Maximum quantity is 20");
      }
      if (cartProducts) {
        const updatedCart = cartProducts.map((item) =>
          item.id === product.id &&
          item.selectedImg.color === product.selectedImg.color
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        setCartProducts(updatedCart);
        localStorage.setItem("eShopCart-Items", JSON.stringify(updatedCart));
      }
    },
    [cartProducts]
  );

  const handleCartQtyDecrease = useCallback(
    (product: CartProductType) => {
      if (product.quantity === 1) {
        return toast.error("Minimum quantity is 1");
      }
      if (cartProducts) {
        const updatedCart = cartProducts.map((item) =>
          item.id === product.id &&
          item.selectedImg.color === product.selectedImg.color
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
        setCartProducts(updatedCart);
        localStorage.setItem("eShopCart-Items", JSON.stringify(updatedCart));
      }
    },
    [cartProducts]
  );

  const handleClearCart = useCallback(() => {
    setCartProducts(null);
    setCartTotalQty(0);
    setCartTotalAmount(0);
    localStorage.setItem("eShopCart-Items", JSON.stringify(null));
  }, []);

  const handleSetPaymentIntent = useCallback(
    (val: string | null) => {
      setPaymentIntent(val);
      localStorage.setItem("eShopPaymentIntent", JSON.stringify(val));
    },
    []
  );

  const value = {
    cartTotalQty,
    cartTotalAmount,
    cartProducts,
    handleAddProductToCart,
    handleRemoveProductFromCart,
    handleCartQtyIncrease,
    handleCartQtyDecrease,
    handleClearCart,
    paymentIntent,
    handleSetPaymentIntent,
  };

  return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === null) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};
