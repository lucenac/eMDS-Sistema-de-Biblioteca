import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  HomeIcon,
  BookOpenIcon,
  UsersIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';
import Logo from '../assets/svg/logo.svg';

export const AdminLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { label: 'Visão Geral', path: '/admin', icon: HomeIcon },
    { label: 'Gerenciar Livros', path: '/admin/livros', icon: BookOpenIcon },
    { label: 'Gerenciar Usuários', path: '/admin/usuarios', icon: UsersIcon },
  ];

  const isActive = (path: string) => {
    if (path === '/admin' && location.pathname === '/admin') return true;
    if (path !== '/admin' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="flex h-screen bg-primary-bg font-sans text-white overflow-hidden">

      {/* SIDEBAR */}
      <aside className="w-64 flex flex-col bg-surface backdrop-blur-xl border-r border-white/10 z-20">

        {/* Logo Area */}
        <div className="h-24 flex items-center justify-center border-b border-white/5">
          <img src={Logo} alt="MDS Admin" className="h-10 w-auto" />
          <span className="ml-3 font-black text-xl tracking-wider text-accent-yellow">ADMIN</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-8 px-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`
                                w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group
                                ${isActive(item.path)
                  ? 'bg-accent-yellow text-primary-bg font-bold shadow-[0_0_15px_rgba(250,204,21,0.4)]'
                  : 'text-indigo-200 hover:bg-white/5 hover:text-white'}
                            `}
            >
              <item.icon className={`h-6 w-6 ${isActive(item.path) ? 'text-primary-bg' : 'group-hover:text-accent-yellow'}`} />
              <span className="text-sm tracking-wide">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Footer / Logout */}
        <div className="p-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all font-bold text-sm uppercase tracking-wider"
          >
            <ArrowLeftOnRectangleIcon className="h-5 w-5" />
            Sair do Sistema
          </button>
          <div className="text-center mt-4 text-[10px] text-indigo-400 opacity-50">
            v1.0.0 MDS System
          </div>
        </div>

      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-auto relative">

        {/* Background Gradients (similar to UserLayout) */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] bg-purple-500/20 rounded-full blur-[120px] mix-blend-screen opacity-40"></div>
          <div className="absolute top-[40%] left-[20%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] mix-blend-screen opacity-30"></div>
          <div className="absolute -bottom-[10%] right-[30%] w-[500px] h-[500px] bg-accent-yellow/10 rounded-full blur-[100px] mix-blend-screen opacity-20"></div>
        </div>

        <div className="relative z-10 px-8 py-10 max-w-7xl mx-auto">
          <Outlet />
        </div>

      </main>

    </div>
  );
};