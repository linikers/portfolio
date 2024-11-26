import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import Error from "next/error";
// import puppeteer from 'puppeteer';
import { useEffect, useState } from "react";
import { google } from "googleapis";
import axios from "axios";
import { CurrencyBitcoin } from "@mui/icons-material";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import EuroIcon from '@mui/icons-material/Euro';

interface IExchangeRates {
    bitcoin: { bid: string | null; ask: string | null };
    usd: {bid: string | null; ask: string | null};
    eur: {bid: string | null; ask: string | null};
}
export default function PainelCotacao() {

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
                        bitcoin: {bid: BTCBRL.bid, ask: BTCBRL.ask },
                        usd: { bid: USDBRL.bid, ask: USDBRL.ask },
                        eur: { bid: EURBRL.bid, ask: EURBRL.ask },
                    })
                } catch (error) {
                    console.error('Erro no fetch das moedas', error)
                }
            };
            fetchExchangeRates();
        }, [])

    return (
        <Container sx={{ mt: 4 }}>

            <Typography variant="h4" gutterBottom>
                Cotação Diária
            </Typography>
            <Box
                display="flex"
                justifyContent='center'
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
                        <MonetizationOnIcon />
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
                        <EuroIcon />
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