import Logo from "@/components/logo";
import MenuUser from "@/components/menu";
import Social from "@/components/social";
import BoxTop from "@/components/top";
import { Box, Container } from "@mui/material";
import Head from "next/head";

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
            <Head>
                <title>LinikerS Dev</title>
                <meta 
                    name='Desenvolvedor web - Programador de sistemas online'
                    content="Portfolio com alguns projetos de desenvolvimento online back-end e front-end"
                />
            </Head>
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
                    left: '0%',
                    // right:'5%',
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