import React, { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import Forecast from "./components/Forecast";
import TemperatureChart from "./components/TemperatureChart";
import PrecipWindChart from "./components/PrecipWindChart";
import MapPanel from "./components/MapPanel";
import AlertsPanel from "./components/AlertsPanel";
import Footer from "./components/Footer";
import {
  Container,
  Typography,
  AppBar,
  Toolbar,
  Box,
  Grid,
} from "@mui/material";
import axios from "axios";

const App = () => {
  const [selectedCity, setSelectedCity] = useState('');

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    console.log(selectedCity);
  };

  // Attempt to auto-detect user location on first load
  useEffect(() => {
    if (!("geolocation" in navigator)) return;

    const fetchByCoords = async (lat, lon) => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_OPEN_WEATHER_APP_KEY}&units=metric`
        );
        setSelectedCity(response.data);
      } catch (err) {
        // Silently ignore; user can search manually
        // eslint-disable-next-line no-console
        console.warn("Geolocation weather fetch failed:", err);
      }
    };

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        fetchByCoords(latitude, longitude);
      },
      () => {
        // Permission denied or unavailable; do nothing
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 600000 }
    );
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <AppBar position="static" elevation={3}>
        <Toolbar>
          <Typography variant="h6">Weather App</Typography>
        </Toolbar>
      </AppBar>
      <Container
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          py: 2,
        }}
      >
        <SearchBar onCitySelect={handleCitySelect} />
        {selectedCity && (
          <Box mt={4}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={12} md={12}>
                <WeatherCard city={selectedCity} />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <AlertsPanel city={selectedCity} />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <MapPanel city={selectedCity} />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Forecast city={selectedCity} />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <TemperatureChart city={selectedCity} />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <PrecipWindChart city={selectedCity} />
              </Grid>
            </Grid>
          </Box>
        )}
      </Container>
      <Footer />
    </Box>
  );
};

export default App;
