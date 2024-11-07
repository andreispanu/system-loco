import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { TablePagination, CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid2";
import DeviceTable from "../DeviceTable";
import ReusableSearchField from "../ReusableSearchField";
import theme from "../../theme";
import DeviceListNavigation from "../DeviceListNavigation";

const fetchDevices = async () => {
  const response = await fetch(
    "https://pzv500llz9.execute-api.eu-west-2.amazonaws.com/production/listDevices"
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data.results;
};

const ReusableTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["devices"],
    queryFn: fetchDevices,
  });

  if (isLoading) return <CircularProgress />;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  const devices = Array.isArray(data) ? data : [];

  const filteredData = devices.filter((device: any) =>
    (device.name ?? "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRowClick = (deviceId: string) => {
    navigate(`/device/${deviceId}`);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <Grid container>
      <Grid size={{ xs: 12, md: 2 }} p={theme.spacing(2)}>
       <DeviceListNavigation />
      </Grid>

      {/* Right Section */}
      <Grid size={{ xs: 12, md: 10 }} spacing={2} p={theme.spacing(2)}>
        <ReusableSearchField
          label="Search devices"
          onChange={handleSearchChange}
        />

        <DeviceTable
          devices={filteredData}
          page={page}
          rowsPerPage={rowsPerPage}
          handleRowClick={handleRowClick}
        />

        <TablePagination
          component="div"
          count={filteredData.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[rowsPerPage]}
          sx={{ mt: 2 }}
        />
      </Grid>
    </Grid>
  );
};

export default ReusableTable;
