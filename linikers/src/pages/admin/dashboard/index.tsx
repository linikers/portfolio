import { Avatar, Box, Card, CardContent, Container, Grid2, Typography } from "@mui/material";
import ava from "../../../../public/next.svg"
export default function AdminPage() {

    return (
        <Container sx={{ mt: 4 }}>
            <Card
                sx={{
                    p: 2,
                    mb: 4,
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Avatar 
                    alt="adm img"
                    src={ava}
                    sx={{
                        width: 100,
                        height: 100,
                        mr: 2,
                    }}
                />
                <Box>
                    <Typography variant="h5">Seja bem vindo</Typography>
                    <Typography variant="subtitle1">Admin</Typography>
                </Box>
            </Card>

            <Grid2 container spacing={3}>
                <Grid2 sx={{
                    display: 'flex',
                }}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Ultimos Tweets</Typography>
                            <Typography variant="h4">421</Typography>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <Typography variant="h6">Ultimos Posts Linkedin</Typography>
                            <Typography variant="h4">008</Typography>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <Typography variant="h6">Ultimos PR</Typography>
                            <Typography variant="h4">802</Typography>
                        </CardContent>
                    </Card>
                </Grid2>
            </Grid2>
            <Box>
                <Typography>Projetos distribuidos</Typography>
            </Box>
            {/* <Typography>Index Admin</Typography> */}
        </Container>
    )
}