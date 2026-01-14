import { Request, Response } from "express";
import User from "../models/User";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password, role, registration } = req.body;

        if (!name || !email || !password || !registration) {
            res.status(400).json({ msg: "Please provide all required fields." });
            return;
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            console.log("Register Fail: Email already exists:", email);
            res.status(400).json({ msg: "Este E-mail já está cadastrado." });
            return;
        }

        // Check for duplicate registration (Matricula)
        const registrationExists = await User.findOne({ registration });
        if (registrationExists) {
            console.log("Register Fail: Registration ID already exists:", registration);
            res.status(400).json({ msg: "Esta Matrícula já está cadastrada." });
            return;
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role: role || 'student',
            registration
        });

        await newUser.save();

        res.status(201).json({ msg: "User registered successfully." });

    } catch (error: any) {
        console.error("Register Error:", error);
        if (error.code === 11000) {
            res.status(400).json({ msg: "Dados duplicados (Email ou Matrícula já em uso)." });
            return;
        }
        res.status(500).json({ msg: "Server Error", error: error.message });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ msg: "Invalid credentials." });
            return;
        }

        // Handle strict undefined password check just in case
        if (!user.password) {
            res.status(400).json({ msg: "Invalid credentials." });
            return;
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ msg: "Invalid credentials." });
            return;
        }

        const secret = process.env.JWT_SECRET || 'secret_dev_key';
        const token = jwt.sign(
            { id: user._id, role: user.role, name: user.name },
            secret,
            { expiresIn: "24h" }
        );

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ msg: "Server Error" });
    }
};

import { admin } from "../config/dB_Firebase";

export const googleLogin = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log("Backend: Received Google Login Request");
        const { token } = req.body;

        console.log("Backend: Verificando ID Token...");
        const decodedToken = await admin.auth().verifyIdToken(token);
        const { email, name, uid } = decodedToken;
        console.log("Backend: Token verificado. Email:", email);

        if (!email) {
            res.status(400).json({ msg: "Google Account deve ter um email." });
            return;
        }

        let user = await User.findOne({ email });

        if (!user) {
            const password = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const salt = await bcryptjs.genSalt(10);
            const hashedPassword = await bcryptjs.hash(password, salt);

            user = new User({
                name: name || "Usuário Google",
                email,
                password: hashedPassword,
                role: 'student',
                registration: 'G-' + uid.slice(0, 8), // mock para Google
            });
            await user.save();
        }

        const secret = process.env.JWT_SECRET || 'secret_dev_key';
        const jwtToken = jwt.sign(
            { id: user._id, role: user.role, name: user.name },
            secret,
            { expiresIn: "24h" }
        );

        res.json({
            token: jwtToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error: any) {
        console.error("Erro de Login com Google:", error);

        if (error.code === 11000) {
            console.log("Condição de corrida detectada (Usuário criado simultaneamente). Tentando login...");
            try {
                const { email } = await admin.auth().verifyIdToken(req.body.token); // Re-decode to be safe or use scope variable
                const user = await User.findOne({ email });

                if (user) {
                    const secret = process.env.JWT_SECRET || 'secret_dev_key';
                    const token = jwt.sign(
                        { id: user._id, role: user.role, name: user.name },
                        secret,
                        { expiresIn: "24h" }
                    );

                    res.json({
                        token,
                        user: {
                            id: user._id,
                            name: user.name,
                            email: user.email,
                            role: user.role
                        }
                    });
                    return;
                }
            } catch (retryError) {
                console.error("Erro ao tentar login novamente:", retryError);
            }
        }

        res.status(500).json({ msg: "Erro interno do servidor durante autenticação com Google", error: error.message });
    }
};


export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, newPassword } = req.body;

        if (!email || !newPassword) {
            res.status(400).json({ msg: "Por favor, forneça o email e a nova senha." });
            return;
        }

        const user = await User.findOne({ email });

        if (!user) {
            res.status(404).json({ msg: "Email não encontrado." });
            return;
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(newPassword, salt);

        user.password = hashedPassword;
        await user.save();

        console.log(`[ALTERAÇÃO DE SENHA] Senha alterada para: ${email}`);

        res.json({ msg: "Senha alterada com sucesso! Você já pode fazer login." });
    } catch (error) {
        console.error("Erro de Alteração de Senha:", error);
        res.status(500).json({ msg: "Erro interno do servidor" });
    }
};
