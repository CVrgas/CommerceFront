import { create } from "zustand";
import { getCookie, setCookie } from "typescript-cookie";

interface UserState {
  user: State;
  set: (newState: State) => void;
  setAuth: (auth: AuthState) => void;
  setDefault: () => void;
}

const initialState: State = {
  userId: 0,
  cartCount: 0,
  isAuthenticated: "NOTAUTH",
  username: "",
  role: "guest",
  currency: "",
  cart: [],
  wishlist: [],
  accessToken: undefined,
  refreshToken: undefined,
};

const defaultState: State = (() => {
  const cookie = getCookie("state");
  if (!cookie) {
    setCookie("state", JSON.stringify(initialState));
    return initialState;
  }

  try {
    const cookieState = JSON.parse(cookie);
    return cookieState as State;
  } catch (error) {
    console.error("Error parsing state cookie:", error);
    return initialState;
  }
})();

const userStore = create<UserState>((set) => ({
  user: defaultState,
  set: (newState) => {
    setCookie("state", JSON.stringify(newState));
    return set({ user: newState });
  },
  setDefault: () =>
    set(() => {
      setCookie("state", JSON.stringify({ ...initialState }));
      return { user: initialState };
    }),
  setAuth: (auth: AuthState) =>
    set((state) => ({ user: { ...state.user, isAuthenticated: auth } })),
}));

export default userStore;
