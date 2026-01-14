import { CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';

export const Historico = () => {
    // Mockup
    const historicalLoans = [
        { id: 1, title: 'O Senhor dos Anéis: A Sociedade do Anel', author: 'J.R.R. Tolkien', dateTaken: '10/01/2024', dateReturned: '25/01/2024', status: 'returned' },
        { id: 2, title: 'Código Limpo', author: 'Robert C. Martin', dateTaken: '15/02/2024', dateReturned: '01/03/2024', status: 'returned' },
        { id: 3, title: 'Harry Potter e a Pedra Filosofal', author: 'J.K. Rowling', dateTaken: '05/03/2024', dateReturned: '20/03/2024', status: 'returned' },
        { id: 4, title: 'Arquitetura Limpa', author: 'Robert C. Martin', dateTaken: '10/04/2024', dateReturned: '25/04/2024', status: 'returned' },
    ];

    return (
        <div className="max-w-6xl mx-auto py-8 space-y-8">

            <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-white/10 pb-6">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tight mb-2">
                        Histórico de Leituras
                    </h1>
                    <p className="text-indigo-200">Veja todos os livros que você já explorou.</p>
                </div>

                <div className="bg-surface backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 flex items-center gap-2">
                    <ClockIcon className="h-5 w-5 text-accent-yellow" />
                    <span className="text-sm font-mono text-white">Total: {historicalLoans.length} livros</span>
                </div>
            </div>

            <div className="bg-surface backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/10 shadow-2xl">

                <div className="space-y-6">
                    {historicalLoans.map((loan) => (
                        <div key={loan.id} className="flex flex-col md:flex-row items-center gap-6 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5">

                            <div className="shrink-0 w-12 h-12 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center">
                                <CheckCircleIcon className="h-6 w-6" />
                            </div>
                            <div className="flex-grow text-center md:text-left">
                                <h3 className="text-lg font-bold text-white">{loan.title}</h3>
                                <p className="text-indigo-300 text-sm">{loan.author}</p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 text-sm font-mono text-indigo-200">
                                <div className="bg-indigo-950/50 px-3 py-1.5 rounded-lg border border-white/5">
                                    <span className="text-indigo-400 text-xs block mb-0.5">Retirada</span>
                                    {loan.dateTaken}
                                </div>
                                <div className="bg-indigo-950/50 px-3 py-1.5 rounded-lg border border-white/5">
                                    <span className="text-indigo-400 text-xs block mb-0.5">Devolução</span>
                                    {loan.dateReturned}
                                </div>
                            </div>

                            <div className="shrink-0">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wider">
                                    Devolvido
                                </span>
                            </div>

                        </div>
                    ))}
                </div>

            </div>

        </div>
    );
};
