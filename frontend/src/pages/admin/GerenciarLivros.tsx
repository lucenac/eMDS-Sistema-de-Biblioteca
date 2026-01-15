import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    PlusIcon,
    PencilSquareIcon,
    TrashIcon,
    MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

// Helper to map status
const mapStatus = (status: string) => {
    switch (status) {
        case 'Available': return 'Disponível';
        case 'Borrowed': return 'Empréstimo';
        case 'Unavailable': return 'Indisponível';
        default: return status;
    }
};

export const GerenciarLivros = () => {
    const [books, setBooks] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const res = await fetch('http://localhost:8000/api/books');
            const data = await res.json();
            // Map _id to id and translate status if needed
            const mapped = data.map((b: any) => ({
                id: b._id,
                title: b.title,
                author: b.author,
                category: b.category,
                isbn: b.isbn,
                coverUrl: b.coverUrl,
                status: mapStatus(b.status)
            }));
            setBooks(mapped);
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };

    const handleDelete = async (id: string) => {
        if (globalThis.confirm('Tem certeza que deseja excluir este livro?')) {
            // In a real app, call API delete here
            // await fetch(`http://localhost:8000/api/books/${id}`, { method: 'DELETE', headers... });
            setBooks(books.filter(b => b.id !== id));
        }
    };

    return (
        <div className="space-y-8">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tight">Gerenciar Livros</h1>
                    <p className="text-indigo-200 mt-1">Adicione, edite ou remova títulos do acervo.</p>
                </div>
                <button
                    onClick={() => navigate('/admin/livros/novo')}
                    className="flex items-center gap-2 bg-accent-yellow hover:bg-yellow-300 text-primary-bg font-bold py-3 px-6 rounded-xl shadow-[0_0_15px_rgba(250,204,21,0.3)] transition-all uppercase tracking-wide"
                >
                    <PlusIcon className="h-5 w-5" />
                    Novo Livro
                </button>
            </div>

            {/* Content Card */}
            <div className="bg-surface backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl">

                {/* Search Bar */}
                <div className="p-6 border-b border-white/10">
                    <div className="relative max-w-md">
                        <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-indigo-300" />
                        <input
                            type="text"
                            placeholder="Buscar por título, autor ou ISBN..."
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-indigo-300/50 focus:outline-none focus:border-accent-yellow focus:ring-1 focus:ring-accent-yellow transition-all"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-white/5 text-indigo-200 uppercase text-xs font-bold tracking-wider">
                            <tr>
                                <th className="p-6">Título</th>
                                <th className="p-6">Autor / Categoria</th>
                                <th className="p-6">ISBN</th>
                                <th className="p-6">Status</th>
                                <th className="p-6 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {books.map((book) => (
                                <tr key={book.id} className="hover:bg-white/5 transition-colors">
                                    <td className="p-6 flex items-center gap-4">
                                        <div className="w-10 h-14 rounded overflow-hidden bg-white/5 shrink-0 border border-white/10">
                                            {book.coverUrl ? (
                                                <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full bg-indigo-600"></div>
                                            )}
                                        </div>
                                        <span className="font-bold text-white block text-lg">{book.title}</span>
                                    </td>
                                    <td className="p-6">
                                        <div className="text-white">{book.author}</div>
                                        <span className="text-xs text-indigo-300 bg-indigo-500/20 px-2 py-0.5 rounded border border-indigo-500/30">{book.category}</span>
                                    </td>
                                    <td className="p-6 text-indigo-200 font-mono text-sm">
                                        {book.isbn}
                                    </td>
                                    <td className="p-6">
                                        <span className={`
                                            px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                                            ${book.status === 'Disponível' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : ''}
                                            ${book.status === 'Empréstimo' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' : ''}
                                            ${book.status === 'Indisponível' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : ''}
                                        `}>
                                            {book.status}
                                        </span>
                                    </td>
                                    <td className="p-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => navigate(`/admin/livros/editar/${book.id}`)}
                                                className="p-2 rounded-lg bg-indigo-500/20 text-indigo-300 hover:bg-accent-yellow hover:text-primary-bg transition-colors"
                                            >
                                                <PencilSquareIcon className="h-5 w-5" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(book.id)}
                                                className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                                            >
                                                <TrashIcon className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination (Static) */}
                <div className="p-6 border-t border-white/10 flex justify-center">
                    <div className="flex gap-2">
                        <button className="px-4 py-2 rounded-lg bg-white/5 text-indigo-300 hover:bg-white/10 disabled:opacity-50">Anterior</button>
                        <button className="px-4 py-2 rounded-lg bg-accent-yellow text-primary-bg font-bold">1</button>
                        <button className="px-4 py-2 rounded-lg bg-white/5 text-indigo-300 hover:bg-white/10">2</button>
                        <button className="px-4 py-2 rounded-lg bg-white/5 text-indigo-300 hover:bg-white/10">Próximo</button>
                    </div>
                </div>

            </div>
        </div>
    );
};
