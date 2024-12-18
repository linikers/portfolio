import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Box, Button, Grid2, TextField, Typography } from "@mui/material";
import { auth } from "@/config/firebaseClient";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
// import { color } from "framer-motion";
// import shadows from "@mui/material/styles/shadows";

export default function Login() {
    const [isRegistering, setIsRegistering] = useState(false);
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const formik = useFormik({
        initialValues: { email: '', senha: '' },
        validationSchema: Yup.object({
            email: Yup.string().email('Email inválido').required('Campo e-mail obrigatório'),
            senha: Yup.string().min(6,'Senha precisa no mínimo de 6 caracteres').required('Campo senha obrigatório')
        }),
        onSubmit: async (values) => {
            try {
                if ( isRegistering) {
                    await createUserWithEmailAndPassword(auth, values.email, values.senha);
                    router.push('/dashboard')
                } else {
                    await signInWithEmailAndPassword(auth, values.email, values.senha);
                    router.push('/dashboard')
                }
            } catch (error) {
                setError(isRegistering ? "Falha no cadastro" : "Falha no login")
            }
        }
    })
    const handleRegister = async (email: any, senha: any) => {
        try {
            await createUserWithEmailAndPassword(auth, email, senha);
            router.push('/dashboard');
        } catch (error) {
            setError("Falha no Cadastro");
        }
    }

    // const handleLogin = async(e: any) => {
    //     e.preventDefault();
    //     try {
    //         await signInWithEmailAndPassword(auth, email, password);
    //         router.push('/dashboard');
    //     } catch (error) {
    //         setError("Falha no login");
    //     }
    // }
    const handleLoginGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider)
            router.push('/dashboard');
        } catch (error) {
            setError('Falha no Login');
        }
    }
    return (
        <Grid2 
            container
            justifyContent="center"
            alignItems="center"
            sx={{
                minHeight: 12,
                backgroundColor: 'gray',
                height: '100vh',
                padding: 2
            }}
        >
            <Box 
                component="form" 
                onSubmit={formik.handleSubmit} 
                sx={{
                    p: 3,
                    zIndex: 66,
                    maxWidth: 400,
                    width: '100%',
                    borderRadius: 2,
                    backgroundColor: 'white',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0px, 8px, 30px rgba(0, 0, 0, 0.2',
                    },
                }}
            >

            <Typography variant='h4' gutterBottom align="center">
                {isRegistering ? 'Cadastro' : 'Login' }
            </Typography>
            <TextField 
                fullWidth
                label="E-mail"
                type="email"
                name="email"
                onBlur={formik.handleBlur}
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email &&Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                margin="normal"
            />
            <TextField
                fullWidth
                label="Senha"
                type="password"
                name="senha"
                onBlur={formik.handleBlur}
                value={formik.values.senha}
                onChange={formik.handleChange}
                error={formik.touched.senha && Boolean(formik.errors.senha)}
                helperText={formik.touched.senha && formik.errors.senha}
                margin="normal"
            />
            <Button 
                type="submit"
                color="success"
                fullWidth
                sx={{ zIndex: 99}}
                // onClick={isRegistering ? handleRegister : handleLogin}
                >
                    {isRegistering ? 'Cadastrar' : 'Login'}
            </Button>
            <Button onClick={handleLoginGoogle}>
                Entre com sua conta Google
            </Button>
            <Grid2 container justifyContent="flex-end">
                <Button 
                    color="secondary"
                    onClick={() => setIsRegistering(!isRegistering)} 
                >
                    {isRegistering ? 'Já tem conta? Faça login' : 'Novo por aqui? Cadastre-se'}
                </Button>

            </Grid2>
            </Box>
        </Grid2>
    )
}