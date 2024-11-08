import React from "react";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {
  SearchFieldContainer,
  StyledSearchField,
} from "./ReusableSearchField.styles";
import theme from "../../theme";

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
            borderRadius: 8, 
            backgroundColor: theme.palette.grey[100], 
            border: "none", 
          },
        }}
      />
    </SearchFieldContainer>
  );
};

export default ReusableSearchField;
