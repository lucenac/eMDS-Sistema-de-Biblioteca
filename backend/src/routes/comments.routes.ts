import { Router } from 'express';
import { CommentController } from '../controllers/CommentController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.post('/', authMiddleware, CommentController.createComment);
router.get('/:bookId', CommentController.getCommentsByBook);

export default router;
