import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import DeviceListTable from "../../components/DeviceListTable";
import ReusableSearchField from "../../components/ReusableSearchField";
import theme from "../../theme";
import DeviceListNavigation from "../../components/DeviceListNavigation";
import ReusableLoader from "../../components/ReusableLoader";

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

const DeviceList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["devices"],
    queryFn: fetchDevices,
  });

  const filteredData = data? data?.filter((device: any) =>
    (device.name ?? "").toLowerCase().includes(searchTerm.toLowerCase())
  ): [];

  useEffect(() => {
    if (page > Math.floor(filteredData.length / rowsPerPage)) {
      setPage(0);
    }
  }, [filteredData.length, page, rowsPerPage]);

  if (isLoading) return <ReusableLoader />;

  const handleRowClick = (deviceId: string) => {
    navigate(`/device/${deviceId}`);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  return error ? (
    <>
      <Typography color="error" sx={{ mt: 4, textAlign: "center" }}>
        Error loading data. Please try again later.
      </Typography>
    </>
  ) : (
    <Grid container>
      <Grid size={{ xs: 12, md: 2 }} p={theme.spacing(2)}>
        <DeviceListNavigation />
      </Grid>

      <Grid size={{ xs: 12, md: 10 }} spacing={2} p={theme.spacing(2)}>
        <ReusableSearchField
          label="Search devices"
          onChange={handleSearchChange}
        />

        <DeviceListTable
          devices={filteredData}
          page={page}
          rowsPerPage={rowsPerPage}
          handleRowClick={handleRowClick}
          handleChangePage={handleChangePage}
        />
      </Grid>
    </Grid>
  );
};

export default DeviceList;
