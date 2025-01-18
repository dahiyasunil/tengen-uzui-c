const Login = () => {
  return (
    <form>
      <div className="flex flex-col">
        <p className="mb-6 text-grey-100">
          <span className="font-semibold text-grey-500">Login</span> or
          <span className="font-semibold text-grey-500"> SignUp</span>
        </p>
        <div className="relative mb-4 flex flex-row rounded bg-white p-2">
          <span className="border-r border-grey-100 pr-1.5 text-grey-500">
            +91
          </span>
          <input
            type="tel"
            placeholder="Mobile Number"
            minLength="10"
            maxLength="10"
            className="w-10/12 rounded ps-2 text-grey-500 outline-none placeholder:text-sm"
            required
          />
        </div>
        <p className="mb-4 text-center text-grey-500">
          <small>
            By continuing, I agree to the{" "}
            <span className="font-semibold text-beige-700">Terms of Use</span> &
            <span className="font-semibold text-beige-700">
              {" "}
              Privacy Policy
            </span>
          </small>
        </p>
        <div>
          <button className="w-full rounded bg-grey-100 py-2 text-beige-100">
            Continue
          </button>
        </div>
      </div>
    </form>
  );
};

export default Login;
