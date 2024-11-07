// src/components/DeviceDetails.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { CircularProgress, Typography, Paper } from '@mui/material';

const fetchDeviceDetails = async (deviceId: string) => {
  const response = await fetch(`https://pzv500llz9.execute-api.eu-west-2.amazonaws.com/production/device/${deviceId}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const DeviceDetails: React.FC = () => {
  const { deviceId } = useParams<{ deviceId: string }>();

  const { data, isLoading, error } = useQuery({
    queryKey: ['deviceDetails', deviceId],
    queryFn: () => fetchDeviceDetails(deviceId!),
    enabled: !!deviceId, // Only fetch if deviceId is available
  });

  if (isLoading) return <CircularProgress />;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  return (
    <Paper elevation={3} sx={{ padding: 3 }}>
      <Typography variant="h5">Device Details</Typography>
      <Typography variant="body1">ID: {data.id}</Typography>
      <Typography variant="body1">Name: {data.name || 'Unnamed Device'}</Typography>
      <Typography variant="body1">Model: {data.model.name}</Typography>
      <Typography variant="body1">Family: {data.model.family}</Typography>
      <Typography variant="body1">Product: {data.model.product}</Typography>
      <Typography variant="body1">Last Report Time: {data.lastReportTime}</Typography>
      <Typography variant="body1">Next Report Time: {data.nextReportTime}</Typography>
    </Paper>
  );
};

export default DeviceDetails;
