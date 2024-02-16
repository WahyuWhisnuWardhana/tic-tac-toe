import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

const initialState = {
  lobbies: [],
  loading: false,
  error: "",
};
export const lobbiesSlice = createSlice({
  name: "lobbies",
  initialState,
  reducers: {
    fetchPending(state) {
      state.loading = true;
      state.lobbies = [];
      state.error = "";
    },
    fetchSuccess(state, action) {
      state.loading = false;
      state.lobbies = action.payload;
      state.error = "";
    },
    fetchReject(state, action) {
      state.loading = false;
      state.lobbies = [];
      state.error = action.payload;
    },
  },
});

export const { fetchPending, fetchSuccess, fetchReject } = lobbiesSlice.actions;
export const fetchAsync = () => async (dispatch) => {
  try {
    dispatch(fetchPending());
    const url = "https://server.whisnu29.tech";

    const { data } = await axios.get(`${url}/lobby`, {
      headers: {
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    });
    dispatch(fetchSuccess(data.lobbies));
  } catch (error) {
    dispatch(fetchReject(error.response.data.message));
    Swal.fire({
      icon: "error",
      title: error.response.data.message,
    });
  }
};
export default lobbiesSlice.reducer;
