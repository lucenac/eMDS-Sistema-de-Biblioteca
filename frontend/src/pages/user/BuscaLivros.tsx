import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { BookCard } from '../../components/ui/BookCard';

export const BuscaLivros = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const filters = ['Todos', 'Technology', 'Ficção', 'Romance', 'Ciência', 'História'];

  useEffect(() => {
    fetchBooks();
  }, [activeFilter]);

  const fetchBooks = async (term = searchTerm) => {
    setLoading(true);
    try {
      let query = `http://localhost:8000/api/books?`;
      if (term) query += `search=${term}&`;
      if (activeFilter !== 'Todos') query += `category=${activeFilter}`;

      const res = await fetch(query);
      const data = await res.json();

      const mapped = data.map((book: any) => ({
        id: book._id,
        title: book.title,
        author: book.author,
        category: book.category,
        coverColor: book.coverColor || 'bg-indigo-600',
        coverUrl: book.coverUrl
      }));

      setBooks(mapped);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      fetchBooks();
    }
  };

  return (
    <div className="space-y-8 pb-12">

      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
            <MagnifyingGlassIcon className="h-8 w-8 text-accent-yellow" />
            Explorar Acervo
          </h1>
          <p className="text-indigo-200 mt-2">Encontre o livro perfeito para seus estudos ou lazer.</p>
        </div>

        <div className="relative max-w-2xl">
          <input
            type="text"
            placeholder="Pesquisar por título, autor ou ISBN... (Pressione Enter)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
            className="w-full pl-12 pr-4 py-4 rounded-xl bg-surface border border-white/10 text-white placeholder-indigo-300/50 focus:outline-none focus:border-accent-yellow focus:ring-1 focus:ring-accent-yellow transition-all shadow-lg"
          />
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-indigo-300" />
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-bold text-indigo-300 mr-2 flex items-center gap-1">
            <FunnelIcon className="h-4 w-4" /> Filtros:
          </span>
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`
                        px-4 py-1.5 rounded-full text-sm font-medium transition-all
                        ${activeFilter === filter
                  ? 'bg-accent-yellow text-primary-bg font-bold shadow-md transform scale-105'
                  : 'bg-white/5 text-indigo-200 hover:bg-white/10 border border-white/5'}
                    `}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">
            {loading ? 'Buscando...' : `Resultados (${books.length})`}
          </h2>
        </div>

        {books.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 animate-fade-in-up">
            {books.map((book) => (
              <div key={book.id} className="flex justify-center">
                <BookCard
                  id={book.id}
                  title={book.title}
                  author={book.author}
                  category={book.category}
                  coverColor={book.coverColor}
                  coverUrl={book.coverUrl}
                  onClick={() => navigate(`/aluno/livros/${book.id}`)}
                />
              </div>
            ))}
          </div>
        ) : (
          !loading && (
            <div className="text-center py-20 bg-surface rounded-3xl border border-white/5 border-dashed">
              <p className="text-indigo-300 text-lg">Nenhum livro encontrado com esses termos.</p>
              <button
                onClick={() => { setSearchTerm(''); setActiveFilter('Todos'); fetchBooks(''); }}
                className="mt-4 text-accent-yellow hover:underline"
              >
                Limpar filtros
              </button>
            </div>
          )
        )}
      </section>

    </div>
  );
};