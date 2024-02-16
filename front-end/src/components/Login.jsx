import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

export default function Login({
  handleLogin,
  emailOnChange,
  passwordOnChange,
  googleLogin,
}) {
  return (
    <div className="flex justify-center" data-theme="cyberpunk">
      <div className="container h-screen flex justify-center items-center">
        <div className="p-8  rounded-lg  pb-10  h-6/6" data-theme="coffee">
          <div className="flex justify-center mb-4 mt-4 w-full m-auto">
            <img
              src="https://cdn-icons-png.flaticon.com/512/806/806131.png"
              width="75"
            />
          </div>
          <form className="space-y-6" onSubmit={handleLogin}>
            <input
              type="text"
              className="h-14 rounded w-full border px-3 text-xl text-yellow-300"
              placeholder="Email"
              onChange={emailOnChange}
            />

            <input
              type="password"
              className="h-14 mt-3 rounded w-full border px-3 text-xl text-yellow-300"
              placeholder="Password"
              onChange={passwordOnChange}
            />

            <div className="flex justify-end items-center mt-2">
              <Link to={"/register"}>
                <p className="text-gray-400 hover:text-yellow-300 text-xl mb-10">
                  Haven't made an account yet?
                </p>
              </Link>
            </div>

            <button className="h-full p-5 text-xl text-white w-full rounded bg-green-700 hover:bg-green-800">
              Login
            </button>
          </form>

          <div className="flex justify-between items-center mt-3">
            <hr className="w-full" />
            <span className="p-2 text-gray-400 mb-1">OR</span>
            <hr className="w-full" />
          </div>
          <div className="mt-6 flex justify-center items-center w-full">
            <GoogleLogin onSuccess={googleLogin} />
          </div>
        </div>
      </div>
    </div>
  );
}
