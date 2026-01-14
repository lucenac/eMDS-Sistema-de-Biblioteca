import * as admin from "firebase-admin";
import path from "node:path";

const serviceAccount = process.env.GOOGLE_APPLICATION_CREDENTIALS;

if (!serviceAccount) {
  console.error("ERRO CRÍTICO: Variável GOOGLE_APPLICATION_CREDENTIALS não encontrada no .env!");
  console.error("Verifique se o arquivo .env está na pasta raiz do backend e se a chave está definida.");
  process.exit(1);
}

const absolutePath = path.resolve(serviceAccount);
console.log("Tentando ler credenciais em:", absolutePath);

try {
  admin.initializeApp({
    credential: admin.credential.cert(require(path.resolve(serviceAccount))),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET
  });
} catch (error) {
  console.error("Erro ao inicializar Firebase:", error);
  process.exit(1);
}

const bucket = admin.storage().bucket();

export { admin };
export default bucket;