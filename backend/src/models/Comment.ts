import mongoose, { Schema, Document } from "mongoose";

export interface IComment extends Document {
    bookId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    userName: string;
    content: string;
    createdAt: Date;
}

const CommentSchema: Schema = new Schema({
    bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    userName: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Comment = mongoose.model<IComment>("Comment", CommentSchema);
export default Comment;
