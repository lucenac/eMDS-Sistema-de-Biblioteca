import { UserCircleIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';

export const Perfil = () => {
  const { user } = useAuth();

  // Mockup
  const userData = {
    nome: user?.name || 'Cláudio Ícaro',
    matricula: '532452',
    cpf: '123.456.789-00',
    celular: '(85) 99999-9999',
    email: user?.email || 'claudio.icaro@alu.ufc.br'
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="bg-surface backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">

        <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-6">
          <UserCircleIcon className="h-16 w-16 text-accent-yellow" />
          <div>
            <h2 className="text-3xl font-bold text-white">Meus Dados</h2>
            <p className="text-indigo-200">Gerencie suas informações pessoais.</p>
          </div>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-indigo-200 text-sm font-bold ml-1">Nome Completo</label>
            <input type="text" defaultValue={userData.nome} className="w-full p-4 rounded-xl bg-indigo-950/50 border border-white/10 text-white focus:border-accent-yellow focus:ring-1 focus:ring-accent-yellow transition-all" />
          </div>

          <div className="space-y-2">
            <label className="text-indigo-200 text-sm font-bold ml-1">Matrícula</label>
            <input type="text" defaultValue={userData.matricula} readOnly className="w-full p-4 rounded-xl bg-indigo-950/30 border border-white/5 text-gray-400 cursor-not-allowed" />
          </div>

          <div className="space-y-2">
            <label className="text-indigo-200 text-sm font-bold ml-1">CPF</label>
            <input type="text" defaultValue={userData.cpf} readOnly className="w-full p-4 rounded-xl bg-indigo-950/30 border border-white/5 text-gray-400 cursor-not-allowed" />
          </div>

          <div className="space-y-2">
            <label className="text-indigo-200 text-sm font-bold ml-1">Celular</label>
            <input type="text" defaultValue={userData.celular} className="w-full p-4 rounded-xl bg-indigo-950/50 border border-white/10 text-white focus:border-accent-yellow focus:ring-1 focus:ring-accent-yellow transition-all" />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-indigo-200 text-sm font-bold ml-1">E-mail</label>
            <input type="email" defaultValue={userData.email} className="w-full p-4 rounded-xl bg-indigo-950/50 border border-white/10 text-white focus:border-accent-yellow focus:ring-1 focus:ring-accent-yellow transition-all" />
          </div>

          <div className="md:col-span-2 flex justify-end mt-4">
            <button type="button" className="flex items-center gap-2 bg-accent-yellow hover:bg-yellow-300 text-primary-bg font-bold py-3 px-8 rounded-xl shadow-[0_0_15px_rgba(250,204,21,0.3)] hover:shadow-[0_0_25px_rgba(250,204,21,0.5)] transition-all uppercase tracking-wide">
              <PencilSquareIcon className="h-5 w-5" />
              Salvar Alterações
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};