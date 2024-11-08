import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  TablePagination,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import DeviceTable from "../../components/DeviceTable";
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

const ReusableTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["devices"],
    queryFn: fetchDevices,
  });

  const datas = [
    {
      id: "72308628872413411",
      name: "Office Tag",
      model: {
        name: "LTR-HGR4-1-1",
        family: "LTR-HGR4",
        product: "LTR HGR4",
      },
      lastReportTime: "2024-05-24T22:34:44.178+00:00",
      nextReportTime: "2024-05-24T22:49:44.178+00:00",
    },
    {
      id: "72308628872413411",
      name: "Office Tag",
      model: {
        name: "LTR-HGR4-1-1",
        family: "LTR-HGR4",
        product: "LTR HGR4",
      },
      lastReportTime: "2024-05-24T22:34:44.178+00:00",
      nextReportTime: "2024-05-24T22:49:44.178+00:00",
    },
    {
      id: "72308628872413411",
      name: "Office Tag",
      model: {
        name: "LTR-HGR4-1-1",
        family: "LTR-HGR4",
        product: "LTR HGR4",
      },
      lastReportTime: "2024-05-24T22:34:44.178+00:00",
      nextReportTime: "2024-05-24T22:49:44.178+00:00",
    },
    {
      id: "72308628872413411",
      name: "Office Tag",
      model: {
        name: "LTR-HGR4-1-1",
        family: "LTR-HGR4",
        product: "LTR HGR4",
      },
      lastReportTime: "2024-05-24T22:34:44.178+00:00",
      nextReportTime: "2024-05-24T22:49:44.178+00:00",
    },
    {
      id: "72308628872413411",
      name: "Office Tag",
      model: {
        name: "LTR-HGR4-1-1",
        family: "LTR-HGR4",
        product: "LTR HGR4",
      },
      lastReportTime: "2024-05-24T22:34:44.178+00:00",
      nextReportTime: "2024-05-24T22:49:44.178+00:00",
    },
    {
      id: "72308628872413411",
      name: "Office Tag",
      model: {
        name: "LTR-HGR4-1-1",
        family: "LTR-HGR4",
        product: "LTR HGR4",
      },
      lastReportTime: "2024-05-24T22:34:44.178+00:00",
      nextReportTime: "2024-05-24T22:49:44.178+00:00",
    },
    {
      id: "72308628872413411",
      name: "Office Tag",
      model: {
        name: "LTR-HGR4-1-1",
        family: "LTR-HGR4",
        product: "LTR HGR4",
      },
      lastReportTime: "2024-05-24T22:34:44.178+00:00",
      nextReportTime: "2024-05-24T22:49:44.178+00:00",
    },
    {
      id: "72308628872522004",
      name: null,
      model: {
        name: "LTR-HGR4-1-1",
        family: "LTR-HGR4",
        product: "LTR HGR4",
      },
      lastReportTime: "2024-05-24T18:44:44.146+00:00",
      nextReportTime: "2024-05-24T22:39:44.146+00:00",
    },
    {
      id: "72308628872412255",
      name: null,
      model: {
        name: "LTR-HGR4-1-1",
        family: "LTR-HGR4",
        product: "LTR HGR4",
      },
      lastReportTime: "2024-05-24T19:24:44.060+00:00",
      nextReportTime: "2024-05-24T22:49:44.060+00:00",
    },
    {
      id: "72308628872665892",
      name: null,
      model: {
        name: "LTP-HGD4-1-0",
        family: "LTP-HGD4",
        product: "LTP HGD4",
      },
      lastReportTime: "2024-05-24T20:34:43.999+00:00",
      nextReportTime: "2024-05-24T23:04:43.999+00:00",
    },
    {
      id: "72308628874107147",
      name: null,
      model: {
        name: "LTP-HGD4-1-1",
        family: "LTP-HGD4",
        product: "LTP HGD4",
      },
      lastReportTime: "2024-05-24T22:34:43.997+00:00",
      nextReportTime: "2024-05-24T22:39:43.997+00:00",
    },
    {
      id: "72308628874107147",
      name: null,
      model: {
        name: "LTP-HGD4-1-1",
        family: "LTP-HGD4",
        product: "LTP HGD4",
      },
      lastReportTime: "2024-05-24T22:34:43.997+00:00",
      nextReportTime: "2024-05-24T22:39:43.997+00:00",
    },
  ];

  const devices = Array.isArray(datas) ? datas : [];

  const filteredData = devices.filter((device: any) =>
    (device.name ?? "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    Math.min(page * rowsPerPage + rowsPerPage, filteredData.length)
  );

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

      {/* Right Section */}
      <Grid size={{ xs: 12, md: 10 }} spacing={2} p={theme.spacing(2)}>
        <ReusableSearchField
          label="Search devices"
          onChange={handleSearchChange}
        />

        <DeviceTable
          devices={paginatedData}
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
