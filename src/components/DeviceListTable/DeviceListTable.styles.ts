import { styled, TableCell } from "@mui/material";
import theme, { customColors } from "../../theme";

export const StyledHeaderCell = styled(TableCell)({
  fontWeight: theme.typography.fontWeightBold,
  color: "#495057",
  border: `1px solid ${customColors.lightGrey}`,
});

export const StyledTableCell = styled(TableCell)({
  borderRight: `1px solid ${customColors.lightGrey}`,
});
