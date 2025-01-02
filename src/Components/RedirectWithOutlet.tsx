import { Navigate, Outlet, useLocation } from "react-router-dom";

const RedirectWithOutlet = ({ redirectTo }: { redirectTo: string }) => {
	const location = useLocation();

	// Check if the current location is exactly the parent route
	if (location.pathname === redirectTo.replace(/\/[^/]*$/, "")) {
		return (
			<Navigate
				to={redirectTo}
				replace
			/>
		);
	}
	return <Outlet />;
};

export default RedirectWithOutlet;
