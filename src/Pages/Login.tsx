import { useState } from "react";
import { toast } from "react-toastify";
import { PostRequest } from "../App/HttpActions";
import LoadingButton from "../Components/LoadingButton";
import userStore from "../App/Store/user.ts";

type errors = {
  username?: string;
  password?: string;
};

type LoginProps = {
  credential: string;
  password: string;
  rememberMe: boolean;
};

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //const [remember, _] = useState(true);
  const [errors, setErrors] = useState<errors>({});
  const [shakeError, setShakeError] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const set = userStore((s) => s.set);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: errors = {};

    if (!username) newErrors.username = "Username is required";
    if (!password) newErrors.password = "Password is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setShakeError(true); // Trigger shake animation
      setTimeout(() => setShakeError(false), 300); // Reset shake
    } else {
      setLoading(true);
      try {
        const login = PostRequest<State, LoginProps>(
          `https://localhost:44309/api/Auth/login`,
        );

        const r = await login({
          credential: username,
          password: password,
          rememberMe: false,
        });

        if (!r.isOk || !r.data) {
          toast.error(r.error?.response?.data ?? "Login failed");
          return;
        }
        set({ ...r.data, isAuthenticated: "AUTH" });
      } catch (error) {
        console.error("Error during login:", error);
        toast.error("An unexpected error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <div className="lg:w-[550px] lg:mt-40 lg:mx-auto">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-6xl font-bold mb-16">Log in</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Username / Email
            </label>
            <input
              type="text"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && (
              <p
                className={`text-red-500 text-sm ${
                  shakeError ? "error-shake" : ""
                }`}
              >
                {errors.username}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p
                className={`text-red-500 text-sm ${
                  shakeError ? "error-shake" : ""
                }`}
              >
                {errors.password}
              </p>
            )}
          </div>
          <div className="grid grid-cols-2">
            <a
              href="/auth/restore"
              className="text-blue-700 text-end my-auto justify-self-start"
            >
              Forgot password?
            </a>
            <LoadingButton loading={loading}>Log in</LoadingButton>
          </div>
        </form>
      </div>
      <div className="flex gap-2 mx-2 mt-4">
        <span>New to Nature?</span>
        <a href="/auth/signin" className="text-blue-700">
          <strong>Join now</strong>
        </a>
      </div>
    </div>
  );
}

export default Login;
