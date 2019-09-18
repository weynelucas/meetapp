import React, { useEffect, useState } from 'react';
import api from '../../services/api';

// import { Container } from './styles';

export default function Dashborad() {
  const [, setMeetups] = useState([]);

  useEffect(() => {
    (async function loadSubscriptions() {
      const response = await api.get('/organizing');
      setMeetups(response.data);
    })();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}
