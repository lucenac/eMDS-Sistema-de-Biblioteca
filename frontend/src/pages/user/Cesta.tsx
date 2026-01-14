import { TrashIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';

export const Cesta = () => {
  // Mockup
  const cartItems = [
    { id: 1, title: 'O Hobbit', author: 'J.R.R. Tolkien', category: 'Fantasia', coverColor: 'bg-green-700' },
    { id: 2, title: 'Clean Code', author: 'Robert C. Martin', category: 'Tecnologia', coverColor: 'bg-blue-600' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
        <span className="bg-accent-yellow text-primary-bg rounded-lg px-2 text-2xl">2</span>
        Sua Cesta
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">

        <div className="flex-grow space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-surface backdrop-blur-xl rounded-2xl p-4 border border-white/10 flex gap-4 items-center group hover:bg-white/5 transition-colors">
              <div className="w-16 h-24 bg-gray-700 rounded-md shadow-lg overflow-hidden shrink-0">
                <div className={`w-full h-full ${item.coverColor} flex items-center justify-center`}>
                  <span className="text-[8px] text-white text-center p-1">{item.title}</span>
                </div>
              </div>

              <div className="flex-grow">
                <h3 className="font-bold text-white text-lg">{item.title}</h3>
                <p className="text-indigo-200 text-sm">{item.author}</p>
                <span className="inline-block mt-2 px-2 py-0.5 rounded text-[10px] bg-white/10 text-white border border-white/5">{item.category}</span>
              </div>

              <button className="p-3 rounded-full hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors">
                <TrashIcon className="h-6 w-6" />
              </button>
            </div>
          ))}
        </div>

        <div className="w-full lg:w-1/3 h-fit bg-surface backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl sticky top-8">
          <h3 className="text-xl font-bold text-white mb-6">Resumo do Pedido</h3>

          <div className="space-y-3 text-indigo-200 text-sm mb-8 border-b border-white/10 pb-6">
            <div className="flex justify-between">
              <span>Total de Livros:</span>
              <span className="font-bold text-white">2</span>
            </div>
            <div className="flex justify-between">
              <span>Prazo de Devolução:</span>
              <span className="font-bold text-white">15 dias</span>
            </div>
          </div>

          <button className="w-full flex items-center justify-center gap-2 bg-accent-yellow hover:bg-yellow-300 text-primary-bg font-black py-4 rounded-xl shadow-[0_0_20px_rgba(250,204,21,0.3)] hover:shadow-[0_0_30px_rgba(250,204,21,0.5)] transform active:scale-[0.98] transition-all uppercase tracking-wide text-lg">
            <CheckBadgeIcon className="h-6 w-6" />
            Confirmar Empréstimo
          </button>
        </div>

      </div>
    </div>
  );
};