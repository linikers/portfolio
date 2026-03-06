import { BugReport, DeveloperBoard, DesignServices } from "@mui/icons-material";
import { Box, Grid2, Typography } from "@mui/material";
import { TbUxCircle } from "react-icons/tb";
// import { DesignServices } from "@mui/icons-material";
import { MdImportantDevices } from "react-icons/md";
import { TbBugOff } from "react-icons/tb";

const UxIcon: any = TbUxCircle;
const BugIcon: any = TbBugOff;
const DeviceIcon: any = MdImportantDevices;

export default function BoxDev() {
  const iconSize = 40;
  const gradientBackground = `radial-gradient(circle, rgba(150,150,150,2) 10%, rgba(245,245,220,4) 100%)`;

  const cssBox = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    width: 120,
    height: 120,
    background: gradientBackground,
  };

  return (
    <Grid2 container spacing={4}>
      <Box sx={cssBox}>
        <Box display="flex">
          <UxIcon size={iconSize} />
          <DesignServices fontSize="large" />
        </Box>
        <Typography variant="subtitle1">UX/UI Design</Typography>
      </Box>
      <Box sx={cssBox}>
        <Box display="flex">
          <DeveloperBoard fontSize="large" />
          <DeviceIcon size={iconSize} />
        </Box>
        <Typography variant="subtitle1">Desenvolvimento</Typography>
      </Box>
      <Box sx={cssBox}>
        <Box display="flex">
          <BugReport fontSize="large" />
          <BugIcon size={iconSize} />
        </Box>
        <Typography variant="subtitle1">Correções</Typography>
      </Box>
    </Grid2>
  );
}
