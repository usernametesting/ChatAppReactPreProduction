import React, { useState, useEffect } from 'react';

const GetLogs: React.FC = () => {
  const [logs, setLogs] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/.netlify/functions/log')
      .then((response) => response.json())
      .then((data) => {
        setLogs(data.logs); 
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching logs:', error);
        setLogs('Error fetching logs');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading logs...</p>;
  }

  return (
    <div>
      <h1>Logs</h1>
      <pre>{logs}</pre>
    </div>
  );
};

export default GetLogs;
