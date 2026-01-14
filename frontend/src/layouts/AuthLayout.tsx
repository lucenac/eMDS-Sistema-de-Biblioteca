import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-sans relative overflow-hidden">
      {/* Background Elements could be added here (e.g. glowing orbs) */}

      <div className="w-full max-w-6xl relative z-10 animate-fade-in-up">
        <Outlet />
      </div>

      <div className="absolute bottom-4 text-center w-full text-indigo-200/40 text-xs z-10">
        Copyright © 2025, Grupo JRB - All Rights Reserved.
      </div>
    </div>
  );
};