import * as admin from "firebase-admin";
import path from "path";

const serviceAccount = process.env.GOOGLE_APPLICATION_CREDENTIALS;

if (!serviceAccount) {
  console.error("Por favor, asegúrate de que la variable de entorno GOOGLE_APPLICATION_CREDENTIALS esté configurada.");
  process.exit(1); 
}

try {
  admin.initializeApp({
    credential: admin.credential.cert(require(path.resolve(serviceAccount))),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET
  });
} catch (error) {
  console.error("Error al inicializar Firebase:", error);
  process.exit(1);
}

const bucket = admin.storage().bucket();

export default bucket;