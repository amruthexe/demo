"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useNotification } from "./Notification";

interface CartItem {
  product: {
    _id: string;
    name: string;
    description: string;
    imageUrl: string;
  };
  variant: {
    type: string;
    price: number;
  };
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalAmount: number;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const { data: session, status } = useSession();
  const { showNotification } = useNotification();

  // Reset cart when user logs out or session changes
  useEffect(() => {
    if (status === "unauthenticated") {
      setItems([]);
      localStorage.removeItem("cart");
    }
  }, [status]);

  // Load cart from localStorage when component mounts
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart)) {
          setItems(parsedCart);
        }
      } catch (error) {
        console.error("Error loading cart:", error);
        localStorage.removeItem("cart");
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem("cart", JSON.stringify(items));
    }
  }, [items]);

  const addToCart = useCallback((item: CartItem) => {
    if (!item?.product?._id || !item?.variant?.price) {
      console.error("Invalid cart item:", item);
      return;
    }

    setItems((currentItems) => {
      const existingItemIndex = currentItems.findIndex(
        (i) =>
          i.product._id === item.product._id &&
          i.variant.type === item.variant.type
      );

      const newItems = [...currentItems];
      if (existingItemIndex > -1) {
        newItems[existingItemIndex].quantity += item.quantity;
      } else {
        newItems.push(item);
      }

      // Show notification after state update
      setTimeout(() => {
        showNotification(
          existingItemIndex > -1 ? "Cart updated!" : "Added to cart!",
          "success"
        );
      }, 0);

      return newItems;
    });
  }, [showNotification]);

  const removeFromCart = useCallback((productId: string) => {
    setItems((currentItems) => {
      const newItems = currentItems.filter((item) => item.product._id !== productId);
      // Show notification after state update
      setTimeout(() => {
        showNotification("Item removed from cart", "success");
      }, 0);
      return newItems;
    });
  }, [showNotification]);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.product._id === productId
          ? { ...item, quantity }
          : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setItems([]);
    localStorage.removeItem("cart");
    // Show notification after state update
    setTimeout(() => {
      showNotification("Cart cleared", "success");
    }, 0);
  }, [showNotification]);

  const totalAmount = items.reduce((sum, item) => {
    if (!item?.variant?.price) return sum;
    return sum + (Number(item.variant.price) * item.quantity);
  }, 0);

  const totalItems = items.reduce((sum, item) => sum + (item.quantity || 0), 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalAmount,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
} 