import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Contextos
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';

// Componentes de Estrutura
import { RequireAuth } from './components/RequireAuth';
import { AuthLayout } from './layouts/AuthLayout';
import { UserLayout } from './layouts/UserLayout';
// Páginas Admin
import { AdminLayout } from './layouts/AdminLayout';
import { DashboardAdmin } from './pages/admin/DashboardAdmin';
import { GerenciarLivros } from './pages/admin/GerenciarLivros';
import { GerenciarUsuarios } from './pages/admin/GerenciarUsuarios';
import { AdminBookForm } from './pages/admin/AdminBookForm';

// Páginas
import { Login } from './pages/auth/Login';
import HomeUser from './pages/user/Home';
import { Suporte } from './pages/shared/Suporte';
import { BuscaLivros } from './pages/user/BuscaLivros';
import { Cesta } from './pages/user/Cesta';
import { Historico } from './pages/user/Historico';
import { Perfil } from './pages/user/Perfil';

import { Cadastro } from './pages/auth/Cadastro';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { NotFound } from './pages/shared/NotFound';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route element={<AuthLayout />}>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/esqueci-senha" element={<ForgotPassword />} />
              <Route path="/suporte-publico" element={<Suporte publico={true} />} />
            </Route>


            <Route element={<RequireAuth allowedRoles={['student']} />}>
              <Route path="/aluno" element={<UserLayout />}>

                <Route index element={<HomeUser />} />
                <Route path="livros" element={<BuscaLivros />} />
                <Route path="cesta" element={<Cesta />} />
                <Route path="historico" element={<Historico />} />
                <Route path="perfil" element={<Perfil />} />
                <Route path="suporte" element={<Suporte />} />
              </Route>
            </Route>


            <Route element={<RequireAuth allowedRoles={['admin']} />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<DashboardAdmin />} />
                <Route path="livros" element={<GerenciarLivros />} />
                <Route path="livros/novo" element={<AdminBookForm />} />
                <Route path="livros/editar/:id" element={<AdminBookForm />} />
                <Route path="usuarios" element={<GerenciarUsuarios />} />
              </Route>
            </Route>


            {/* 404 */}
            <Route path="*" element={<NotFound />} />

          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;