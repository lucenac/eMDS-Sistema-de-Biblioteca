// src/contexts/CartContext.tsx
import { createContext, ReactNode, useMemo } from 'react';
import { Book } from '../types';

interface CartContextType {
  items: Book[];
  addItem: (book: Book) => void;
  removeItem: (bookId: string) => void;
  clearCart: () => void;
  checkout: () => Promise<void>;
}

export const CartContext = createContext({} as CartContextType);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  // Lógica de estado aqui...
  const value = useMemo(() => ({
    items: [],
    addItem: () => { },
    removeItem: () => { },
    clearCart: () => { },
    checkout: async () => { }
  } as CartContextType), []);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}