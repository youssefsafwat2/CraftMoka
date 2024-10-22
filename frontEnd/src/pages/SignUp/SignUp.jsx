// components/SignUp.jsx
import { useDispatch } from "react-redux";
import { useState } from "react";
import { signup, login } from "../../redux/slices/authSlice"; // Import both actions
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate that passwords match
    if (password !== passwordConfirm) {
      setError("Passwords do not match");
      return;
    }

    // Dispatch the signup action
    dispatch(signup({ name, email, password, passwordConfirm }))
      .unwrap()
      .then((data) => {
        // Handle successful signup
        console.log("Signup successful!", data);

        // Dispatch login action with user data
        dispatch(login({ user: data.user, token: data.token }));

        // Store token in local storage
        localStorage.setItem("token", data.token);

        // Navigate to the root page
        navigate("/");
      })
      .catch((err) => {
        setError(err.message || "An unknown error occurred"); // Set error message
      });
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          style={{ maxWidth: "105px", height: "auto" }}
          alt="craftMoka"
          src="public/img/craft-moka-logo.png"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create a new account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-red-500">{error}</p>}{" "}
          {/* Display error */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                required
                autoComplete="username"
                onChange={(e) => setName(e.target.value)} // Update state
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#A03907] sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)} // Update state
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#A03907] sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)} // Update state
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#A03907] sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Confirm Password
            </label>
            <div className="mt-2">
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                required
                autoComplete="new-password"
                onChange={(e) => setPasswordConfirm(e.target.value)} // Update state
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#A03907] sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-[#A03907] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#A03907] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A03907]"
            >
              Sign Up
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="font-semibold leading-6 text-[#A03907] hover:text-[#A03907] focus:outline-none focus:ring-2 focus:ring-[#A03907]"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
