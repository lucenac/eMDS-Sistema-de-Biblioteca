import { Request, Response } from "express";
import Loan from "../models/Loan";
import Book from "../models/Book";
import User from "../models/User";

export const getAllLoans = async (req: Request, res: Response): Promise<void> => {
    try {
        const loans = await Loan.find()
            .populate('bookId', 'title author isbn')
            .populate('userId', 'name email registration');
        res.json(loans);
    } catch (error) {
        res.status(500).json({ msg: "Error fetching loans" });
    }
};

export const getMyLoans = async (req: Request, res: Response): Promise<void> => {
    try {
        // @ts-ignore 
        const userId = req.user.id;
        const loans = await Loan.find({ userId }).populate('bookId', 'title author coverColor');
        res.json(loans);
    } catch (error) {
        res.status(500).json({ msg: "Error fetching user loans" });
    }
};

export const createLoan = async (req: Request, res: Response): Promise<void> => {
    try {
        const { bookId, userId, days } = req.body;

        const book = await Book.findById(bookId);
        if (!book || book.status !== 'Available') {
            res.status(400).json({ msg: "Book is not available" });
            return;
        }

        const loanDate = new Date();
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + (days || 14));

        const newLoan = new Loan({
            bookId,
            userId,
            loanDate,
            dueDate
        });

        await newLoan.save();

        book.status = 'Borrowed';
        await book.save();

        res.status(201).json(newLoan);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error creating loan" });
    }
};

export const returnBook = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const loan = await Loan.findById(id);

        if (!loan) {
            res.status(404).json({ msg: "Loan not found" });
            return;
        }

        if (loan.status === 'Returned') {
            res.status(400).json({ msg: "Book already returned" });
            return;
        }

        loan.returnDate = new Date();
        loan.status = 'Returned';
        await loan.save();
        await Book.findByIdAndUpdate(loan.bookId, { status: 'Available' });

        res.json({ msg: "Book returned successfully" });

    } catch (error) {
        res.status(500).json({ msg: "Error returning book" });
    }
};
