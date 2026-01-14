import { Outlet } from 'react-router-dom';
import { NavbarUser } from '../components/layout/NavbarUser';

export const UserLayout = () => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">

      <NavbarUser />

      <main className="flex-grow container mx-auto p-6 md:p-8 animate-fade-in relative z-10">
        <Outlet />
      </main>

      <footer className="text-indigo-200/50 text-center py-6 text-xs relative z-10">
        Copyright © 2025, Grupo JRB - All Rights Reserved.
      </footer>
    </div>
  );
};