import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import { io } from "socket.io-client";
import "../assets/Board.css";
import Square from "../components/Square";
import Lobby from "./Lobby";

export default function TicTacToe() {
  const token = localStorage.access_token;
  const user = jwtDecode(token);
  const email = user.email;
  const [gameState, setGameState] = useState([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]);
  const [currentPlayer, setCurrentPlayer] = useState("circle");
  const [finishedState, setFinishetState] = useState(false);
  const [finishedArrayState, setFinishedArrayState] = useState([]);
  const [playOnline, setPlayOnline] = useState(false);
  const [socket, setSocket] = useState(null);
  const [playerName, setPlayerName] = useState("");
  const [opponentName, setOpponentName] = useState(null);
  const [playingAs, setPlayingAs] = useState(null);
  const navigate = useNavigate();
  const checkWinner = () => {
    for (let row = 0; row < gameState.length; row++) {
      if (
        gameState[row][0] === gameState[row][1] &&
        gameState[row][1] === gameState[row][2]
      ) {
        setFinishedArrayState([row * 3 + 0, row * 3 + 1, row * 3 + 2]);
        return gameState[row][0];
      }
    }

    // column dynamic
    for (let col = 0; col < gameState.length; col++) {
      if (
        gameState[0][col] === gameState[1][col] &&
        gameState[1][col] === gameState[2][col]
      ) {
        setFinishedArrayState([0 * 3 + col, 1 * 3 + col, 2 * 3 + col]);
        return gameState[0][col];
      }
    }

    if (
      gameState[0][0] === gameState[1][1] &&
      gameState[1][1] === gameState[2][2]
    ) {
      return gameState[0][0];
    }

    if (
      gameState[0][2] === gameState[1][1] &&
      gameState[1][1] === gameState[2][0]
    ) {
      return gameState[0][2];
    }

    const isDrawMatch = gameState.flat().every((e) => {
      if (e === "circle" || e === "cross") return true;
    });

    if (isDrawMatch) return "draw";

    return null;
  };

  function backToLobby() {
    socket.disconnect();
    navigate("/lobby");
  }

  useEffect(() => {
    const winner = checkWinner();
    if (winner) {
      setFinishetState(winner);
    }
  }, [gameState]);

  socket?.on("opponentLeftMatch", () => {
    setFinishetState("opponentLeftMatch");
  });

  socket?.on("playerMoveFromServer", (data) => {
    const id = data.state.id;
    setGameState((prevState) => {
      let newState = [...prevState];
      const rowIndex = Math.floor(id / 3);
      const colIndex = id % 3;
      newState[rowIndex][colIndex] = data.state.sign;
      return newState;
    });
    setCurrentPlayer(data.state.sign === "circle" ? "cross" : "circle");
  });

  socket?.on("connect", function () {
    setPlayOnline(true);
  });

  socket?.on("OpponentNotFound", function () {
    setOpponentName(false);
  });

  socket?.on("OpponentFound", function (data) {
    setPlayingAs(data.playingAs);
    setOpponentName(data.opponentName);
  });

  function playOnlineClick() {
    setPlayerName(email);

    const newSocket = io("https://server.whisnu29.tech", {
      autoConnect: true,
      extraHeaders: {
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    });

    newSocket?.emit("request_to_play", {
      playerName: email,
    });

    setSocket(newSocket);
  }

  if (!playOnline) {
    return <Lobby playOnlineClick={playOnlineClick} />;
  }

  if (playOnline && !opponentName) {
    return (
      <div className="waiting">
        <p>Waiting for opponent...</p>
      </div>
    );
  }

  return (
    <div className="main-div">
      <div className="move-detection justify-center mb-2">
        <div
          className={`left mb-2 mr-2 p-2 inline-flex  ${
            currentPlayer === playingAs ? "current-move-" + currentPlayer : ""
          }`}
        >
          {playerName}
        </div>
        <div
          className={`right mb-2 ml-2 p-2 inline-flex  ${
            currentPlayer !== playingAs ? "current-move-" + currentPlayer : ""
          }`}
        >
          {opponentName}
        </div>
      </div>
      <div>
        <h1 className="game-heading  mb-2 text-yellow-300" data-theme="coffee">
          Tic Tac Toe
        </h1>
        <div className="square-wrapper">
          {gameState.map((arr, rowIndex) =>
            arr.map((e, colIndex) => {
              return (
                <Square
                  socket={socket}
                  playingAs={playingAs}
                  gameState={gameState}
                  finishedArrayState={finishedArrayState}
                  finishedState={finishedState}
                  currentPlayer={currentPlayer}
                  setCurrentPlayer={setCurrentPlayer}
                  setGameState={setGameState}
                  id={rowIndex * 3 + colIndex}
                  key={rowIndex * 3 + colIndex}
                  currentElement={e}
                />
              );
            })
          )}
        </div>
        {finishedState &&
          finishedState !== "opponentLeftMatch" &&
          finishedState !== "draw" && (
            <>
              <p className="finished-state text-xs mt-3 mb-3">
                {finishedState === playingAs ? "You " : opponentName + " "}
                won the game
              </p>
              <button
                onClick={backToLobby}
                className="bg bg-green-400 text-white p-2 text-base	"
              >
                Go back to Lobby
              </button>
            </>
          )}
        {finishedState &&
          finishedState !== "opponentLeftMatch" &&
          finishedState === "draw" && (
            <>
              <p className="finished-state text-xs mt-3 mb-3">It's a Draw</p>
              <button
                onClick={backToLobby}
                className="bg bg-green-400 text-white p-2 text-base	"
              >
                Go back to Lobby
              </button>
            </>
          )}
        {!finishedState && opponentName && (
          <p className="finished-state text-xs mt-3 mb-3">
            You are playing against {opponentName}
          </p>
        )}
        {finishedState && finishedState === "opponentLeftMatch" && (
          <>
            <p className="finished-state text-xs mt-3 mb-3">
              You won the match, Opponent has left
            </p>
            <button
              onClick={backToLobby}
              className="bg bg-green-400 text-white p-2 text-base	"
            >
              Go back to Lobby
            </button>
          </>
        )}
      </div>
    </div>
  );
}
