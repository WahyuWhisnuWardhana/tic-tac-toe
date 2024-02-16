import { useNavigate, Link } from "react-router-dom";

export default function Nav() {
  const navigate = useNavigate();

  function refreshOnClick() {
    navigate(`/lobby`);
  }

  function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <div data-theme="coffee" className="navbar">
      <div className="flex-1 ">
        <button
          onClick={refreshOnClick}
          className="btn btn-ghost text-xl text-yellow-300	hover:!text-yellow-300 navbar-start w-fit"
        >
          Home
        </button>
        {/* <Link to="/categories"> */}
        <button className="btn btn-ghost text-xl text-orange-300	hover:!text-orange-600 w-fit">
          Match History
        </button>
        {/* </Link> */}
      </div>
      <div className="navbar-center hidden lg:flex">
        <button
          onClick={handleLogout}
          className="btn btn-ghost text-xl text-red-600	hover:!text-red-300"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
