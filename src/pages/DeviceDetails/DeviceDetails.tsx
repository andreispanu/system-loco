import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress, Typography, Box, Tabs, Tab } from "@mui/material";
import theme from "../../theme";
import Grid from "@mui/material/Grid2";
import { DetailsTitle, DetailsValue } from "./DeviceDetails.styles";
import { formatDistanceToNow, format } from "date-fns";
import Battery80Icon from "@mui/icons-material/Battery80";
import ReusableMap from "../../components/ReusableMap";

const fetchDeviceDetails = async (deviceId: string) => {
  const response = await fetch(
    `https://pzv500llz9.execute-api.eu-west-2.amazonaws.com/production/device/${deviceId}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const DeviceDetails: React.FC = () => {
  const { deviceId } = useParams<{ deviceId: string }>();
  const [tabValue, setTabValue] = useState(0);

  const {
    data: deviceData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["deviceDetails", deviceId],
    queryFn: () => fetchDeviceDetails(deviceId!),
    enabled: !!deviceId, // Only fetch if deviceId is available
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  if (isLoading) return <CircularProgress />;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  return (
    <Box sx={{ p: theme.spacing(3) }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="Device Tabs"
        >
          <Tab label="Overview" />
          <Tab label="History" />
          <Tab label="Reports & Audit" />
          <Tab label="Settings" />
          <Tab label="Technical Information" />
          <Tab label="Subscriptions" />
        </Tabs>
      </Box>

      {/* Overview Section */}
      {tabValue === 0 && (
        <Grid container spacing={4} mt={2}>
          {/* Summary */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, lg: 6 }}>
                <Typography variant="h6">Summary</Typography>

                <DetailsTitle>Device ID</DetailsTitle>
                <DetailsValue>{deviceData?.id || "N/A"}</DetailsValue>
                <DetailsTitle>Device Name</DetailsTitle>
                <DetailsValue>{deviceData?.name || "N/A"}</DetailsValue>
                <DetailsTitle>Model</DetailsTitle>
                <DetailsValue>{deviceData?.model?.name || "N/A"}</DetailsValue>
                <DetailsTitle>Owner</DetailsTitle>
                <DetailsValue>{deviceData?.owner?.name || "N/A"}</DetailsValue>
                <DetailsTitle>Firmware</DetailsTitle>
                <DetailsValue>
                  {deviceData?.firmware?.current || "N/A"}
                </DetailsValue>
              </Grid>

              {/* Status Indicators */}
              <Grid size={{ xs: 12, lg: 6 }}>
                <Typography variant="h6">Status Indicators</Typography>

                <DetailsTitle>Battery</DetailsTitle>

                <DetailsValue>
                  <Battery80Icon
                    sx={{
                      width: "15px",
                      height: "15px",
                      top: "3px",
                      position: "relative",
                    }}
                  />
                  {deviceData?.statusIndicators?.battery || "N/A"}
                </DetailsValue>

                <DetailsTitle>Moving</DetailsTitle>
                <DetailsValue>
                  {deviceData?.statusIndicators?.moving ? "Yes" : "No"}
                </DetailsValue>
                <DetailsTitle>GPS Failure</DetailsTitle>
                <DetailsValue>
                  {deviceData?.statusIndicators?.gpsFailure ? "Yes" : "No"}
                </DetailsValue>
                <DetailsTitle>Low Signal</DetailsTitle>
                <DetailsValue>
                  {deviceData?.statusIndicators?.lowSignal ? "Yes" : "No"}
                </DetailsValue>
              </Grid>
            </Grid>
          </Grid>

          {/* Position */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Typography variant="h6">Position</Typography>

            <ReusableMap
              lat={deviceData?.lastKnownLocation?.global?.lat}
              lon={deviceData?.lastKnownLocation?.global?.lon}
            />

            <Typography
              variant="body1"
              fontWeight={theme.typography.fontWeightMedium}
              mt={2}
            >
              Address
            </Typography>
            <DetailsValue>
              {deviceData?.lastKnownLocation?.summary || "N/A"}
            </DetailsValue>
            <DetailsTitle>Latitude</DetailsTitle>
            <DetailsValue>
              {deviceData?.lastKnownLocation?.global?.lat || "N/A"}
            </DetailsValue>
            <DetailsTitle>Longitude</DetailsTitle>
            <DetailsValue>
              {deviceData?.lastKnownLocation?.global?.lon || "N/A"}
            </DetailsValue>
          </Grid>

          {/* Reports */}
          <Grid size={{ xs: 12, lg: 2 }}>
            <Typography variant="h6">Reports</Typography>

            <DetailsTitle>Last Report Time</DetailsTitle>
            <DetailsValue>
              {formatDistanceToNow(new Date(deviceData?.lastReportTime), {
                addSuffix: true,
              }) || "N/A"}
            </DetailsValue>
            <DetailsTitle>Next Report Time</DetailsTitle>
            <DetailsValue>
              {format(
                new Date(deviceData?.nextReportTime),
                "dd/MM/yyyy, HH:mm"
              ) || "N/A"}
            </DetailsValue>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default DeviceDetails;
