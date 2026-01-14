import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../config/firebase';
import LoginIllustration from '../../assets/png/loginPhoto.png';
import Logo from '../../assets/svg/logo.svg';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, setSession } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const role = await login(email, password);
      if (role === 'admin') {
        navigate('/admin');
      } else if (role === 'student') {
        navigate('/aluno');
      } else {
        alert('Erro: Papel de usuário desconhecido.');
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert('Falha no login. Verifique suas credenciais.');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      console.log("Starting Google Login...");
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Popup finished, user:", result.user);

      const user = result.user;
      const idToken = await user.getIdToken();
      console.log("ID Token obtained, sending to backend...");

      const res = await fetch('http://localhost:8000/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: idToken })
      });

      if (!res.ok) throw new Error('Falha na autenticação com Google no servidor');

      const data = await res.json();
      console.log("Login success, received data:", data);

      setSession(data.user, data.token);

      if (data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/aluno');
      }

    } catch (error) {
      console.error("Google Login Error:", error);
      alert(`Erro ao entrar com Google: ${error}`);
    }
  };

  return (
    <div className="flex flex-col-reverse md:flex-row h-auto md:h-[80vh] w-full max-w-5xl bg-surface backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl border border-white/10">

      <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center relative z-20">

        <div className="mb-4 select-none">
          <img src={Logo} alt="eMDS" className="h-8 opacity-80" />
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-white mb-1 tracking-tight">Bem-vindo(a)</h2>
        <p className="text-indigo-200 mb-6 font-light text-sm">Insira suas credenciais para acessar o acervo.</p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="group">
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-indigo-950/30 border border-indigo-500/30 text-white placeholder-indigo-400/50 focus:outline-none focus:border-accent-yellow focus:ring-1 focus:ring-accent-yellow transition-all duration-300 text-sm"
            />
          </div>

          <div className="group">
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-indigo-950/30 border border-indigo-500/30 text-white placeholder-indigo-400/50 focus:outline-none focus:border-accent-yellow focus:ring-1 focus:ring-accent-yellow transition-all duration-300 text-sm"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => navigate('/esqueci-senha')}
              className="text-accent-yellow text-xs font-medium hover:text-yellow-300 hover:underline transition-colors"
            >
              Esqueci minha senha
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-accent-yellow hover:bg-yellow-300 text-primary-bg font-black py-3 rounded-xl shadow-[0_0_20px_rgba(250,204,21,0.3)] hover:shadow-[0_0_30px_rgba(250,204,21,0.5)] transform active:scale-[0.98] transition-all duration-300 text-base uppercase tracking-wider"
          >
            Entrar
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-4 text-indigo-300 bg-transparent backdrop-blur-sm">ou continue com</span>
          </div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 group"
        >
          <span className="font-bold text-lg text-white group-hover:scale-110 transition-transform">G</span>
          <span className="tracking-wide text-sm">Google</span>
        </button>

        <div className="mt-6 text-center flex flex-col items-center gap-1">
          <p className="text-indigo-200 text-xs">Ainda não tem conta?</p>
          <button onClick={() => navigate('/cadastro')} className="text-accent-yellow font-bold uppercase text-xs hover:text-yellow-300 hover:underline tracking-widest transition-colors">
            Cadastre-se Gratuitamente
          </button>
        </div>

      </div>

      <div className="hidden md:flex w-1/2 relative bg-indigo-900/20 items-center justify-center overflow-hidden">

        <img
          src={LoginIllustration}
          alt="Estudante segurando livros"
          className="p-6 relative z-0 w-[110%] object-cover hover:scale-105 transition-transform duration-1000 ease-out"
        />

      </div>

    </div >
  );
};