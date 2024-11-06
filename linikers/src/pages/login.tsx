import { signIn, useSession } from "next-auth/react";
import { Box, Button, Grid2, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { color } from "framer-motion";
import shadows from "@mui/material/styles/shadows";

export default function Login() {
    const { data: session } = useSession();
    const [isRegistering, setIsRegistering] = useState(false);

    const formik = useFormik({
        initialValues: { email: '', senha: '' },
        validationSchema: Yup.object({
            email: Yup.string().email('Email inválido').required('Campo e-mail obrigatório'),
            senha: Yup.string().min(6,'Senha precisa no mínimo de 6 caracteres').required('Campo senha obrigatório')
        }),
        onSubmit: async (values) => {
            // handleLogin(values);
            const result = await signIn('credentials', {
                redirect: false,
                email: values.email,
                password: values.senha,
            });

            if (isRegistering) {
                const response = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });
                if (!response.ok) {
                    const data = await response.json();
                    alert(data.message || "erro no registro");
                    return
                }
                alert("usuario registrado com sucesso");
                setIsRegistering(false);
            } else {
                const result = await signIn('credentials', {
                    redirect: false,
                    email: values.email,
                    password: values.senha,
                });

                if(result && result.ok) {
                    if (values.email === 'admin@admin.app') {
                        window.location.href = "/admin/dashboard";
                    }
                    window.location.href = "/perfil";
                }
            }
            // return
        }
    })

    // const handleLogin = async (values: any) => {
    //     const isAdmin = values.email;
    //     if (isAdmin) {
    //         window.location.href = "/admin/dashboard";
    //     }
    //     window.location.href = "/perfil"
    // }
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
            {/* <form onSubmit={formik.handleSubmit}> */}
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
                // variant="contained"
                color="success"
                // margin="2"
                // color="custom-base-1"
                fullWidth
                sx={{ zIndex: 99}}>
                    {isRegistering ? 'Cadastrar' : 'Login'}
                    {/* login */}
            </Button>
            <Button onClick={() => signIn("google")}>
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
        {/* </form> */}
            </Box>
        </Grid2>
    )
}