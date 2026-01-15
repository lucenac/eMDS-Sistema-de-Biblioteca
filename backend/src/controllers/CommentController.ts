import { Request, Response } from 'express';
import Comment from '../models/Comment';

export class CommentController {
    static async createComment(req: Request, res: Response) {
        try {
            const { bookId, content } = req.body;
            const userId = (req as any).user.id;
            const userName = (req as any).user.name;

            if (!content) {
                res.status(400).json({ msg: 'O conteúdo do comentário é obrigatório.' });
                return;
            }

            const comment = new Comment({
                bookId,
                userId,
                userName,
                content
            });

            await comment.save();

            res.status(201).json(comment);
        } catch (error) {
            console.error("Erro ao criar comentário:", error);
            res.status(500).json({ msg: 'Erro interno ao criar comentário.' });
        }
    }

    static async getCommentsByBook(req: Request, res: Response) {
        try {
            const { bookId } = req.params;
            const comments = await Comment.find({ bookId }).sort({ createdAt: -1 });
            res.json(comments);
        } catch (error) {
            console.error("Erro ao buscar comentários:", error);
            res.status(500).json({ msg: 'Erro interno ao buscar comentários.' });
        }
    }
}
