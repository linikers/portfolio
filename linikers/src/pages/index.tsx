import Logo from "@/components/logo";
import MenuUser from "@/components/menu";
import Social from "@/components/social";
import BoxTop from "@/components/top";
import { Box, Container } from "@mui/material";

export default function Home() {

    return (
        <Container
            sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignContent: 'center',
                padding: 2,
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '18%',
                    left: '36%',
                    right: '36%',
                    zIndex: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    alignContent: 'center',
                    justifyContent: 'center',
                    flexGrow: 1,
                }}
            >
                <MenuUser />
                <Box
                    sx={{
                        zIndex: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Logo />
                </Box>
            </Box>
            <Box
                sx={{ 
                    position: 'absolute', 
                    bottom: 0, 
                    zIndex: 10, 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    width: '100%', 
                    paddingBottom: 2,
                    color: 'text.primary',
                }}

            >
                <Social />
            </Box>
            <Box sx={{ zIndex: 1, width: '100%' }}>
                <BoxTop />
            </Box>
        </Container>
    )
}