import { createContext, useContext, useState, useCallback } from 'react';

const CartContext = createContext(null);

const BASE_PRICE = 299;
const SETUP_FEE = 99;

export function CartProvider({ children }) {
  const [selected, setSelected] = useState(new Set());

  const toggle = useCallback((id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const remove = useCallback((id) => {
    setSelected((prev) => { const n = new Set(prev); n.delete(id); return n; });
  }, []);

  const clear = useCallback(() => setSelected(new Set()), []);
  const isSelected = (id) => selected.has(id);

  return (
    <CartContext.Provider value={{ selected, toggle, remove, clear, isSelected, BASE_PRICE, SETUP_FEE }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
