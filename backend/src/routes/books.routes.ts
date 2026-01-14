import { Router } from "express";
import { getBooks, getBookById, createBook, updateBook, deleteBook } from "../controllers/BookController";
import { authMiddleware, requireRole } from "../middleware/auth";
import upload from "../config/upload";

const router = Router();

router.get("/", getBooks);
router.get("/:id", getBookById);

router.post("/", authMiddleware, requireRole(['admin']), upload.single('cover'), createBook);
router.put("/:id", authMiddleware, requireRole(['admin']), upload.single('cover'), updateBook);
router.delete("/:id", authMiddleware, requireRole(['admin']), deleteBook);

export default router;
