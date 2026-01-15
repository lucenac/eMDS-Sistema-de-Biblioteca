import {
    UsersIcon,
    BookOpenIcon,
    ExclamationTriangleIcon,
    ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';

export const DashboardAdmin = () => {
    // Mockup
    const stats = [
        { label: 'Total de Alunos', value: '1,240', icon: UsersIcon, color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20' },
        { label: 'Livros no Acervo', value: '8,500', icon: BookOpenIcon, color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/20' },
        { label: 'Empréstimos Ativos', value: '342', icon: ArrowTrendingUpIcon, color: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/20' },
        { label: 'Atrasos Pendentes', value: '12', icon: ExclamationTriangleIcon, color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/20' },
    ];

    // Mockup
    const recentActivity = [
        { id: 1, action: 'Novo Empréstimo', subject: 'Código Limpo', user: 'Carlos Silva', time: 'Há 5 min' },
        { id: 2, action: 'Devolução', subject: 'Duna', user: 'Ana Souza', time: 'Há 20 min' },
        { id: 3, action: 'Cadastro', subject: 'Novo Usuário', user: 'Beatriz Lima', time: 'Há 1 hora' },
        { id: 4, action: 'Atraso Reportado', subject: 'O Hobbit', user: 'João Pedro', time: 'Há 2 horas' },
    ];

    return (
        <div className="space-y-10">

            {/* Header */}
            <div>
                <h1 className="text-4xl font-black text-white tracking-tight">Painel Administrativo</h1>
                <p className="text-indigo-200 mt-2 text-lg">Bem-vindo, Administrador! Aqui está o resumo de hoje.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.label} className={`bg-surface backdrop-blur-xl p-6 rounded-3xl border ${stat.border} shadow-lg relative overflow-hidden group`}>
                        {/* Hover Glow */}
                        <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full ${stat.bg} filter blur-2xl group-hover:blur-3xl transition-all opacity-50`}></div>

                        <div className="relative z-10">
                            <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center mb-4`}>
                                <stat.icon className={`h-6 w-6 ${stat.color}`} />
                            </div>
                            <h3 className="text-3xl font-black text-white mb-1">{stat.value}</h3>
                            <p className="text-sm font-bold text-indigo-300 uppercase tracking-widest">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Content Section Split */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Main Action Area (Placeholder for Graphs or Big Lists) */}
                <div className="lg:col-span-2 bg-surface backdrop-blur-xl rounded-3xl p-8 border border-white/10">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xl font-bold text-white">Estatísticas de Empréstimos (Semana)</h3>
                        <select className="bg-black/20 border border-white/10 rounded-lg text-xs text-white px-3 py-1">
                            <option>Últimos 7 dias</option>
                            <option>Mensal</option>
                        </select>
                    </div>

                    {/* Fake Chart Bars using CSS */}
                    <div className="h-64 flex items-end justify-between gap-4 px-4">
                        {[
                            { h: 40, day: 'Seg' },
                            { h: 65, day: 'Ter' },
                            { h: 30, day: 'Qua' },
                            { h: 80, day: 'Qui' },
                            { h: 55, day: 'Sex' },
                            { h: 90, day: 'Sab' },
                            { h: 45, day: 'Dom' }
                        ].map((item) => (
                            <div key={item.day} className="w-full bg-indigo-900/30 rounded-t-xl relative group">
                                <div
                                    className="absolute bottom-0 w-full bg-gradient-to-t from-accent-yellow/10 to-accent-yellow rounded-t-xl transition-all duration-1000 ease-out group-hover:opacity-100"
                                    style={{ height: `${item.h}%` }}
                                ></div>
                                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-indigo-400 font-mono">
                                    {item.day}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sidebar / Feed */}
                <div className="bg-surface backdrop-blur-xl rounded-3xl p-8 border border-white/10">
                    <h3 className="text-xl font-bold text-white mb-6">Atividade Recente</h3>
                    <div className="space-y-6">
                        {recentActivity.map((act) => (
                            <div key={act.id} className="flex gap-4 items-start pb-4 border-b border-white/5 last:border-0 last:pb-0">
                                <div className="mt-1 w-2 h-2 rounded-full bg-accent-yellow shadow-[0_0_8px_rgba(250,204,21,0.8)]"></div>
                                <div>
                                    <p className="text-sm text-white font-medium">
                                        <span className="text-accent-yellow font-bold">{act.action}</span> - {act.subject}
                                    </p>
                                    <p className="text-xs text-indigo-300 mt-1">{act.user} • {act.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-8 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-white uppercase tracking-widest transition-colors">
                        Ver Todo o Histórico
                    </button>
                </div>

            </div>

        </div>
    );
};
