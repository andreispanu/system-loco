import React from "react";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {
  SearchFieldContainer,
  StyledSearchField,
} from "./ReusableSearchField.styles";

const ReusableSearchField = ({
  label,
  onChange,
}: {
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <SearchFieldContainer>
      <StyledSearchField
        label={label}
        variant="outlined"
        fullWidth
        onChange={onChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
          sx: {
            borderRadius: 4, // Rounded corners
            backgroundColor: "#f5f5f5", // Grey background
            border: "none", // Remove outline
          },
        }}
      />
    </SearchFieldContainer>
  );
};

export default ReusableSearchField;
