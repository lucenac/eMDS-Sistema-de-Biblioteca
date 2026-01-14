import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
    try {
        const url = process.env.URL_BDMONGO?.trim();
        if (!url) {
            console.error("Error: URL_BDMONGO não foi definido no .env");
            process.exit(1);
        }

        await mongoose.connect(url);
        console.log("Conectado ao MongoDB");
    } catch (error) {
        console.error("Erro de Conexão ao Banco de Dados:", error);
        process.exit(1);
    }
};

export default connectDB;
