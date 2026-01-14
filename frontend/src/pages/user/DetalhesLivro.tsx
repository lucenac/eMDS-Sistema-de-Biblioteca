import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { StarIcon, CalendarDaysIcon, BookOpenIcon } from '@heroicons/react/24/solid';

export const DetalhesLivro = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookDetails();
  }, [id]);

  const fetchBookDetails = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/books/${id}`);
      if (!res.ok) throw new Error('Livro não encontrado');
      const data = await res.json();
      setBook({
        id: data._id,
        title: data.title,
        author: data.author,
        category: data.category,
        rating: 4.5, // Mockup
        pages: 300 + Math.floor(Math.random() * 500), // Mockup
        published: '2023', // Mockup
        description: 'Descrição indisponível no momento.', // Mockup
        coverColor: data.coverColor || 'bg-blue-600'
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleReserve = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Você precisa estar logado para reservar.');
        navigate('/login');
        return;
      }

      const res = await fetch('http://localhost:8000/api/loans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          bookId: id,
          days: 14
        })
      });

      if (res.ok) {
        alert('Empréstimo realizado com sucesso!');
        navigate('/aluno');
      } else {
        const err = await res.json();
        alert(`Erro ao reservar: ${err.message || 'Tente novamente.'}`);
      }
    } catch (error) {
      console.error(error);
      alert('Erro de conexão.');
    }
  };

  if (loading) return <div className="text-white text-center py-20">Carregando detalhes...</div>;
  if (!book) return <div className="text-white text-center py-20">Livro não encontrado.</div>;

  return (
    <div className="max-w-5xl mx-auto py-8">

      <div className="flex flex-col md:flex-row gap-10 bg-surface backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">

        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

        <div className="w-full md:w-1/3 flex justify-center sticky top-8 h-fit z-10">
          <div className={`relative aspect-[2/3] w-full max-w-[280px] rounded-r-lg shadow-2xl border-l-4 border-white/20 ${book.coverColor} flex flex-col p-6 items-center text-center justify-center transform hover:scale-105 transition-transform duration-500`}>
            <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-black/20 to-transparent"></div>
            <h1 className="font-serif font-bold text-2xl text-white leading-tight mb-2 drop-shadow-md">{book.title}</h1>
            <p className="text-white/80 italic">{book.author}</p>
            <div className="mt-auto w-10 h-10 rounded-full border-2 border-white/30 flex items-center justify-center">
              <span className="text-[10px] text-white/50">MDS</span>
            </div>
          </div>
        </div>

        <div className="w-full md:w-2/3 flex flex-col z-10">

          <div className="mb-4">
            <span className="inline-block px-3 py-1 rounded-full bg-accent-yellow/10 border border-accent-yellow/20 text-accent-yellow text-xs font-bold uppercase tracking-widest mb-2">
              {book.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">{book.title}</h1>
            <p className="text-xl text-indigo-200 font-light">de <span className="text-white font-medium">{book.author}</span></p>
          </div>

          <div className="flex items-center gap-6 mb-8 text-sm text-indigo-300 border-y border-white/5 py-4">
            <div className="flex items-center gap-1.5">
              <StarIcon className="h-5 w-5 text-accent-yellow" />
              <span className="font-bold text-white">{book.rating}</span> Avaliação
            </div>
            <div className="flex items-center gap-1.5">
              <BookOpenIcon className="h-5 w-5" />
              <span className="font-bold text-white">{book.pages}</span> Páginas
            </div>
            <div className="flex items-center gap-1.5">
              <CalendarDaysIcon className="h-5 w-5" />
              <span className="font-bold text-white">{book.published}</span>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold text-white mb-3">Sinopse</h3>
            <p className="text-indigo-100 leading-relaxed text-lg font-light opacity-90">
              {book.description}
            </p>
          </div>

          <div className="mt-auto flex flex-col md:flex-row gap-4">
            <button
              onClick={handleReserve}
              className="flex-1 bg-accent-yellow hover:bg-yellow-300 text-primary-bg font-black py-4 rounded-xl shadow-[0_0_20px_rgba(250,204,21,0.3)] hover:shadow-[0_0_30px_rgba(250,204,21,0.5)] transform active:scale-[0.98] transition-all uppercase tracking-wide text-lg"
            >
              Reservar Agora
            </button>
            <button className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-4 rounded-xl transition-all uppercase tracking-wide">
              Adicionar à Cesta
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};