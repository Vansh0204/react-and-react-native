import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Alert, CircularProgress, Box, Stack } from '@mui/material';
import axios from 'axios';

const getCoords = async (city) => {
  if (city && city.coord && typeof city.coord.lat === 'number' && typeof city.coord.lon === 'number') {
    return { lat: city.coord.lat, lon: city.coord.lon };
  }
  const res = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${import.meta.env.VITE_OPEN_WEATHER_APP_KEY}&units=metric`
  );
  return { lat: res.data.coord.lat, lon: res.data.coord.lon };
};

const AlertsPanel = ({ city }) => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const fetchAlerts = async () => {
      setLoading(true);
      setError(null);
      try {
        const { lat, lon } = await getCoords(city);
        const resp = await axios.get(
          `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily&appid=${import.meta.env.VITE_OPEN_WEATHER_APP_KEY}`
        );
        if (!mounted) return;
        const list = resp.data.alerts || [];
        setAlerts(list);
      } catch (e) {
        // One Call alerts may require a paid plan; degrade gracefully
        if (mounted) setError('Alerts unavailable for this API key/region');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchAlerts();
    return () => { mounted = false; };
  }, [city]);

  if (loading) return <Box display="flex" justifyContent="center" alignItems="center" height="100%"><CircularProgress /></Box>;
  if (error) {
    return null;
  }
  if (!alerts.length) return null;

  return (
    <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>Weather Alerts</Typography>
        <Stack spacing={2}>
          {alerts.map((a, idx) => (
            <Alert severity="warning" key={`${a.event}-${idx}`}>
              <strong>{a.event}</strong>{a.sender_name ? ` — ${a.sender_name}` : ''}
              <div style={{ whiteSpace: 'pre-wrap' }}>{a.description}</div>
            </Alert>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default AlertsPanel;


