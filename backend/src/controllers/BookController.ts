import { Request, Response } from "express";
import Book from "../models/Book";

export const getBooks = async (req: Request, res: Response): Promise<void> => {
    try {
        const { search, category } = req.query;
        let query: any = {};

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { author: { $regex: search, $options: 'i' } },
                { isbn: { $regex: search, $options: 'i' } }
            ];
        }

        if (category && category !== 'Todos') {
            query.category = category;
        }

        const books = await Book.find(query);
        res.status(200).json(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Erro ao buscar livros" });
    }
};

export const getBookById = async (req: Request, res: Response): Promise<void> => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            res.status(404).json({ msg: "Livro não encontrado" });
            return;
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ msg: "Erro interno do servidor" });
    }
};

export const createBook = async (req: Request, res: Response): Promise<void> => {
    try {
        const bookData = req.body;
        const baseUrl = process.env.BASE_URL || 'http://localhost:8000';
        if (req.file) {
            bookData.coverUrl = `${baseUrl}/uploads/${req.file.filename}`;
        }

        const newBook = new Book(bookData);
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        console.error("Erro ao criar livro:", error);
        res.status(500).json({ msg: "Erro ao criar livro" });
    }
};

export const updateBook = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log("Update Book Request ID:", req.params.id);
        console.log("Body:", req.body);
        console.log("File:", req.file);

        const bookData = { ...req.body };

        const baseUrl = process.env.BASE_URL || 'http://localhost:8000';

        if (req.file) {
            bookData.coverUrl = `${baseUrl}/uploads/${req.file.filename}`;
        }

        if (bookData.pages) bookData.pages = Number(bookData.pages);
        if (bookData.year) bookData.year = Number(bookData.year);
        if (bookData.rating) bookData.rating = Number(bookData.rating);

        const book = await Book.findByIdAndUpdate(req.params.id, bookData, { new: true });

        if (!book) {
            console.log("Book not found for update");
            res.status(404).json({ msg: "Book not found" });
            return;
        }

        console.log("Livro atualizado com sucesso:", book);
        res.status(200).json(book);
    } catch (error: any) {
        console.error("Erro ao atualizar livro:", error);

        if (error.code === 11000) {
            res.status(400).json({ msg: "Erro: Este ISBN já pertence a outro livro." });
            return;
        }

        res.status(500).json({ msg: "Erro ao atualizar livro", error: error.message });
    }
};

export const deleteBook = async (req: Request, res: Response): Promise<void> => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.status(200).json({ msg: "Livro deletado com sucesso" });
    } catch (error) {
        res.status(500).json({ msg: "Erro ao deletar livro" });
    }
};
