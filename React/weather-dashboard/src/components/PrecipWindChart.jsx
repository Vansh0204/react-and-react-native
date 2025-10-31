import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, CircularProgress, Box } from '@mui/material';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';

const PrecipWindChart = ({ city }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city.name}&appid=${import.meta.env.VITE_OPEN_WEATHER_APP_KEY}&units=metric`
        );
        const list = response.data.list || [];
        const chartData = list.map((item) => ({
          time: new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
          rain: item.rain && typeof item.rain['3h'] === 'number' ? item.rain['3h'] : 0,
          snow: item.snow && typeof item.snow['3h'] === 'number' ? item.snow['3h'] : 0,
          wind: item.wind?.speed ?? 0,
        }));
        setData(chartData);
      } catch (e) {
        setError('Error fetching precipitation/wind data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [city]);

  if (loading) return <Box display="flex" justifyContent="center" alignItems="center" height="100%"><CircularProgress /></Box>;
  if (error) return <Typography variant="body1" color="error">{error}</Typography>;
  if (!data.length) return null;

  return (
    <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>Precipitation & Wind</Typography>
        <Box sx={{ width: '100%', height: 400 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" tick={{ fontSize: 10 }} angle={-30} textAnchor="end" interval={0} minTickGap={20} />
              <YAxis yAxisId="left">
                <Label value="Precip (mm)" angle={-90} position="insideLeft" offset={-5} />
              </YAxis>
              <YAxis yAxisId="right" orientation="right">
                <Label value="Wind (m/s)" angle={-90} position="insideRight" offset={10} />
              </YAxis>
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="rain" name="Rain (mm)" stroke="#4fc3f7" strokeWidth={2} dot={false} />
              <Line yAxisId="left" type="monotone" dataKey="snow" name="Snow (mm)" stroke="#90caf9" strokeWidth={2} dot={false} />
              <Line yAxisId="right" type="monotone" dataKey="wind" name="Wind (m/s)" stroke="#ef5350" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PrecipWindChart;


