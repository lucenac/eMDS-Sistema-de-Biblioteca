import { useNavigate } from 'react-router-dom';
import { HomeIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

export const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-primary-bg flex items-center justify-center p-6 relative overflow-hidden">

            <div className="absolute top-0 left-0 w-96 h-96 bg-accent-yellow/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/5 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2"></div>

            <div className="max-w-md w-full text-center relative z-10 space-y-8 animate-fade-in-up">

                <div className="relative">
                    <h1 className="text-[150px] font-black text-white/5 leading-none select-none">404</h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-accent-yellow to-yellow-200">
                            Ops!
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">Página não encontrada</h2>
                    <p className="text-indigo-200">
                        Parece que a página que você está procurando não existe ou foi movida para outra estante.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-colors font-medium group"
                    >
                        <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Voltar
                    </button>

                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent-yellow text-primary-bg font-bold hover:bg-yellow-300 hover:shadow-lg hover:shadow-yellow-500/20 transition-all active:scale-95"
                    >
                        <HomeIcon className="w-5 h-5" />
                        Ir para o Início
                    </button>
                </div>

            </div>
        </div>
    );
};
