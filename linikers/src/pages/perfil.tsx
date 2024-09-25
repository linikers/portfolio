import infoPerfil from "@/components/infoPerfil";
import Menu from "@/components/menu";
import { Typography } from "@material-tailwind/react";
import profileImg from "../../public/profileImg.jpg"
import { Avatar, Box, Container, Paper } from "@mui/material";

export default function Perfil() {

    return (
        <Container maxWidth='sm'>
            {/* capa teste */}
            <Box
                sx={{
                    width:'100%',
                    height: '300',
                    backgroundImage: `url(${profileImg})`,
                    // backgroundImage: `url(../../public/profileImg.jpg)`,
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
                    borderRadius: '3px solid white'
                }}
            >
                <Menu />
            </Box>
                <Avatar 
                src="../../public/linikersBg.jpg"
                sx={{
                    width: 100,
                    height: 100,
                    position: 'absolute',
                    bottom: -50,
                    left: 20,
                    border: '3px solid white',
                }}
                />
            </Box>
            <Typography
                variant='h5'
                sx={{
                    mb:2,
                    marginTop:1,
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
                        <Typography variant='body2'>
                            {info.texto} 
                        </Typography>
                    </Paper>
                ))}
            </Box>
        </Container>
    )
}