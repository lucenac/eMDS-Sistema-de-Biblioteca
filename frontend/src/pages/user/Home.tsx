import { useState, useEffect } from 'react';
import { ArrowPathIcon, ExclamationCircleIcon, ClockIcon } from '@heroicons/react/24/outline';
import { BookCard } from '../../components/ui/BookCard';
import { useAuth } from '../../contexts/AuthContext';

export default function HomeUser() {
  const { user } = useAuth();
  const [loans, setLoans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // sis de recomenadação - update futuro
  const recommendations = [
    { id: 1, title: 'O Hobbit', author: 'J.R.R. Tolkien', category: 'Fantasia', color: 'bg-green-700' },
    { id: 2, title: '1984', author: 'George Orwell', category: 'Ficção', color: 'bg-red-800' },
    { id: 3, title: 'Duna', author: 'Frank Herbert', category: 'Sci-Fi', color: 'bg-orange-700' },
    { id: 4, title: 'Neuromancer', author: 'William Gibson', category: 'Cyberpunk', color: 'bg-purple-800' },
  ];

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const res = await fetch('http://localhost:8000/api/loans/my-loans', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await res.json();
        const mapped = data.map((l: any) => ({
          id: l._id,
          title: l.bookId.title,
          date: new Date(l.loanDate).toLocaleDateString(),
          returnDate: new Date(l.dueDate).toLocaleDateString(),
          status: l.status.toLowerCase() // 'active', 'overdue', 'returned'
        }));
        setLoans(mapped);
      } catch (error) {
        console.error("Erro ao buscar empréstimos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLoans();
  }, []);

  return (
    <div className="space-y-10 pb-12">

      <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight mb-2">
            Olá, <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-yellow to-yellow-200">{user?.name || 'Visitante'}</span>
          </h1>
          <p className="text-indigo-200">Bem-vindo de volta ao acervo digital.</p>
        </div>

        <div className="bg-surface backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 flex items-center gap-2">
          <ClockIcon className="h-5 w-5 text-accent-yellow" />
          <span className="text-sm font-mono text-white">Status: Regular</span>
        </div>
      </div>

      <section className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <div className="w-2 h-8 bg-accent-yellow rounded-full"></div>
            Meus Empréstimos
            <span className="text-sm font-normal text-indigo-300 ml-2">({loans.length})</span>
          </h2>
        </div>

        {loading ? (
          <div className="text-indigo-300">Carregando seus empréstimos...</div>
        ) : (
          <div className="bg-surface backdrop-blur-xl rounded-3xl p-6 border border-white/5 shadow-2xl overflow-x-auto">
            <table className="w-full min-w-[600px] text-left border-collapse">
              <thead>
                <tr className="text-indigo-200 text-sm border-b border-white/10">
                  <th className="pb-4 font-medium pl-4">Livro</th>
                  <th className="pb-4 font-medium">Data Empréstimo</th>
                  <th className="pb-4 font-medium">Devolução</th>
                  <th className="pb-4 font-medium text-right pr-4">Ação / Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loans.map((loan) => (
                  <tr key={loan.id} className="group hover:bg-white/5 transition-colors">
                    <td className="py-4 pl-4 font-bold text-white text-lg">{loan.title}</td>
                    <td className="py-4 font-mono text-indigo-200">{loan.date}</td>
                    <td className={`py-4 font-mono font-bold ${loan.status === 'overdue' ? 'text-red-400' : 'text-green-400'}`}>
                      {loan.returnDate}
                    </td>
                    <td className="py-4 text-right pr-4">
                      {loan.status === 'overdue' ? (
                        <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/50 text-red-200 px-3 py-1.5 rounded-full">
                          <ExclamationCircleIcon className="h-4 w-4" />
                          <span className="text-xs font-bold uppercase tracking-wide">Atrasado</span>
                        </div>
                      ) : (
                        <button className="inline-flex items-center gap-2 bg-accent-yellow/90 hover:bg-accent-yellow text-primary-bg px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-wide transition-all hover:scale-105 shadow-[0_0_15px_rgba(250,204,21,0.3)]">
                          <ArrowPathIcon className="h-4 w-4" />
                          Renovar
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
          <div className="w-2 h-8 bg-purple-500 rounded-full"></div>
          Recomendados para Você
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {recommendations.map((book) => (
            <div key={book.id} className="flex justify-center">
              <BookCard
                title={book.title}
                author={book.author}
                category={book.category}
                coverColor={book.color}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}