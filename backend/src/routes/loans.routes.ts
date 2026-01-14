import { Router } from "express";
import { getAllLoans, getMyLoans, createLoan, returnBook } from "../controllers/LoanController";
import { authMiddleware, requireRole } from "../middleware/auth";

const router = Router();

router.get("/all", authMiddleware, requireRole(['admin']), getAllLoans);
router.post("/", authMiddleware, requireRole(['admin']), createLoan);
router.put("/:id/return", authMiddleware, requireRole(['admin']), returnBook);
router.get("/my-loans", authMiddleware, getMyLoans);

export default router;
