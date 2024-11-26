import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import Error from "next/error";
// import puppeteer from 'puppeteer';
import { useEffect, useState } from "react";
import { google } from "googleapis";
import axios from "axios";
import { CurrencyBitcoin } from "@mui/icons-material";

interface IExchangeRates {
    bitcoin: { bid: string | null; ask: string | null };
    usd: {bid: string | null; ask: string | null};
    eur: {bid: string | null; ask: string | null};
}
export default function Painel() {
    // chaves google
    // const apiKey = 'AIzaSyD0Byjbl-wRRfkETvSTrgo-cVXL4-t7Euw';
    // const clientId = '1410261414-gu4bmncrqgmi6c6cukiguvoutn3no32k.apps.googleusercontent.com';

    // function CoinData() {
        const [exchangeRates, setExchangeRates] = useState<IExchangeRates>({
            bitcoin: { bid: null, ask: null },
            usd: { bid: null, ask: null },
            eur: {bid: null, ask: null },
        });

        useEffect(() => {
            const fetchExchangeRates = async () => {
                try {
                    const response = await axios.get("https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL");
                    
                    const { USDBRL, EURBRL, BTCBRL } = response.data;

                    setExchangeRates({
                        bitcoin: {bid: BTCBRL, ask: BTCBRL },
                        usd: { bid: USDBRL, ask: USDBRL },
                        eur: { bid: EURBRL, ask: EURBRL },
                    })
                } catch (error) {
                    console.error('Erro no fetch das moedas', error)
                }
            };
            // const fetchExchangeRates = async () => {
            //     try {
            //         const response = await axios.get('https://economia.awesomeapi.com.br/last/USD-BRL');
            //         setExchangeRates(prevRates =>({
            //             ...prevRates,
            //             usd: response.data.USDBRL
            //             // usd: response.data.bpi.USD,
            //             // eur: response.data.bpi.EUR,
            //         }))
            //     } catch (error) {
            //         console.error('Erro ao consultas moedas');
            //     }
            // }


            // fetchBitcoinPrice();
            fetchExchangeRates();
        }, [])
    // }

    return (
        <Container sx={{ mt: 4 }}>

            <Typography variant="h4" gutterBottom>
                DashBoard Admin
            </Typography>
            <Box
                display="flex"
                gap={2}
                flexWrap="wrap"
            >
                <Card>
                    <CardContent>
                        <CurrencyBitcoin />
                        <Typography variant="h6">Bitcoin</Typography>
                        <Typography>Compra: R$
                            {exchangeRates.bitcoin.bid}
                        </Typography>
                        <Typography>Venda: R$
                            {exchangeRates.bitcoin.ask}
                        </Typography>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <CurrencyBitcoin />
                        <Typography variant="h6">Dolar Americano</Typography>
                        <Typography>Compra: R$
                            {exchangeRates.usd.bid}
                        </Typography>
                        <Typography>Venda: R$
                            {exchangeRates.usd.ask}
                        </Typography>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <CurrencyBitcoin />
                        <Typography variant="h6">Euro</Typography>
                        <Typography>Compra: R$
                            {exchangeRates.eur.bid}
                        </Typography>
                        <Typography>Venda: R$
                            {exchangeRates.eur.ask}
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    )
}