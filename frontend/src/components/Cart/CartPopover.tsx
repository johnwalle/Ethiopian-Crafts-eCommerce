"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { ShoppingCart } from "lucide-react";
import {
  getCartRequest,
  removeCartItemRequest,
  clearCartRequest,
} from "@/api/cart/cartAPI";
import { showToast } from "nextjs-toast-notify";
import useCheckout from "@/hooks/useCheckout";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface CartItem {
  _id: string;
  ProductItem: string;
  ProductName: string;
  productImage?: string;
  quantity: number;
  price: number;
}

const CartPopover: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.user.user?.user);

  const { checkoutHandler, isLoading: checkoutLoading, error: checkoutError } = useCheckout();

  // ✅ Fetch cart from backend
  const fetchCart = useCallback(async () => {
    if (!user) return;
    try {
      setLoading(true);
      const data = await getCartRequest();
      setCartItems(data.items || []);
      setTotalPrice(data.totalPrice || 0);
    } catch (error: unknown) {
      console.error("Failed to fetch cart:", error);
      showToast.error("Failed to fetch cart items.", {
        duration: 4000,
        position: "bottom-right",
      });
    } finally {
      setLoading(false);
    }
  }, [user]);

  // ✅ Fetch cart on mount + listen for "cartUpdated" event
  useEffect(() => {
    if (!user) {
      setCartItems([]);
      setTotalPrice(0);
      return;
    }

    fetchCart();

    const handleCartUpdated = () => {
      fetchCart();
    };

    window.addEventListener("cartUpdated", handleCartUpdated);
    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdated);
    };
  }, [fetchCart, user]);

  // ✅ Remove a single item
  const handleRemoveItem = async (ProductItem: string) => {
    if (!user) {
      setCartItems([]);
      setTotalPrice(0);
      return;
    }

    try {
      await removeCartItemRequest(ProductItem);
      showToast.success("Item removed from cart.", {
        duration: 4000,
        position: "bottom-right",
      });
      fetchCart();
    } catch (error: unknown) {
      console.error("Error removing item:", error);
      showToast.error("Failed to remove item.", {
        duration: 4000,
        position: "bottom-right",
      });
    }
  };

  // ✅ Clear entire cart
  const handleClearCart = async () => {
    if (!user) {
      showToast.error("Please log in to manage your cart.");
      return;
    }

    try {
      await clearCartRequest();
      showToast.success("Cart cleared successfully!", {
        duration: 4000,
        position: "bottom-right",
      });
      fetchCart();
    } catch (error: unknown) {
      console.error("Error clearing cart:", error);
      showToast.error("Failed to clear cart.", {
        duration: 4000,
        position: "bottom-right",
      });
    }
  };

  // ✅ Handle checkout using the useCheckout hook
  const handleCheckout = async () => {
    if (!user) {
      showToast.error("Please log in to proceed to checkout.");
      return;
    }

    try {
      const result = await checkoutHandler();
      if (result?.payment?.data?.checkout_url) {
        showToast.success("Redirecting to payment...", {
          duration: 3000,
          position: "bottom-right",
        });
        // The hook already opens the checkout URL in a new tab
      } else {
        showToast.error(result?.message || "Failed to initiate checkout", {
          duration: 4000,
          position: "bottom-right",
        });
      }
    } catch (error: unknown) {
      console.error("Checkout error:", error);

      let errorMessage = "Checkout failed";

      if (error instanceof Error) {
        errorMessage = error.message || errorMessage;
      }
      showToast.error(errorMessage, {
        duration: 4000,
        position: "bottom-right",
      });
    }
  };

  return (
    <Popover>
  <PopoverTrigger asChild>
    <Button
      variant="outline"
      className="relative hover:bg-gradient-to-r hover:from-gray-200 hover:to-gray-300 transition-all duration-300"
    >
      <ShoppingCart className="w-5 h-5" />

      {/* Cart badge only when logged in */}
      {user && cartItems.length > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center shadow-md">
          {cartItems.length}
        </span>
      )}
    </Button>
  </PopoverTrigger>

  <PopoverContent className="w-96 p-5 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 transition-all duration-300">
    {/* Header */}
    <div className="flex justify-between items-center mb-4">
      <h4 className="font-semibold text-xl text-gray-800 dark:text-gray-100">
        🛒 Your Cart
      </h4>

      {/* Clear button only if logged in + has items */}
      {user && cartItems.length > 0 && (
        <Button
          size="sm"
          variant="destructive"
          onClick={handleClearCart}
          className="text-xs font-semibold px-3 py-1"
        >
          Clear
        </Button>
      )}
    </div>

    {/* NOT LOGGED IN */}
    {!user && (
      <div className="text-center text-gray-500 py-10">
        <p className="font-medium text-gray-600 dark:text-gray-300">
          Please log in to view your cart 🛒
        </p>
        <p className="text-sm text-gray-400 mt-1">
          Sign in to add items and checkout
        </p>
      </div>
    )}

    {/* LOGGED IN – LOADING */}
    {user && loading && (
      <p className="text-center text-gray-500">Loading...</p>
    )}

    {/* LOGGED IN – EMPTY CART */}
    {user && !loading && cartItems.length === 0 && (
      <div className="text-center text-gray-500 py-10">
        <p className="font-medium text-gray-600 dark:text-gray-300">
          Your cart is empty 😔
        </p>
        <p className="text-sm text-gray-400 mt-1">
          Add some products to see them here!
        </p>
      </div>
    )}

    {/* LOGGED IN – CART ITEMS */}
    {user && cartItems.length > 0 && (
      <>
        <div className="max-h-72 overflow-y-auto space-y-4">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center border-b pb-3 hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-lg transition"
            >
              <div className="flex items-center gap-3">
                {item.productImage ? (
                  <img
                    src={item.productImage}
                    alt={item.ProductName}
                    className="w-12 h-12 object-cover rounded-md shadow-sm"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center text-gray-400 text-sm">
                    N/A
                  </div>
                )}

                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-100">
                    {item.ProductName}
                  </p>
                  <p className="text-xs text-gray-500">
                    Qty: {item.quantity} × ${item.price.toFixed(2)}
                  </p>
                </div>
              </div>

              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleRemoveItem(item.ProductItem)}
                className="text-xs font-medium px-3"
              >
                Remove
              </Button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-4 border-t pt-4 space-y-3">
          <div className="flex justify-between text-lg font-semibold text-gray-800 dark:text-gray-100">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

          <Button
            onClick={handleCheckout}
            disabled={checkoutLoading}
            className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold rounded-lg py-3 shadow-md hover:from-green-600 hover:to-teal-600 hover:scale-[1.02] transition-all duration-300"
          >
            {checkoutLoading ? "Processing..." : "Proceed to Checkout"}
          </Button>

          {checkoutError && (
            <p className="text-red-500 text-sm mt-2">{checkoutError}</p>
          )}
        </div>
      </>
    )}
  </PopoverContent>
</Popover>

  );
};

export default CartPopover;
