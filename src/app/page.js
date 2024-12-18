'use client';

import { useState } from 'react';
import { loginSuperAdmin } from './comman/keycloak/apiFunctions';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const router=useRouter();

  const handleLogin = async () => {
    await loginSuperAdmin(username, password);

    if (sessionStorage.getItem('superAdminToken')) {
      router.push('/componants/products');
    } else {
      console.error('Login failed. Token not found in session storage.');
    }
  };

  return (
    <div className="container mx-auto mt-10 p-5">
      <div className="text-center text-2xl font-bold mb-6">
        Welcome to Harigaji
      </div>

      <div className="max-w-md mx-auto bg-gray-100 p-6 rounded-md shadow-md">
        <h2 className="text-lg font-semibold mb-4 text-center">Login to Master</h2>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="text-center">
          <button
            onClick={handleLogin}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
