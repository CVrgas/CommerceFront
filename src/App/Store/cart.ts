import { create } from "zustand";

interface CartState {
  Products: productItem[];
  Set: (id: number, quantity: number) => void;
  Add: (product: productItem) => void;
  Remove: (productId: number) => void;
  Update: (product: productItem) => void;
  Increment: (productId: number) => void;
  Decrement: (productId: number) => void;
}

interface productItem {
  id: number;
  quantity: number;
}

const defaultState: productItem[] = [];

const cartStore = create<CartState>((set) => ({
  Products: defaultState,

  Set: (id: number, quantity: number) => {
    set((state) => ({
      Products: state.Products.map((p) =>
        p.id === id ? { ...p, quantity: quantity } : p,
      ),
    }));
  },

  Add: (product: productItem) =>
    set((state) => ({ Products: [...state.Products, product] })),

  Remove: (productId: number) =>
    set((prev) => ({
      Products: prev.Products.filter((item) => item.id !== productId),
    })),

  Update: (product: productItem) =>
    set((prev) => ({ Products: [...prev.Products, product] })),

  Increment: (productId: number) =>
    set((state) => ({
      Products: state.Products.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity++ } : item,
      ),
    })),

  Decrement: (productId: number) =>
    set((state) => ({
      Products: state.Products.map((cart) =>
        cart.id === productId ? { ...cart, quantity: cart.quantity-- } : cart,
      ).filter((item) => item.quantity <= 0),
    })),
}));

export default cartStore;
