import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsync } from "../features/lobbies/lobby-slicer";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../assets/Room.css";
import Swal from "sweetalert2";

export default function Lobby({ playOnlineClick }) {
  const [name, setName] = useState("");
  const { lobbies, loading, error } = useSelector((state) => state.lobbies);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function createLobby() {
    try {
      const { data } = await axios.post(
        `https://server.whisnu29.tech/lobby`,
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
        title: `Created Lobby ${name}`,
        icon: "success",
      });
      dispatch(fetchAsync());
    } catch (error) {
      console.log(error.response.data.message);
      Swal.fire({
        title: error.response.data.message,
        icon: "error",
      });
    }
  }

  async function deleteLobby(id, name) {
    try {
      const { data } = await axios.delete(
        `https://server.whisnu29.tech/lobby/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }
      );
      dispatch(fetchAsync());
      Swal.fire({
        title: `Success Delete Lobby ${name}`,
        icon: "success",
      });
      navigate(`/lobby`);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.response.data.message,
      });
    }
  }

  function nameOnChange(event) {
    setName(event.target.value);
  }

  useEffect(() => {
    dispatch(fetchAsync());
  }, []);

  if (loading) return <h1>Loading...</h1>;
  return (
    <div className="w-full flex flex-col ">
      <div
        data-theme="coffee"
        className="w-full h-6/6  p-6 m-auto  rounded-md shadow-md ring-2 lg:max-w-lg mt-5"
      >
        <div className="inputGroup">
          <h1 className="text-3xl font-semibold text-center mb-5 pb-2 text-yellow-300">
            Create New Lobby
          </h1>
          <input
            type="text"
            name="chatroomName"
            id="chatroomName"
            placeholder="Insert Lobby's Name"
            className="p-2 text-yellow-300"
            onChange={nameOnChange}
          />
        </div>
        <button
          className="bg bg-blue-600 text-white text-xl p-2"
          onClick={createLobby}
        >
          Create Lobby
        </button>
      </div>
      <div className="grid gap-2 lg:grid-cols-4 px-10 mt-9">
        {lobbies.length > 0 &&
          lobbies.map((lobby) => (
            <div
              className="w-3/4 rounded-lg shadow-md lg:max-w-sm p-2 mt-1 mb-2 "
              data-theme="autumn"
              key={lobby.id}
            >
              <p className="text-xl flex justify-center">{lobby.name}</p>
              <p className="text-gray-400 text-xs flex justify-center">
                {lobby.User.email}
              </p>

              <div className="flex justify-center">
                <Link to={"/"}>
                  <div className="join mt-2 text-sm" onClick={playOnlineClick}>
                    Join
                  </div>
                </Link>
                <Link
                  to={{
                    pathname: `/lobby/${lobby.id}`,
                  }}
                  state={{
                    id: lobby.id,
                    name: lobby.name,
                  }}
                >
                  <div className="join mt-2 ml-2 text-sm bg bg-purple-300">
                    Rename
                  </div>
                </Link>

                <div
                  className="join mt-2 ml-2 text-sm bg bg-red-400"
                  onClick={() => {
                    deleteLobby(lobby.id, lobby.name);
                  }}
                >
                  Delete
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
