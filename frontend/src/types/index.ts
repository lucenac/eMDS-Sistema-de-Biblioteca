export interface User {
  id: string;
  name: string;
  email: string;     
  role: 'admin' | 'student';
  avatarUrl?: string;
  registration?: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  coverUrl: string;
  year?: number;
  publisher?: string;
}

export interface Loan {
  id: string;
  book: Book;
  loanDate: string; 
  returnDate: string; 
  status: 'active' | 'late' | 'returned';
}