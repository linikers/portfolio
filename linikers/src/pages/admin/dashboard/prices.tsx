import { Box, Button, CircularProgress, Container, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";

interface IProduct {
    data: string;
    loja: string;
    produto: string;
    produto_descricao: string;
    preco_varejo: number | null;
    preco_atacado: number | null;
    preco_de: number | null;
    preco_por: number | null;
}

export default function Prices() {

    const [listaPrecos, setListaPrecos] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [dataInicio, setDataInicio] = useState<string>('');
    const [dataFim, setDataFim] = useState<string>('');
    const [page, setPage] = useState<number>(0);

    const dInicio = "data";
    const dFim = "data";
    const pg = "data";

    const fetchPricesApi = async () => {
        try {
            const response = await axios.get('https://api.infopriceti.com.br/integracao-ecom/relatorio',{
                params: {
                    dataInicio,
                    dataFim,
                    page: page.toString(),
                },
                headers: {
                    Authorization:"Bearer {token}"
                }
            });
            console.log(response);
            setListaPrecos(response.data.content);
        } catch (error) {
            console.error("Erro ao capturar preços");
        }
    }
    const handleSearch = () => {
        fetchPricesApi();
    }
    const handleNextPage = () => {

    }
    const handlePreviousPage = () => {
        
    }

    return (
        <Container>
            <Typography>Lista</Typography>
            <Box>
                <TextField
                    label="Data Início"
                    type="date"
                    value={dInicio}
                    onChange={(e: any) => setDataInicio(e.target.value)}
                    // inputLabelProps={{ shrink: true }}
                />
                                <TextField
                    label="Data Fim"
                    type="date"
                    value={dFim}
                    onChange={(e: any) => setDataFim(e.target.value)}
                    // inputLabelProps={{ shrink: true }}
                />
                {/* </TextField>  */}
                <Button variant="contained" onClick={handleSearch}>Pesquisar</Button>
            </Box>
            {loading ? (
                <CircularProgress />
            ) : (
                <TableContainer>
                    <TableHead>
                        <TableRow>
                        <TableCell>Data</TableCell>
                            <TableCell>Loja</TableCell>
                            <TableCell>Produto</TableCell>
                            <TableCell>Descrição</TableCell>
                            <TableCell>Preço Varejo</TableCell>
                            <TableCell>Preço Atacado</TableCell>
                            <TableCell>Preço De</TableCell>
                            <TableCell>Preço Por</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listaPrecos.map((produto) => (
                            // eslint-disable-next-line react/jsx-key
                            <TableRow>
                                <TableCell>{produto.data}</TableCell>
                                <TableCell>{produto.loja}</TableCell>
                                <TableCell>{produto.produto}</TableCell>
                                <TableCell>{produto.produto_descricao}</TableCell>
                                <TableCell>{produto.preco_varejo}</TableCell>
                                <TableCell>{produto.preco_atacado}</TableCell>
                                <TableCell>{produto.preco_de}</TableCell>
                                <TableCell>{produto.preco_por}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </TableContainer>
            )}
        </Container>
    )
}