import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import Error from "next/error";
// import puppeteer from 'puppeteer';
import { useEffect, useState } from "react";
import { google } from "googleapis";
import axios from "axios";
import { CurrencyBitcoin } from "@mui/icons-material";

interface IExchangeRates {
    bitcoin: string | null;
    usd: string | null;
    eur: string | null;
}
export default function Painel() {
    // chaves google
    // const apiKey = 'AIzaSyD0Byjbl-wRRfkETvSTrgo-cVXL4-t7Euw';
    // const clientId = '1410261414-gu4bmncrqgmi6c6cukiguvoutn3no32k.apps.googleusercontent.com';

    // function CoinData() {
        const [exchangeRates, setExchangeRates] = useState<IExchangeRates>({ bitcoin: null, usd: null, eur: null});

        useEffect(() => {
            const fetchBitcoinPrice = async () => {
                try {
                    const response = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json');
                    setExchangeRates(prevRates => ({
                        ...prevRates,
                        bitcoin: response.data.bpi.USD.rate,
                    }));

                } catch (error) {
                    console.error('Erro no fetch bitcoin', error)
                }
            };
            const fetchExchangeRates = async () => {
                try {
                    const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
                    setExchangeRates(prevRates =>({
                        ...prevRates,
                        usd: response.data.bpi.USD,
                        eur: response.data.bpi.EUR,
                    }))
                } catch (error) {
                    console.error('Erro ao consultas moedas');
                }
            }


            fetchBitcoinPrice();
            fetchExchangeRates();
        }, [])
    // }

    return (
        <Container sx={{ mt: 4 }}>

            <Typography>DashBoard Admin</Typography>
            <Box>
                <Card>
                    <CardContent>
                        <CurrencyBitcoin />
                        <Typography>Bitcoin</Typography>
                        ${exchangeRates.bitcoin}
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <CurrencyBitcoin />
                        <Typography>Dolar Americano</Typography>
                        ${exchangeRates.usd}
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <CurrencyBitcoin />
                        <Typography>Euro</Typography>
                        ${exchangeRates.eur}
                    </CardContent>
                </Card>
            </Box>
        </Container>
    )
}