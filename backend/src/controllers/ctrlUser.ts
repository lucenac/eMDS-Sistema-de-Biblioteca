import User from "../models/mdUser";
import {Request,Response} from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const jwtSecreto = process.env.JWT_SECRETO as string;

// crear User
export const crearUser = async(req:Request,res:Response):Promise<void>=>{
    try {
        const {nombres,apellidos,documento,email,tipo,password} = req.body;
        const userExistente = await User.findOne({email,documento});
        if(userExistente){
        res.status(400).json({msg:"El usuario ya existe"});
        return;

        }
        const ocultaPassword = await bcryptjs.hash(password,10);
        const nuevoUser = new User({ nombres,apellidos,documento,email,tipo,password:ocultaPassword,creadoAct: new Date()})
        await nuevoUser.save();
        res.status(201).json({msg:"Usuario Registrado correctamente"});
        return;
    } catch (error) {
        res.status(500).json({msg:"Error al crear usuario"});
       return;
    }
}
// obtener users
export const obtenerUser = async(req:Request,res:Response):Promise<void>=>{
    try {
        const users = await User.find();
        res.status(200).json(users);
        return;
    } catch (error) {
       res.status(500).json({msg:"Error al obtener usuarios"});
       return;
    }
}

// Esta função assume que as variáveis de ambiente foram carregadas no início da aplicação
export const autenticarUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        // 1. Buscar para ver se o utilizador existe
        const user = await User.findOne({ email });
        if (!user) {
            // Mensagem genérica para segurança
            res.status(400).json({ msg: "Correo o Contraseña incorrecta" });
            return; // O return aqui ainda é útil para parar a execução antes do próximo passo
        }

        // 2. Validar a palavra-passe
        const passwordCorrecto = await bcryptjs.compare(password, user.password);
        if (!passwordCorrecto) {
            // Mensagem genérica para segurança
            res.status(400).json({ msg: "Correo o Contraseña incorrecta" });
            return;
        }

        // 3. Gerar o Token usando uma variável de ambiente
        // Acessa o segredo a partir das variáveis de ambiente para maior segurança
        const jwtSecreto = process.env.JWT_SECRET;
        if (!jwtSecreto) {
            // Garante que a aplicação não execute sem o segredo definido
            throw new Error('O segredo JWT_SECRET não está definido nas variáveis de ambiente.');
        }

        const token = jwt.sign(
            { id: user._id, email: user.email, tipo: user.tipo },
            jwtSecreto,
            { expiresIn: "1h" }
        );

        // Resposta de sucesso (o 'return' aqui é opcional)
        res.status(200).json({ token, msg: "Inicio exitoso" });

    } catch (error) {
        console.error("Erro ao autenticar: ", error);
        res.status(500).json({ msg: "Error al iniciar sesion" });
    }
};

// buscar user por id
export const buscarUser = async(req:Request,res:Response):Promise<void>=>{
    try {
       const {id}= req.params;
        const user = await User.findById(id);
        if(!user){
         res.status(404).json({msg:"Usuario no encontrado"});
         return;
        }
        res.status(200).json(user);
        return;
    } catch (error) {
        res.status(500).json({msg:"Error al buscar usuario"});
        return;
    }
}


