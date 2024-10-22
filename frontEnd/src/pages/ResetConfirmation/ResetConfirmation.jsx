export default function ResetConfirmation() {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
        <img
          style={{ maxWidth: "105px", height: "auto" }}
          alt="CraftMoka"
          src="public/img/craft-moka-logo.png"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Check your email
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          We have sent a password reset link to your email. Please check your
          inbox.
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <p className="text-center text-sm text-gray-500">
          Back to{" "}
          <a
            href="/signin" // Link to the Sign In page
            className="font-semibold leading-6 text-[#A03907] hover:text-[#A03907] focus:outline-none focus:ring-2 focus:ring-[#A03907]"
          >
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
