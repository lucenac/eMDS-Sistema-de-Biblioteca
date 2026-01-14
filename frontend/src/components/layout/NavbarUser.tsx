import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Logo from '../../assets/svg/logo.svg';

export const NavbarUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    { label: 'Início', path: '/aluno' },
    { label: 'Buscar Livros', path: '/aluno/livros' },
    { label: 'Cesta', path: '/aluno/cesta' },
    { label: 'Histórico', path: '/aluno/historico' },
    { label: 'Meus Dados', path: '/aluno/perfil' },
    { label: 'Suporte', path: '/aluno/suporte' }
  ];

  const isActive = (path: string) => {
    // Exact match for root, startsWith for sub-paths if needed
    if (path === '/aluno' && location.pathname !== '/aluno') return false;
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="w-full bg-transparent h-24 px-4 md:px-12 flex items-center justify-between font-sans relative z-50">

      {/* === 1. LOGO === */}
      <div
        className="flex flex-col leading-none select-none cursor-pointer hover:scale-105 transition-transform"
        onClick={() => navigate('/aluno')}
      >
        {/* Placeholder for Logo if svg missing, or use imported */}
        <img src={Logo} alt="eMDS" className="h-12 w-auto drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
      </div>

      <div className='flex items-center gap-6'>
        {/* === 2. MENU CÁPSULA === */}
        <div className="hidden md:flex bg-surface backdrop-blur-md rounded-full p-1.5 border border-white/10 gap-1">
          {menuItems.map((item) => {
            const active = isActive(item.path);
            return (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className={`
                px-5 py-2 rounded-full text-sm font-bold transition-all duration-300
                ${active
                    ? 'bg-accent-yellow text-primary-bg shadow-[0_0_15px_rgba(250,204,21,0.4)]'
                    : 'text-gray-200 hover:text-white hover:bg-white/10'
                  }
              `}
              >
                {item.label}
              </button>
            )
          })}
        </div>

        {/* === 3. BOTÃO SAIR === */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-white/80 hover:text-accent-yellow transition-colors group"
        >
          <svg
            width="24" height="24" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round"
            className="group-hover:translate-x-1 transition-transform"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          <span className="font-bold text-sm hidden sm:block tracking-wide uppercase">Sair</span>
        </button>
      </div>

    </nav>
  );
};