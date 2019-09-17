import React, { useState, useEffect } from "react";
import LogItem from "./LogItem";
import Preloader from "../layout/Preloader";

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getLogs();
  }, []);

  const getLogs = async () => {
    setLoading(true);
    const res = await fetch("/logs");
    let data = await res.json();
    if (!res.ok) {
      data = [];
    }

    setLogs(data);
    setLoading(false);
  };

  if (loading) {
    return <Preloader />;
  }

  return (
    <ul className="collection with-header">
      <li className="collection-header">
        <h4 className="center">System logs</h4>
      </li>
      {logs.length > 0 ? (
        logs.map(log => <LogItem key={log.id} log={log} />)
      ) : (
        <p className="center">No logs to show...</p>
      )}
    </ul>
  );
};

export default Logs;
