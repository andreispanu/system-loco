import React from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
} from "@mui/material";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import GpsOffIcon from "@mui/icons-material/GpsOff";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import WifiOffIcon from "@mui/icons-material/WifiOff";
import { formatDistanceToNow, format } from "date-fns";
import { StyledHeaderCell, StyledTableCell } from "./DeviceTable.styles";
import theme, { customColors } from "../../theme";
import { DeviceTableProps } from "./DeviceTable.types";

const DeviceList: React.FC<DeviceTableProps> = ({
  devices,
  page,
  rowsPerPage,
  handleRowClick,
}) => {
  const getRandomIcon = () => {
    const icons = [<AirplanemodeActiveIcon />, <GpsOffIcon />, <WifiOffIcon />];
    return icons[Math.floor(Math.random() * icons.length)];
  };

  const isGreenStatus = Math.random() < 0.5;

  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow sx={{ backgroundColor: theme.palette.grey[100] }}>
            <StyledHeaderCell>Status</StyledHeaderCell>
            <StyledHeaderCell>Device Name / ID</StyledHeaderCell>
            <StyledHeaderCell>Last Report</StyledHeaderCell>
            <StyledHeaderCell>Next Report</StyledHeaderCell>
            <StyledHeaderCell>Device Model</StyledHeaderCell>
            <StyledHeaderCell>Device Family</StyledHeaderCell>
            <StyledHeaderCell>Device Product</StyledHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {devices
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((device) => (
              <TableRow
                key={device.id}
                sx={{
                  "&:hover": {
                    backgroundColor: "#f1f3f5",
                    cursor: "pointer",
                  },
                  borderBottom: "none",
                }}
                onClick={() => handleRowClick(device.id)}
              >
                <StyledTableCell
                  sx={{ borderLeft: `1px solid ${customColors.lightGrey}` }}
                >
                  <BatteryChargingFullIcon
                    sx={{ color: isGreenStatus ? "#28a745" : "#dc3545" }}
                  />
                  {getRandomIcon()}
                </StyledTableCell>
                <StyledTableCell>
                  <Typography
                    variant="subtitle2"
                    fontWeight={theme.typography.fontWeightMedium}
                  >
                    {device.name || "Unnamed Device"}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {device.id}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography variant="body2">
                    {formatDistanceToNow(new Date(device.lastReportTime), {
                      addSuffix: true,
                    })}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography variant="body2">
                    {format(
                      new Date(device.nextReportTime),
                      "dd/MM/yyyy, HH:mm"
                    )}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Chip
                    label={device.model.name}
                    size="small"
                    variant="filled"
                  />
                </StyledTableCell>
                <StyledTableCell>{device.model.family}</StyledTableCell>
                <StyledTableCell>{device.model.product}</StyledTableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DeviceList;
