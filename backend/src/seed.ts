import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Book from './models/Book';
import User from './models/User';
import bcryptjs from 'bcryptjs';

dotenv.config();

const seed = async () => {
    try {
        await mongoose.connect(process.env.URL_BDMONGO as string);
        console.log('Conectado a base de dados');

        const adminEmail = 'admin@library.com';
        const userExists = await User.findOne({ email: adminEmail });

        if (!userExists) {
            const salt = await bcryptjs.genSalt(10);
            const password = await bcryptjs.hash('admin123', salt);

            const admin = new User({
                name: 'Admin User',
                email: adminEmail,
                password: password,
                role: 'admin',
                registration: 'ADMIN001'
            });
            await admin.save();
            console.log('Admin user created');
        } else {
            console.log('Admin user already exists');
        }

        const books = [
            {
                title: 'Clean Code',
                author: 'Robert C. Martin',
                isbn: '9780132350884',
                category: 'Technology',
                description: 'A Handbook of Agile Software Craftsmanship',
                coverColor: 'bg-blue-600',
                status: 'Available'
            },
            {
                title: 'The Pragmatic Programmer',
                author: 'Andrew Hunt',
                isbn: '9780201616224',
                category: 'Technology',
                description: 'Your Journey to Mastery',
                coverColor: 'bg-purple-600',
                status: 'Available'
            },
            {
                title: 'Design Patterns',
                author: 'Erich Gamma',
                isbn: '9780201633610',
                category: 'Technology',
                description: 'Elements of Reusable Object-Oriented Software',
                coverColor: 'bg-green-600',
                status: 'Borrowed'
            }
        ];

        for (const book of books) {
            const bookExists = await Book.findOne({ isbn: book.isbn });
            if (!bookExists) {
                await Book.create(book);
                console.log(`Book created: ${book.title}`);
            }
        }

        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seed();
