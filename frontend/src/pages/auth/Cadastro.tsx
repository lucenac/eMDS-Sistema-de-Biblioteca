import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginIllustration from '../../assets/login_illustration.png';
import Logo from '../../assets/svg/logo.svg';

export const Cadastro = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        registration: '', // Matrícula
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:8000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                alert('Cadastro realizado com sucesso! Faça login.');
                navigate('/login');
            } else {
                const data = await res.json();
                alert(data.msg || 'Erro ao cadastrar.');
            }
        } catch (error) {
            console.error(error);
            alert('Falha na conexão.');
        }
    };

    return (
        <div className="flex flex-col-reverse md:flex-row h-auto md:h-[85vh] w-full max-w-5xl bg-surface backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl border border-white/10 my-8">

            {/* === LEFT COLUMN: FORM === */}
            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center relative z-20">

                <div className="mb-4 select-none">
                    <img src={Logo} alt="eMDS" className="h-8 opacity-80" />
                </div>

                <h2 className="text-2xl md:text-3xl font-black text-white mb-1 tracking-tight">Criar Conta</h2>
                <p className="text-indigo-200 mb-6 font-light text-sm">Preencha os campos para se registrar.</p>

                <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="group">
                        <input
                            type="text"
                            name="name"
                            placeholder="Nome Completo"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full p-3 rounded-lg bg-indigo-950/30 border border-indigo-500/30 text-white placeholder-indigo-400/50 focus:outline-none focus:border-accent-yellow focus:ring-1 focus:ring-accent-yellow transition-all duration-300 text-sm"
                        />
                    </div>

                    <div className="group">
                        <input
                            type="email"
                            name="email"
                            placeholder="E-mail Institucional"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full p-3 rounded-lg bg-indigo-950/30 border border-indigo-500/30 text-white placeholder-indigo-400/50 focus:outline-none focus:border-accent-yellow focus:ring-1 focus:ring-accent-yellow transition-all duration-300 text-sm"
                        />
                    </div>

                    <div className="group">
                        <input
                            type="text"
                            name="registration"
                            placeholder="Matrícula"
                            value={formData.registration}
                            onChange={handleChange}
                            required
                            className="w-full p-3 rounded-lg bg-indigo-950/30 border border-indigo-500/30 text-white placeholder-indigo-400/50 focus:outline-none focus:border-accent-yellow focus:ring-1 focus:ring-accent-yellow transition-all duration-300 text-sm"
                        />
                    </div>

                    <div className="group">
                        <input
                            type="password"
                            name="password"
                            placeholder="Senha (mínimo 6 caracteres)"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full p-3 rounded-lg bg-indigo-950/30 border border-indigo-500/30 text-white placeholder-indigo-400/50 focus:outline-none focus:border-accent-yellow focus:ring-1 focus:ring-accent-yellow transition-all duration-300 text-sm"
                        />
                    </div>

                    <div className="h-2"></div>

                    <button
                        type="submit"
                        className="w-full bg-accent-yellow hover:bg-yellow-300 text-primary-bg font-black py-3 rounded-xl shadow-[0_0_20px_rgba(250,204,21,0.3)] hover:shadow-[0_0_30px_rgba(250,204,21,0.5)] transform active:scale-[0.98] transition-all duration-300 text-base uppercase tracking-wider"
                    >
                        Cadastrar
                    </button>
                </form>

                <div className="mt-6 text-center flex flex-col items-center gap-1">
                    <p className="text-indigo-200 text-xs">Já possui conta?</p>
                    <button onClick={() => navigate('/login')} className="text-accent-yellow font-bold uppercase text-xs hover:text-yellow-300 hover:underline tracking-widest transition-colors">
                        Faça Login
                    </button>
                </div>

            </div>

            {/* === RIGHT COLUMN: ILLUSTRATION === */}
            <div className="hidden md:flex w-1/2 relative bg-indigo-900/20 items-center justify-center overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-primary-bg via-transparent to-transparent opacity-80 z-10"></div>
                <img
                    src={LoginIllustration}
                    alt="Library 3D"
                    className="relative z-0 w-[110%] h-auto object-cover opacity-90 mix-blend-lighten hover:scale-105 transition-transform duration-1000 ease-out"
                />
                <div className="absolute bottom-8 left-8 z-20 max-w-xs">
                    <h3 className="text-xl font-bold text-white mb-1 leading-tight">Junte-se ao Futuro</h3>
                    <p className="text-indigo-200 text-xs leading-relaxed">Crie sua conta para começar a reservar livros e acessar conteúdo exclusivo.</p>
                </div>
            </div>

        </div>
    );
};