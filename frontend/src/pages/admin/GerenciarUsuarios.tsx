import { useState } from 'react';
import {
    MagnifyingGlassIcon,
    ShieldCheckIcon,
    UserIcon
} from '@heroicons/react/24/outline';

export const GerenciarUsuarios = () => {
    // Mock Data
    const [users] = useState([
        { id: 1, name: 'Cláudio Ícaro', email: 'claudio@alu.ufc.br', role: 'Aluno', status: 'Ativo' },
        { id: 2, name: 'Admin Principal', email: 'admin@ufc.br', role: 'Administrador', status: 'Ativo' },
        { id: 3, name: 'João Bloqueado', email: 'joao.b@teste.com', role: 'Aluno', status: 'Bloqueado' },
        { id: 4, name: 'Maria Silva', email: 'maria@teste.com', role: 'Aluno', status: 'Pendente' },
    ]);

    const handleToggleStatus = (_id: number) => {
        if (globalThis.confirm('Alterar status do usuário?')) {
            // Toggle Logic Mock
            alert('Status alterado com sucesso!');
        }
    };

    return (
        <div className="space-y-8">

            {/* Header */}
            <div>
                <h1 className="text-3xl font-black text-white tracking-tight">Gerenciar Usuários</h1>
                <p className="text-indigo-200 mt-1">Administre permissões e acesso ao sistema.</p>
            </div>

            {/* Content Card */}
            <div className="bg-surface backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl">

                {/* Search Bar */}
                <div className="p-6 border-b border-white/10">
                    <div className="relative max-w-md">
                        <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-indigo-300" />
                        <input
                            type="text"
                            placeholder="Buscar por nome ou email..."
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-indigo-300/50 focus:outline-none focus:border-accent-yellow focus:ring-1 focus:ring-accent-yellow transition-all"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-white/5 text-indigo-200 uppercase text-xs font-bold tracking-wider">
                            <tr>
                                <th className="p-6">Usuário</th>
                                <th className="p-6">Email</th>
                                <th className="p-6">Função</th>
                                <th className="p-6">Status</th>
                                <th className="p-6 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-white/5 transition-colors">
                                    <td className="p-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-300">
                                                <UserIcon className="h-5 w-5" />
                                            </div>
                                            <span className="font-bold text-white">{user.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-6 text-indigo-200">
                                        {user.email}
                                    </td>
                                    <td className="p-6">
                                        <span className={`flex items-center gap-1 text-sm
                                            ${user.role === 'Administrador' ? 'text-accent-yellow font-bold' : 'text-indigo-300'}
                                        `}>
                                            {user.role === 'Administrador' && <ShieldCheckIcon className="h-4 w-4" />}
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="p-6">
                                        <span className={`
                                            px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                                            ${user.status === 'Ativo' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : ''}
                                            ${user.status === 'Bloqueado' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : ''}
                                            ${user.status === 'Pendente' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : ''}
                                        `}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="p-6 text-right">
                                        <button
                                            onClick={() => handleToggleStatus(user.id)}
                                            className="text-indigo-400 hover:text-white transition-colors text-sm font-medium underline decoration-white/20 hover:decoration-white"
                                        >
                                            {user.status === 'Bloqueado' ? 'Desbloquear' : 'Bloquear'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};
