import { styled, TextField } from "@mui/material";

export const SearchFieldContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  marginBottom: "1rem",
  maxWidth: 400,
});

export const StyledSearchField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "none",
    },
    "&:hover fieldset": {
      border: "none",
    },
    "&.Mui-focused fieldset": {
      border: "none",
    },
  },
});
