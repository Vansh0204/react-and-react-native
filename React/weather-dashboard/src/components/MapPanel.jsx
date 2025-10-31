import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, Typography, CircularProgress, Box } from '@mui/material';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const resolveCoords = async (city) => {
  if (city && city.coord && typeof city.coord.lat === 'number' && typeof city.coord.lon === 'number') {
    return { lat: city.coord.lat, lon: city.coord.lon, name: city.name };
  }
  const res = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${import.meta.env.VITE_OPEN_WEATHER_APP_KEY}&units=metric`
  );
  return { lat: res.data.coord.lat, lon: res.data.coord.lon, name: res.data.name };
};

const MapPanel = ({ city }) => {
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const run = async () => {
      setLoading(true);
      setError(null);
      try {
        const c = await resolveCoords(city);
        if (mounted) setCoords(c);
      } catch (e) {
        if (mounted) setError('Failed to load map location');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    run();
    return () => {
      mounted = false;
    };
  }, [city]);

  const center = useMemo(() => (coords ? [coords.lat, coords.lon] : [0, 0]), [coords]);

  if (loading) return <Box display="flex" justifyContent="center" alignItems="center" height="100%"><CircularProgress /></Box>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!coords) return null;

  return (
    <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>Map</Typography>
        <Box sx={{ height: 300, width: '100%', borderRadius: 2, overflow: 'hidden' }}>
          <MapContainer center={center} zoom={10} style={{ height: '100%', width: '100%' }} scrollWheelZoom={false}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={center}>
              <Popup>{coords.name}</Popup>
            </Marker>
          </MapContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MapPanel;


