import { Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function login() {

    const formik = useFormik({
        initialValues: { email: '', senha: '' },
        validateSchema: Yup.object({
            email: Yup.string().email('Email invalido').required('Campo e-mail obrigatório'),
            senha: Yup.string().min(6,'Senha precisa no mínimo de 6 caracteres').required('Campo senha obrigatório')
        }),
        onSubmit: (values) => {
            
        }
    })

    return (
        <form>
            <input type="email" name="usuario" onChange={formik.handleChange} value={formik.values.email} />
            <input type="password" name="senha" onChange={formik.handleChange} value={formik.values.senha} />
            <Button>Limpar</Button>
            <Button type="submit">Login</Button>
        </form>
    )
}