import React, { useState } from "react";
import LoadingButton from "../Components/LoadingButton";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { GenerateRequest } from "../App/HttpActions";

type errors = {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<errors>({});
  const [shakeError, setShakeError] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password: string) => {
    // Regex for at least one uppercase letter, one symbol, one number, and minimum 8 characters
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: errors = {};

    if (!username) newErrors.username = "Username is required";
    if (!email) newErrors.email = "Email is required";
    else if (!validateEmail(email)) newErrors.email = "Invalid email format";
    if (!password) newErrors.password = "Password is required";
    else if (!validatePassword(password)) {
      newErrors.password =
        "Password must contain at least 8 characters, an uppercase letter, a number, and a symbol.";
    }
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setShakeError(true); // Trigger shake animation
      setTimeout(() => setShakeError(false), 300); // Reset shake
    } else {
      setLoading(true);
      try {
        const createAccount = GenerateRequest<string>({
          type: "post",
          url: `https://localhost:7258/api/Auth/signup?username=${username}&email=${email}&password=${password}`,
        });

        const r = await createAccount();

        if (!r.isOk) {
          toast.error(r.error?.response?.data ?? "Account creation failed");
          return;
        }

        toast.success("Account successfully created!");
        setTimeout(() => navigate("/auth/login"), 500);
      } catch (error) {
        console.error("Error during account creation:", error);
        toast.error("An unexpected error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="lg:w-[550px] lg:mt-40 lg:mx-auto">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-6xl font-bold mb-16">Sign up</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              placeholder="Enter your username"
              value={username}
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
              Email
            </label>
            <input
              type="email"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              placeholder="abc@abc.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p
                className={`text-red-500 text-sm ${
                  shakeError ? "error-shake" : ""
                }`}
              >
                {errors.email}
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
              value={password}
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
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Confirm password
            </label>
            <input
              type="password"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              placeholder="Password confirmation"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && (
              <p
                className={`text-red-500 text-sm ${
                  shakeError ? "error-shake" : ""
                }`}
              >
                {errors.confirmPassword}
              </p>
            )}
          </div>
          <div className="grid grid-cols-2">
            <LoadingButton loading={loading}>Sign up</LoadingButton>
          </div>
        </form>
      </div>
      <div className="flex gap-2 mx-2 mt-4">
        <span>Already have an account?</span>
        <a href="/auth/login" className="text-blue-700">
          <strong>Log in</strong>
        </a>
      </div>
    </div>
  );
}

export default Signup;
