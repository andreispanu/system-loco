import { styled, Typography } from "@mui/material";
import theme, { customColors } from "../../theme";

export const DetailsTitle = styled(Typography)({
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: theme.typography.subtitle2.fontSize,
  color: customColors.semiGrey,
  marginTop: theme.spacing(2),
});

export const DetailsValue = styled(Typography)({
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.subtitle1.fontSize,
});
