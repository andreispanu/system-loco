// src/components/ReusableTable.tsx
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, TextField, IconButton, Typography, Box, CircularProgress } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CircleIcon from '@mui/icons-material/Circle';
import { format } from 'date-fns';

const fetchDevices = async () => {
  const response = await fetch('https://pzv500llz9.execute-api.eu-west-2.amazonaws.com/production/listDevices');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data.results;
};

const ReusableTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const { data, isLoading, error } = useQuery({
    queryKey: ['devices'],
    queryFn: fetchDevices,
  });

  if (isLoading) return <CircularProgress />;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  const devices = Array.isArray(data) ? data : [];

  const filteredData = devices.filter((device: any) =>
    (device.name ?? '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <TextField
          label="Search devices"
          variant="outlined"
          fullWidth
          onChange={handleSearchChange}
          sx={{ mr: 2 }}
        />
        <IconButton aria-label="filter">
          <FilterListIcon />
        </IconButton>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell>Status</TableCell>
              <TableCell>Device Name / ID</TableCell>
              <TableCell>Last Report Time</TableCell>
              <TableCell>Next Report Time</TableCell>
              <TableCell>Device Model</TableCell>
              <TableCell>Device Family</TableCell>
              <TableCell>Device Product</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((device: any) => (
              <TableRow key={device.id} sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}>
                <TableCell>
                  <CircleIcon fontSize="small" color={device.name ? 'success' : 'error'} />
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{device.name || 'Unnamed Device'}</Typography>
                  <Typography variant="caption" color="textSecondary">{device.id}</Typography>
                </TableCell>
                <TableCell>{format(new Date(device.lastReportTime), 'Pp')}</TableCell>
                <TableCell>{format(new Date(device.nextReportTime), 'Pp')}</TableCell>
                <TableCell>{device.model.name}</TableCell>
                <TableCell>{device.model.family}</TableCell>
                <TableCell>{device.model.product}</TableCell>
                <TableCell>
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={filteredData.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[rowsPerPage]}
        sx={{ mt: 2 }}
      />
    </Paper>
  );
};

export default ReusableTable;
