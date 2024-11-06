import { Avatar, Box, Card, CardContent, Container, Grid2, Typography } from "@mui/material";
import ava from "../../../../public/next.svg"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut, Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);
export const data = {
    labels: ['React', 'Mysql', 'Postgres', 'MJ', 'NextJs', 'Ts'],
    datasets: [
        {
            label: ' teste',
            data: [ 12, 19, 21, 8, 60, 18 ],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            bordeColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        }
    ]
}
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
            <Box sx={{ mt: 4 }}>
                <Typography>Projetos distribuidos</Typography>
                <Card sx={{ margin: 4 }}>
                <Pie data={data} />
                </Card>
            </Box>
            {/* <Typography>Index Admin</Typography> */}
        </Container>
    )
}