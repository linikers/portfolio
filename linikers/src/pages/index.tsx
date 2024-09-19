import Logo from "@/components/logo";
import MenuUser from "@/components/menu";
import Social from "@/components/social";
import BoxTop from "@/components/top";
import { Box, Container } from "@mui/material";

export default function Home() {

    return (
        <Container
            maxWidth='sm'
            sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'relative',
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    zIndex: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
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
                    alignItems: 'flex-end', 
                    color: 'text.primary' }}

            >
                <Social />
            </Box>
            <Box sx={{ zIndex: 1 }}>
                <BoxTop />
            </Box>
        </Container>
    )
}