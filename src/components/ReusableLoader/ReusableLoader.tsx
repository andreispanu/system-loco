import React from "react";
import { Box, CircularProgress, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import theme from "../../theme";

const ReusableLoader = () => {
  return (
    <Container>
      <Grid container p={theme.spacing(6)}>
        <Grid size={{ xs: 12 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="h5">Loading...</Typography>
            <CircularProgress />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ReusableLoader;
