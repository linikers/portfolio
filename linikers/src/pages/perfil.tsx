import BoxPinterest from "@/components/boxPinterest";
import BoxSpotify from "@/components/boxSpotify";
import infoPerfil from "@/components/infoPerfil";
import Menu from "@/components/menu";
import { Typography } from "@material-tailwind/react";
import { Box, Container, Paper } from "@mui/material";

export default function Perfil() {

    return (
        <Container maxWidth='sm'>

            <Box
                sx={{
                    width:'100%',
                    height: '160px',
                    backgroundImage: "url('/profileImg.jpg')",
                    backgroundSize: 'cover', // cobre todo fundo
                    backgroundPosition: 'center', //center img
                    backgroundColor: '#3b5998',
                    position: 'relative',
                    mb: 8,
                    borderRadius: '8px',
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: -50,
                        left: 20,
                        border: '3px solid white',
                        borderRadius: '50%',
                    }}
                >
                    <Menu />
                </Box>
            </Box>
            <Typography
                variant='h5'
                sx={{
                    mb:2,
                    marginTop:6,
                }}
            >
                LinikerS dev
            </Typography>
            <Box>
                {infoPerfil.map(( info ,index) => (
                    <Paper
                        key={index}
                        elevation={3}
                        sx={{
                            padding: 2,
                            marginBottom: 2,
                            borderRadius: 2,
                            backgroundColor: '#f5f5f5',
                        }}
                    >
                        <Typography variant='h5'>
                            {info.titulo}
                        </Typography>
                        <Typography variant='subtitle1'>
                            {info.texto} 
                        </Typography>
                    </Paper>
                ))}
            </Box>
            <Box>
                <Paper
                    elevation={3}
                    sx={{
                        padding: 2,
                        marginBottom: 2,
                        borderRadius: 2,
                        backgroundColor: '#f5f5f5',
                    }}
                >
                    <Typography variant='h5'>Olha o que eu curti! </Typography>
                    <BoxPinterest />
                </Paper>
            </Box>
        </Container>
    )
}