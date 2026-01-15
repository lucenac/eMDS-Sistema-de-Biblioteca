import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { StarIcon, CalendarDaysIcon, BookOpenIcon } from '@heroicons/react/24/solid';

export const DetalhesLivro = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookDetails();
    fetchComments();
  }, [id]);

  const fetchComments = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/comments/${id}`);
      if (res.ok) {
        const data = await res.json();
        setComments(data);
      }
    } catch (error) {
      console.error("Erro ao buscar comentários:", error);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Faça login para comentar.');
      return;
    }

    try {
      const res = await fetch('http://localhost:8000/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ bookId: id, content: newComment })
      });

      if (res.ok) {
        setNewComment('');
        fetchComments();
      } else {
        alert('Erro ao publicar comentário.');
      }
    } catch (error) {
      console.error(error);
    }
  };

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
        rating: data.rating,
        pages: data.pages,
        published: data.year || '2023',
        description: data.description || 'Descrição indisponível no momento.',
        coverColor: data.coverColor || 'bg-blue-600',
        coverUrl: data.coverUrl
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
          <div className={`relative aspect-[2/3] w-full max-w-[280px] rounded-r-lg shadow-2xl border-l-4 border-white/20 ${book.coverUrl ? 'bg-white' : book.coverColor} flex flex-col items-center text-center justify-center transform hover:scale-105 transition-transform duration-500 overflow-hidden`}>
            {book.coverUrl ? (
              <img
                src={book.coverUrl}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col p-6 items-center justify-center">
                <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-black/20 to-transparent"></div>
                <h1 className="font-serif font-bold text-2xl text-white leading-tight mb-2 drop-shadow-md">{book.title}</h1>
                <p className="text-white/80 italic">{book.author}</p>
                <div className="mt-auto w-10 h-10 rounded-full border-2 border-white/30 flex items-center justify-center">
                  <span className="text-[10px] text-white/50">MDS</span>
                </div>
              </div>
            )}
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

      <section className="max-w-5xl mx-auto mt-12 bg-surface backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl">
        <h3 className="text-2xl font-bold text-white mb-6">Comentários e Avaliações</h3>

        <form onSubmit={handleCommentSubmit} className="mb-8 p-6 bg-white/5 rounded-2xl border border-white/5">
          <label htmlFor="comment" className="block text-indigo-300 mb-2 font-medium">Deixe seu comentário sobre este livro:</label>
          <textarea
            id="comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full bg-indigo-950/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-accent-yellow transition-colors resize-none mb-4"
            rows={3}
            placeholder="O que você achou desta leitura?"
            required
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-accent-yellow text-primary-bg font-bold hover:bg-yellow-300 transition-colors"
            >
              Publicar Comentário
            </button>
          </div>
        </form>

        <div className="space-y-6">
          {comments.length > 0 ? (
            comments.map((comment: any) => (
              <div key={comment._id} className="border-b border-white/5 pb-6 last:border-0">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-accent-yellow font-bold text-xs uppercase border border-white/10">
                    {comment.userName.charAt(0)}
                  </div>
                  <div>
                    <span className="text-white font-bold block leading-tight">{comment.userName}</span>
                    <span className="text-xs text-indigo-400">{new Date(comment.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <p className="text-indigo-100 pl-11 text-sm leading-relaxed">{comment.content}</p>
              </div>
            ))
          ) : (
            <p className="text-indigo-300 text-center py-8 italic">Seja o primeiro a comentar sobre este livro!</p>
          )}
        </div>
      </section>

      <div className="h-12"></div> {/* Spacer */}

    </div>
  );
};