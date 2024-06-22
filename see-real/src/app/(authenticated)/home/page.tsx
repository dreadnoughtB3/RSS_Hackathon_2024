import React from 'react';
import { LogIn, UserPlus } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-4xl font-bold mb-4 text-gray-800">Welcome to SeeReal</h2>
      <p className="text-xl text-gray-600 mb-8 text-center max-w-2xl">
        Connect with your team, share ideas, and collaborate in real-time. 
        Join ModernApp today and experience seamless communication!
      </p>
      <div className="flex">
        <Link href="/login">
          <button className="mr-1 px-8 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center">
            <LogIn size={20} className="mr-2" />
            Login
          </button>
        </Link>
        <Link href="/register">
          <button className="ml-1 px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center">
            <UserPlus size={20} className="mr-2" />
            Register
          </button>
        </Link>
      </div>
    </div>
  );
}