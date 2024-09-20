import infoPerfil from "@/components/infoPerfil";
import { Typography } from "@material-tailwind/react";
import { Avatar, Box, Container, Paper } from "@mui/material";

export default function Perfil() {

    return (
        <Container maxWidth='sm'>
            <Box
                sx={{
                    width:'100%',
                    height: '200',
                    backgroundColor: '#3b5998',
                    position: 'relative',
                    mb: 2,
                }}
            >
                <Avatar 
                src=""
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