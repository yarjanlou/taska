import styled from "@emotion/styled";
import { LinearProgress, linearProgressClasses } from "@mui/material";

const ProgressBar = styled(LinearProgress)(({ theme }) => ({
  height: 5,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#a19e9e2d",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.primary.main,
  },
}));

export default ProgressBar;
