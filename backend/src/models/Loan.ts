import mongoose, { Schema, Document } from "mongoose";

export interface ILoan extends Document {
    bookId: mongoose.Schema.Types.ObjectId;
    userId: mongoose.Schema.Types.ObjectId;
    loanDate: Date;
    dueDate: Date;
    returnDate?: Date;
    status: 'Active' | 'Returned' | 'Overdue';
}

const LoanSchema: Schema = new Schema({
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    loanDate: {
        type: Date,
        default: Date.now
    },
    dueDate: {
        type: Date,
        required: true
    },
    returnDate: {
        type: Date
    },
    status: {
        type: String,
        enum: ['Active', 'Returned', 'Overdue'],
        default: 'Active'
    }
});

const Loan = mongoose.model<ILoan>("Loan", LoanSchema);
export default Loan;
