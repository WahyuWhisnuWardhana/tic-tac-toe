import { Link } from "react-router-dom";

export default function Register({
  handleLogin,
  emailOnChange,
  passwordOnChange,
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
              className="h-14 rounded w-full border px-3 text-xl"
              placeholder="Email"
              onChange={emailOnChange}
            />

            <input
              type="password"
              className="h-14 mt-3 rounded w-full border px-3 text-xl "
              placeholder="Password"
              onChange={passwordOnChange}
            />

            <div className="flex justify-end items-center mt-2">
              <Link to={"/login"}>
                <p className="text-gray-400 hover:text-yellow-300 text-xl mb-10">
                  Already have an account?
                </p>
              </Link>
            </div>

            <button className="uppercase p-8 h-full  text-xl text-white w-full rounded bg-red-700 hover:bg-red-800">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
