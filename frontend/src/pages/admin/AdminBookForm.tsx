import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftIcon, Save, BookOpen, Hash, Tag, Calendar, Layers, Star, AlertCircle } from 'lucide-react';

interface BookForm {
    title: string;
    author: string;
    isbn: string;
    category: string;
    description: string;
    coverColor: string;
    pages: number;
    year: number;
    status: 'Available' | 'Borrowed' | 'Unavailable';
    rating: number;
}

const INITIAL_STATE: BookForm = {
    title: '',
    author: '',
    isbn: '',
    category: '',
    description: '',
    coverColor: 'bg-indigo-600',
    pages: 0,
    year: new Date().getFullYear(),
    status: 'Available',
    rating: 0
};

export const AdminBookForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    const [formData, setFormData] = useState<BookForm>(INITIAL_STATE);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [coverFile, setCoverFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        if (isEditMode) {
            setLoading(true);
            fetch(`http://localhost:8000/api/books/${id}`)
                .then(res => {
                    if (!res.ok) throw new Error('Failed to fetch book');
                    return res.json();
                })
                .then(data => {
                    setFormData({
                        title: data.title,
                        author: data.author,
                        isbn: data.isbn,
                        category: data.category,
                        description: data.description,
                        coverColor: data.coverColor || 'bg-indigo-600',
                        pages: data.pages,
                        year: data.year,
                        status: data.status,
                        rating: data.rating
                    });
                    if (data.coverUrl) {
                        setPreviewUrl(data.coverUrl);
                    }
                })
                .catch(err => setError(err.message))
                .finally(() => setLoading(false));
        }
    }, [id, isEditMode]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            const file = e.target.files[0];
            setCoverFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!isEditMode && !coverFile) {
            setError('A capa do livro é obrigatória para novos cadastros.');
            setLoading(false);
            return;
        }

        if (isEditMode && !coverFile && !previewUrl) {
            setError('Este livro precisa de uma capa.');
            setLoading(false);
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const url = isEditMode
                ? `http://localhost:8000/api/books/${id}`
                : 'http://localhost:8000/api/books';

            const method = isEditMode ? 'PUT' : 'POST';

            const data = new FormData();
            Object.keys(formData).forEach(key => {
                if (key !== 'coverUrl') {
                    data.append(key, String((formData as unknown as Record<string, any>)[key]));
                }
            });

            if (coverFile) {
                data.append('cover', coverFile);
            }

            const response = await fetch(url, {
                method,
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: data
            });

            if (!response.ok) {
                const resData = await response.json();
                throw new Error(resData.msg || 'Failed to save book');
            }

            // Success
            navigate('/admin/livros');

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading && isEditMode && !formData.title) return <div className="text-white p-8">Carregando...</div>;

    return (
        <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-8 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <button
                        onClick={() => navigate('/admin/livros')}
                        className="flex items-center text-indigo-300 hover:text-white mb-2 transition-colors"
                    >
                        <ArrowLeftIcon className="w-4 h-4 mr-2" />
                        Voltar para Lista
                    </button>
                    <h1 className="text-3xl font-black text-white tracking-tight">
                        {isEditMode ? 'Editar Livro' : 'Novo Livro'}
                    </h1>
                    <p className="text-indigo-200">Preencha os dados abaixo para {isEditMode ? 'atualizar' : 'cadastrar'} um livro.</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl flex items-center">
                        <AlertCircle className="w-5 h-5 mr-2 text-red-400" />
                        {error}
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit} className="bg-surface/50 backdrop-blur-xl border border-white/5 rounded-2xl p-6 md:p-8 shadow-xl space-y-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-indigo-300 flex items-center gap-2">
                            <BookOpen className="w-4 h-4" /> Título
                        </label>
                        <input
                            required
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full bg-indigo-950/30 border border-indigo-500/30 rounded-lg p-3 text-white focus:outline-none focus:border-accent-yellow transition-colors"
                            placeholder="Dom Casmurro"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-indigo-300 flex items-center gap-2">
                            <Star className="w-4 h-4" /> Autor
                        </label>
                        <input
                            required
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            className="w-full bg-indigo-950/30 border border-indigo-500/30 rounded-lg p-3 text-white focus:outline-none focus:border-accent-yellow transition-colors"
                            placeholder="Machado de Assis"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-indigo-300 flex items-center gap-2">
                            <Tag className="w-4 h-4" /> Categoria
                        </label>
                        <select
                            required
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full bg-indigo-950/30 border border-indigo-500/30 rounded-lg p-3 text-white focus:outline-none focus:border-accent-yellow transition-colors"
                        >
                            <option value="">Selecione...</option>
                            <option value="Tecnologia">Tecnologia</option>
                            <option value="Ficção">Ficção</option>
                            <option value="Romance">Romance</option>
                            <option value="Ciência">Ciência</option>
                            <option value="História">História</option>
                            <option value="Fantasia">Fantasia</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-indigo-300 flex items-center gap-2">
                            <Hash className="w-4 h-4" /> ISBN
                        </label>
                        <input
                            required
                            name="isbn"
                            value={formData.isbn}
                            onChange={handleChange}
                            className="w-full bg-indigo-950/30 border border-indigo-500/30 rounded-lg p-3 text-white focus:outline-none focus:border-accent-yellow transition-colors"
                            placeholder="978-..."
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-indigo-300 flex items-center gap-2">
                            <Calendar className="w-4 h-4" /> Ano
                        </label>
                        <input
                            type="number"
                            required
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            className="w-full bg-indigo-950/30 border border-indigo-500/30 rounded-lg p-3 text-white focus:outline-none focus:border-accent-yellow transition-colors"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-indigo-300 flex items-center gap-2">
                            <Layers className="w-4 h-4" /> Páginas
                        </label>
                        <input
                            type="number"
                            name="pages"
                            value={formData.pages}
                            onChange={handleChange}
                            className="w-full bg-indigo-950/30 border border-indigo-500/30 rounded-lg p-3 text-white focus:outline-none focus:border-accent-yellow transition-colors"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="status" className="text-sm font-medium text-indigo-300 flex items-center gap-2">
                            Status
                        </label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full bg-indigo-950/30 border border-indigo-500/30 rounded-lg p-3 text-white focus:outline-none focus:border-accent-yellow transition-colors"
                        >
                            <option value="Available">Disponível</option>
                            <option value="Borrowed">Emprestado</option>
                            <option value="Unavailable">Indisponível</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="coverColor" className="text-sm font-medium text-indigo-300 flex items-center gap-2">
                            Cor da Capa
                        </label>
                        <select
                            id="coverColor"
                            name="coverColor"
                            value={formData.coverColor}
                            onChange={handleChange}
                            className="w-full bg-indigo-950/30 border border-indigo-500/30 rounded-lg p-3 text-white focus:outline-none focus:border-accent-yellow transition-colors"
                        >
                            <option value="bg-indigo-600">Indigo (Padrão)</option>
                            <option value="bg-blue-600">Azul</option>
                            <option value="bg-emerald-600">Verde</option>
                            <option value="bg-amber-600">Âmbar</option>
                            <option value="bg-rose-600">Rosa</option>
                            <option value="bg-purple-600">Roxo</option>
                            <option value="bg-slate-700">Preto</option>
                        </select>
                        <div className={`mt-2 h-8 w-full rounded ${formData.coverColor}`}></div>
                    </div>
                    <div className="space-y-2">
                        <span className="text-sm font-medium text-indigo-300 flex items-center gap-2">
                            Capa do Livro
                        </span>
                        <div className="flex items-start gap-4">
                            <label className="flex-1 cursor-pointer group">
                                <span className="sr-only">Selecione uma capa para o livro</span>
                                <div className="border-2 border-dashed border-indigo-500/30 rounded-lg p-4 text-center hover:border-accent-yellow transition-colors bg-indigo-950/30">
                                    <p className="text-sm text-indigo-300 group-hover:text-accent-yellow transition-colors">
                                        Clique para selecionar uma imagem
                                    </p>
                                    <input
                                        type="file"
                                        name="cover"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                </div>
                            </label>
                            {previewUrl && (
                                <div className="w-16 h-24 rounded overflow-hidden border border-white/10 shrink-0">
                                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium text-indigo-300">Descrição</label>
                    <textarea
                        id="description"
                        rows={4}
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full bg-indigo-950/30 border border-indigo-500/30 rounded-lg p-3 text-white focus:outline-none focus:border-accent-yellow transition-colors resize-none"
                    />
                </div>

                <div className="pt-4 border-t border-white/5 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={() => navigate('/admin/livros')}
                        className="px-6 py-2 rounded-xl text-white hover:bg-white/5 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 bg-accent-yellow text-primary-bg font-bold px-8 py-2.5 rounded-xl hover:bg-yellow-300 hover:shadow-lg hover:shadow-yellow-500/20 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Salvando...' : (
                            <>
                                <Save className="w-5 h-5" />
                                {isEditMode ? 'Atualizar Livro' : 'Salvar Livro'}
                            </>
                        )}
                    </button>
                </div>

            </form>
        </div>
    );
};
