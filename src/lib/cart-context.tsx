"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { CartItem, Product } from "./data";

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, size: string) => void;
  removeItem: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("senora-cart");
    const savedWishlist = localStorage.getItem("senora-wishlist");

    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse saved cart", e);
      }
    }

    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (e) {
        console.error("Failed to parse saved wishlist", e);
      }
    }

    setIsHydrated(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("senora-cart", JSON.stringify(items));
    }
  }, [items, isHydrated]);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("senora-wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist, isHydrated]);

  const addItem = useCallback((product: Product, size: string) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id && i.size === size);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id && i.size === size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { product, quantity: 1, size }];
    });
  }, []);

  const removeItem = useCallback((productId: string, size: string) => {
    setItems((prev) => prev.filter((i) => !(i.product.id === productId && i.size === size)));
  }, []);

  const updateQuantity = useCallback((productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId, size);
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.product.id === productId && i.size === size ? { ...i, quantity } : i
      )
    );
  }, [removeItem]);

  const clearCart = useCallback(() => setItems([]), []);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  }, []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice, wishlist, toggleWishlist }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
