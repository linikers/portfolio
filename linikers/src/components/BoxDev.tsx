import { BugReport, Commit, DeveloperBoard } from "@mui/icons-material";
import { Box, Grid2, Typography } from "@mui/material";
import { TbUxCircle } from "react-icons/tb";
import { DesignServices } from "@mui/icons-material";
import { MdImportantDevices } from "react-icons/md";
import { TbBugOff } from "react-icons/tb";
export default function BoxDev() {

    const iconSize = 40;
    const gradientBackground = `linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(245,245,220,1) 35%, rgba(0,212,255,1) 100%)`;
    const cssBox = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        width: 120,
        height: 120,
        backgroundColor: gradientBackground,
    };

    return( 
        <Grid2 container spacing={4}>
            <Box sx={cssBox} >
                <Box display='flex'>
                    <TbUxCircle size={iconSize} />
                    <DesignServices fontSize="large" />
                </Box>
                <Typography>UX/UI Design</Typography>
            </Box>
            <Box sx={cssBox}>
                <Box display='flex'>
                    <DeveloperBoard fontSize="large" />
                    <MdImportantDevices size={iconSize} />
                </Box>
                <Typography>Desenvolvimento</Typography>
            </Box>
            <Box sx={cssBox}>
                <Box display='flex'>
                    <BugReport fontSize="large" />
                    <TbBugOff size={iconSize} />
                </Box>
                <Typography>Correções</Typography>
          </Box>
        </Grid2>
    )
}