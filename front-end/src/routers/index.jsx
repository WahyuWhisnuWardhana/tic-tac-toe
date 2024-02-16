import { createBrowserRouter, redirect } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import LoginHandler from "../views/LoginHandler";
import RegisterHandler from "../views/RegisterHandler";
import TicTacToe from "../views/TicTacToe";
import Lobby from "../views/Lobby";
import Edit from "../components/Edit";
import BaseLayout from "../views/BaseLayout";

const url = "https://server.whisnu29.tech";

const router = createBrowserRouter([
  {
    path: "/register",
    element: <RegisterHandler url={url} />,
    loader: () => {
      if (localStorage.access_token) {
        return redirect("/");
      }
      return null;
    },
  },
  {
    path: "/login",
    element: <LoginHandler url={url} />,
    loader: () => {
      if (localStorage.access_token) {
        return redirect("/");
      }
      return null;
    },
  },
  {
    element: <BaseLayout />,

    children: [
      {
        path: "/",
        element: <TicTacToe url={url} />,
        loader: () => {
          if (!localStorage.access_token) {
            return redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/lobby",
        element: <Lobby url={url} />,
        loader: () => {
          if (!localStorage.access_token) {
            return redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/lobby/:id",
        element: <Edit url={url} />,
        loader: () => {
          if (!localStorage.access_token) {
            return redirect("/login");
          }
          return null;
        },
      },
    ],
  },
]);

export default router;
