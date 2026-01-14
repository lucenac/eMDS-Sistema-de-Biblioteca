import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import Logo from '../../assets/svg/logo.svg';

export const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        setError(null);

        try {
            const res = await fetch('http://localhost:8000/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, newPassword })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.msg || 'Erro ao redefinir senha.');
            }

            setMessage(data.msg);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6">
            <div className="w-full max-w-md bg-surface backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/10 animate-fade-in relative">

                <button
                    onClick={() => navigate('/login')}
                    className="absolute top-6 left-6 p-2 rounded-lg text-indigo-300 hover:bg-white/5 hover:text-white transition-colors"
                >
                    <ArrowLeftIcon className="w-5 h-5" />
                </button>

                <div className="flex flex-col items-center mb-6">
                    <img src={Logo} alt="eMDS" className="h-8 opacity-80 mb-4" />
                    <h2 className="text-2xl font-black text-white text-center">Redefinir Senha</h2>
                    <p className="text-indigo-200 text-center text-sm mt-2">
                        Informe seu e-mail e a nova senha.
                    </p>
                </div>

                {message ? (
                    <div className="bg-green-500/20 border border-green-500/50 text-green-200 p-4 rounded-xl text-center mb-6">
                        <p className="font-medium">{message}</p>
                        <button
                            onClick={() => navigate('/login')}
                            className="mt-4 text-sm font-bold text-accent-yellow hover:underline"
                        >
                            Voltar para o Login
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div className="group">
                                <div className="relative">
                                    <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-400 pointer-events-none" />
                                    <input
                                        type="email"
                                        required
                                        placeholder="Seu e-mail cadastrado"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-indigo-950/30 border border-indigo-500/30 text-white placeholder-indigo-400/50 focus:outline-none focus:border-accent-yellow focus:ring-1 focus:ring-accent-yellow transition-all"
                                    />
                                </div>
                            </div>
                            <div className="group">
                                <div className="relative">
                                    <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-400 pointer-events-none" />
                                    <input
                                        type="password"
                                        required
                                        placeholder="Nova senha"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-indigo-950/30 border border-indigo-500/30 text-white placeholder-indigo-400/50 focus:outline-none focus:border-accent-yellow focus:ring-1 focus:ring-accent-yellow transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        {error && (
                            <div className="text-red-400 text-sm text-center bg-red-500/10 p-2 rounded-lg border border-red-500/30">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-accent-yellow hover:bg-yellow-300 text-primary-bg font-black py-3 rounded-xl shadow-[0_0_20px_rgba(250,204,21,0.3)] hover:shadow-[0_0_30px_rgba(250,204,21,0.5)] transform active:scale-[0.98] transition-all duration-300 uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Atualizando...' : 'Atualizar Senha'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};
