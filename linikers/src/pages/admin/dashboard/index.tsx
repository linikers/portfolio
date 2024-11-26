import { Avatar, Box, Button, Card, CardContent, Container, Grid2, Typography } from "@mui/material";
import ava from "../../../../public/next.svg";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import Link from "next/link";
import Painel from "./painel";
import PainelCotacao from "./painel";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
    labels: ['React', 'Mysql', 'Postgres', 'MJ', 'NextJs', 'Ts'],
    datasets: [
        {
            label: 'Ferramentas',
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
                    justifyContent: 'space-between',
                    flexDirection: { xs: 'column', sm: 'row' },
                    textAlign: { xs: 'center', sm: 'left' }
                }}
            >
                <Box display='flex'>
                    <Avatar 
                        alt="Adminimg"
                        src={ava}
                        sx={{
                            width: 100,
                            height: 100,
                            mr: { sm: 2 },
                            mb: { xs: 2, sm: 0 }
                        }}
                    />
                    <Box textAlign='left' sx={{ mr: { sm: 2 }}}>
                        <Typography variant="h5">Seja bem vindo</Typography>
                        <Typography variant="subtitle1">Admin</Typography>
                    </Box>
                </Box>
                <Box sx={{ zIndex: 999}}>
                    <Link href='/dashboard/painel'>
                        <Button variant="contained">dash</Button>
                    </Link>
                </Box>
            </Card>

            <Grid2 container spacing={3} justifyContent="center">
                {['Ultimos Tweets', 'Ultimos Posts Linkedin', 'Ultimos PR'].map((title, index) => (
                    <Grid2 
                        key={index}
                        sx={{
                            display: 'flex',
                        }}>
                        <Card sx={{ display: 'flex', justifyContent: 'center', p: 2}}>
                            <CardContent>
                                <Typography variant="h6" align="center">{title}</Typography>
                                <Typography variant="h4" align="center">
                                    {index === 0 ? '421': index === 1 ? '008' : '802'}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid2>
                ))}
            </Grid2>
            <Box 
                sx={{
                    mt: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h6" align="center">Projetos distribuidos</Typography>
                <Card sx={{ margin: 4, mt: 2, maxWidth: 600 }}>
                <Pie data={data} />
                </Card>
            </Box>
            <PainelCotacao />
        </Container>
    );
};