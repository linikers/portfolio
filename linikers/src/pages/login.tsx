import { signIn, useSession } from "next-auth/react";
import { Button, Grid2, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { color } from "framer-motion";

export default function Login() {
    const { data: session } = useSession();
    const [isRegistering, setIsRegistering] = useState(false);

    const formik = useFormik({
        initialValues: { email: '', senha: '' },
        validationSchema: Yup.object({
            email: Yup.string().email('Email invalido').required('Campo e-mail obrigatório'),
            senha: Yup.string().min(6,'Senha precisa no mínimo de 6 caracteres').required('Campo senha obrigatório')
        }),
        onSubmit: async (values) => {
            // handleLogin(values);
            const result = await signIn('credentials', {
                redirect: false,
                email: values.email,
                password: values.senha,
            });

            if (result && result.ok) {
                window.location.href = "/perfil";
            }
            alert("Falha na autenticação. Verifique suas credenciais");
        }
    })

    const handleLogin = async (values: any) => {
        const isAdmin = values.email;
        if (isAdmin) {
            window.location.href = "/admin/dashboard";
        }
        window.location.href = "/perfil"
    }
    return (
        <form onSubmit={formik.handleSubmit}>
            <Typography variant='h4' gutterBottom>
                {isRegistering ? 'Cadastro' : 'Login' }
            </Typography>
            <TextField 
                fullWidth
                type="email"
                label="E-mail"
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
                value={formik.values.senha}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.senha && Boolean(formik.errors.senha)}
                helperText={formik.touched.senha && formik.errors.senha}
                margin="normal"
            />
            <input type="email" name="usuario" onChange={formik.handleChange} value={formik.values.email} />
            <input type="password" name="senha" onChange={formik.handleChange} value={formik.values.senha} />
            <Button type="submit" variant="contained" color="primary" fullWidth>
                {isRegistering ? 'Cadastrar' : 'Login'}
            </Button>
            <Grid2 container justifyContent="flex-end">
                <Button onClick={() => setIsRegistering(!isRegistering)} color="secondary">
                    {isRegistering ? 'Já tem conta? Faça login' : 'Novo por aqui? Cadastre-se'}
                </Button>

            </Grid2>
        </form>
    )
}