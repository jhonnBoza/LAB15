'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { User } from '@/types/product';

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        setUser(JSON.parse(userStr));
      } catch {
        localStorage.removeItem('user');
      }
    }
  }, []);

  const logout = () => {
    Cookies.remove('token');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/login');
    router.refresh();
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold hover:text-blue-200 transition-colors">
          🛒 Mini Marketplace
        </Link>
        <div className="flex items-center gap-4">
          {user?.rol === 'ADMIN' && (
            <Link href="/admin" className="hover:text-blue-200 transition-colors text-sm font-medium">
              Administración
            </Link>
          )}
          {user ? (
            <>
              <span className="text-blue-200 text-sm">
                Hola, <strong>{user.nombre}</strong>{' '}
                <span className="bg-blue-700 px-2 py-0.5 rounded text-xs">{user.rol}</span>
              </span>
              <button
                onClick={logout}
                className="bg-white text-blue-600 px-3 py-1.5 rounded text-sm font-medium hover:bg-blue-50 transition-colors"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="bg-white text-blue-600 px-3 py-1.5 rounded text-sm font-medium hover:bg-blue-50 transition-colors"
            >
              Iniciar sesión
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
