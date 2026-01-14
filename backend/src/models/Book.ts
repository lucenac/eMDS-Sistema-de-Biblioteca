import mongoose, { Schema, Document } from "mongoose";

export interface IBook extends Document {
    title: string;
    author: string;
    isbn: string;
    category: string;
    description: string;
    coverUrl?: string;
    coverColor: string;
    pages: number;
    year: number;
    status: 'Available' | 'Borrowed' | 'Unavailable';
    rating: number;
    createdAt: Date;
}

const BookSchema: Schema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    isbn: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    description: { type: String, default: '' },
    coverUrl: { type: String, default: '' },
    coverColor: { type: String, default: 'bg-indigo-600' },
    pages: { type: Number, default: 0 },
    year: { type: Number },
    status: {
        type: String,
        enum: ['Available', 'Borrowed', 'Unavailable'],
        default: 'Available'
    },
    rating: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

const Book = mongoose.model<IBook>("Book", BookSchema);
export default Book;
