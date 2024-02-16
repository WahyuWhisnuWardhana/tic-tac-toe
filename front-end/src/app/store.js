import { configureStore } from "@reduxjs/toolkit";
import lobbies from "../features/lobbies/lobby-slicer";

export default configureStore({
  reducer: {
    lobbies,
  },
});
