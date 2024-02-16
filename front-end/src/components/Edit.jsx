import axios from "axios";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";

export default function Edit({ url }) {
  const location = useLocation();
  const { id, name } = location.state;
  const navigate = useNavigate();
  async function updateLobby() {
    try {
      const { data } = await axios.put(
        `${url}/lobby/${id}`,
        {
          name: name,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }
      );
      Swal.fire({
        title: `Lobby Updated with name ${name}`,
        icon: "success",
      });
      navigate("/lobby");
    } catch (error) {
      console.log(error.response.data.message);
      Swal.fire({
        title: error.response.data.message,
        icon: "error",
      });
    }
  }

  function nameOnChange(event) {
    setName(event.target.value);
  }
  return (
    <div className="w-full flex flex-col ">
      <div
        data-theme="coffee"
        className="w-full h-6/6  p-6 m-auto  rounded-md shadow-md ring-2 lg:max-w-lg mt-5"
      >
        <div className="inputGroup">
          <h1 className="text-3xl font-semibold text-center mb-5 pb-2 text-yellow-300">
            Edit Lobby's Name
          </h1>
          <input
            type="text"
            name="lobbyName"
            id="lobbyName"
            placeholder={name}
            className="p-2 text-yellow-300"
            onChange={nameOnChange}
          />
        </div>
        <button
          className="bg bg-purple-600 text-white text-xl p-2"
          onClick={updateLobby}
        >
          Edit
        </button>
      </div>
    </div>
  );
}
