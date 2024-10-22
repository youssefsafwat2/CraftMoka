import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";

export default function PasswordReset() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use the useNavigate hook
  const [email, setEmail] = useState("");
  const { resetStatus, resetMessage, error } = useSelector(
    (state) => state.auth
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email)); // Dispatch the forgotPassword action with the email
  };

  // Navigate to the confirmation page on successful reset
  useEffect(() => {
    if (resetStatus === "succeeded") {
      navigate("/reset-confirmation"); // Navigate to the confirmation page
    }
  }, [resetStatus, navigate]);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            style={{ maxWidth: "105px", height: "auto" }}
            alt="CraftMoka"
            src="public/img/craft-moka-logo.png"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Reset your password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {` Enter your email address below and we'll send you a link to reset
            your password.`}
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Handle email input
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#A03907] sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#A03907] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A03907]"
                disabled={resetStatus === "loading"}
              >
                {resetStatus === "loading" ? "Sending..." : "Send Reset Link"}
              </button>
            </div>
          </form>

          {resetStatus === "failed" && (
            <p className="mt-4 text-center text-sm text-red-500">{error}</p>
          )}

          <p className="mt-10 text-center text-sm text-gray-500">
            Remembered your password?{" "}
            <Link
              to="/signin" // Link to the Sign In page
              className="font-semibold leading-6 text-[#A03907] hover:text-[#A03907] focus:outline-none focus:ring-2 focus:ring-[#A03907]"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
