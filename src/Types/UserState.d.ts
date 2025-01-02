type State = {
	userId: number; // User ID for fetching personalized data.
	cartCount: number; // Total items in the cart, shown as a badge on cart icon.
	isAuthenticated: AuthState; // User authentication status.
	username?: string; // Display user's name in the navbar or header.
	role: Role;
	currency?: string; // Optional: Currency for displaying prices (e.g., USD, EUR).
	cart: number[];
	wishlist: number[];
	accessToken?: string;
	refreshToken?: string;
};

type AuthState = "AUTH" | "LOADING" | "NOTAUTH";
