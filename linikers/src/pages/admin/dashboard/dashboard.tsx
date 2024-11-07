import { Container, Typography } from "@mui/material";
import Error from "next/error";
// import puppeteer from 'puppeteer';
import { useEffect, useState } from "react";

interface IProductData {
    nome: string;
    preco: string;
    data: Date;
}
export default function Dashboard() {

    const [products, setProducts] = useState<IProductData[]>([]);
    const [isLoading, setIsloading] = useState(false);
    const [error, setError] = useState(null);

    const apiKey = '';
    const clientId = '';
     useEffect(() => {
        const fetchData = async => {
            setIsloading(true);
            setError(null);
            try {
                const auth = new google.auth.OAuth2(clientId, apiKey);
                const service = google.shoppingcontent('v2.1').products;

                const res = await service.list({
                    auth,
                });

                const productsData = res.data.items.map((item) => ({
                    name: item.title,
                    price: item.price.price,
                    date: new Date();
                }))

                setProducts(productsData);
            } catch (error) {
                setError(error as any);
            } finally {
                setIsloading(false);
            }
        };

        fetchData();
     }, []);

    return (
        <Container sx={{ mt: 4 }}>

            <Typography>DashBoard Admin</Typography>
        </Container>
    )
}