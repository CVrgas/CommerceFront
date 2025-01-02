import React from "react";

function LoadingButton({
	loading,
	children,
}: {
	loading: boolean;
	children?: React.ReactElement | string;
}) {
	return (
		<button
			type="submit"
			className={`font-bold py-2 px-4 rounded col-start-2 mb-2 justify-self-end transition-all duration-200 ${
				loading
					? "bg-gray-400 text-white cursor-not-allowed"
					: "bg-blue-500 hover:bg-blue-700 text-white"
			}`}
			disabled={loading} // Disable button while loading
		>
			{loading ? (
				<div className="flex items-center">
					<svg
						className="animate-spin h-5 w-5 mr-2 text-white"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle
							className="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							strokeWidth="4"
						></circle>
						<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
						></path>
					</svg>
					Loading...
				</div>
			) : (
				children
			)}
		</button>
	);
}

export default LoadingButton;
