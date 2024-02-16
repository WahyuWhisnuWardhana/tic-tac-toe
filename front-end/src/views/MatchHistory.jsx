import axios from "axios";
import { useState, useEffect } from "react";
export default function MatchHistory({ id }) {
  const [history, setHistory] = useState([]);

  async function fetchHistory({ url }) {
    const { data } = await axios.get(`${url}/history`, {
      headers: {
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    });
  }
  return (
    <div className="flex justify-center">
      <p className="text-9x"></p>
    </div>
  );
}
