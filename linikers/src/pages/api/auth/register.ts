import fs from 'fs';
import path from 'path';
// import { hash } from 'bcrypt';
import { hash } from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email, senha } = req.body;

        const filePath = path.join(process.cwd(), 'users.json');
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const users = JSON.parse(fileContents);

        if (users.find((user: { email: string }) => user.email === email)) {
            return res.status(400).json({ message: 'Usuario existente' })
        }
        
        const hashedPassword = await hash(senha, 10);
        users.push({ email, password: hashedPassword, role: 'user' });
        fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
        
        res.status(201).json({ message: 'Usuário registrado com sucesso'})
    } else { 
        return res.status(405).json({ message: 'Não permitido'})
    }


}