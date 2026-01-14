import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext"; // Importe para pegar os dados

interface SuporteProps {
  publico?: boolean;
}

export const Suporte = ({ publico }: SuporteProps) => {
  const { user } = useAuth();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");


  useEffect(() => {
    if (user && !publico) {
      setNome(user.name);
      setEmail(user.email);
    }
  }, [user, publico]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Mensagem enviada! Entraremos em contato em até 24h.");
  };

  return (
    <div className="max-w-3xl mx-auto py-8 font-sans">
      <h2 className="text-3xl font-bold text-white mb-8 inline-block pr-4">
        Suporte
      </h2>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        <form onSubmit={handleSubmit} className="w-full md:w-2/3 space-y-6">
          <div className="space-y-2">
            <label htmlFor="nome" className="font-bold text-lg text-white">Seu nome:</label>
            <input
              id="nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full border-2 border-[#483D8B] rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Digite seu nome"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="font-bold text-lg text-white">Email:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-2 border-[#483D8B] rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Digite seu email"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="mensagem" className="font-bold text-lg text-white">
              Escreva aqui sua mensagem:
            </label>
            <textarea
              id="mensagem"
              rows={6}
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              className="w-full border-2 border-[#483D8B] rounded-3xl p-4 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
            ></textarea>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white max-w-xs">
              Após o envio da mensagem, entraremos em contato via email em até
              24h.
            </p>
            <button
              type="submit"
              className="bg-[#FFD700] hover:bg-[#F4C430] text-[#483D8B] font-black py-2 px-10 rounded-full shadow-lg transition-transform hover:scale-105 uppercase"
            >
              ENVIAR
            </button>
          </div>
        </form>

        <div className="hidden md:block w-1/2">
          <img
            src="..\src\assets\png\suporte.png"
            alt="Bóia 3d com interrogação"
            className="drop-shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
};
