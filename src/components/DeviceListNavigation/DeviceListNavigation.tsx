import React from "react";
import {
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import MapIcon from "@mui/icons-material/Map";
import RefreshIcon from "@mui/icons-material/Refresh";

const DeviceListNavigation: React.FC = () => {
  const theme = useTheme();
  const isXlUp = useMediaQuery(theme.breakpoints.up("xl"));

  return (
    <Box>
      <Paper
        elevation={0}
        sx={{ borderRadius: 2, padding: isXlUp ? 1.2 : 1, backgroundColor: "#f8f9fa" }}
      >
        <List>
          <ListItemButton
            sx={{
              backgroundColor: "#fff3cd",
              borderRadius: 1,
              mb: 1,
              padding: isXlUp ? theme.spacing(1.5) : theme.spacing(0.8),
            }}
          >
            {isXlUp && (
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
            )}
            <ListItemText
              primary={
                <Typography fontWeight="bold" variant={isXlUp ? "body1" : "body2"}>
                  Device List
                </Typography>
              }
            />
          </ListItemButton>

          <ListItemButton
            sx={{
              mb: 1,
              padding: isXlUp ? theme.spacing(1.5): theme.spacing(0.8),
            }}
          >
            {isXlUp && (
              <ListItemIcon>
                <MapIcon />
              </ListItemIcon>
            )}
            <ListItemText
              primary={
                <Typography color="textSecondary" variant={isXlUp ? "body1" : "body2"}>
                  Device Map
                </Typography>
              }
            />
          </ListItemButton>

          <ListItemButton
            sx={{
              padding: isXlUp ? theme.spacing(1.5) : theme.spacing(0.8),
            }}
          >
            {isXlUp && (
              <ListItemIcon>
                <RefreshIcon />
              </ListItemIcon>
            )}
            <ListItemText
              primary={
                <Typography color="textSecondary" variant={isXlUp ? "body1" : "body2"}>
                  Device Profiles
                </Typography>
              }
            />
          </ListItemButton>
        </List>
      </Paper>
    </Box>
  );
};

export default DeviceListNavigation;
