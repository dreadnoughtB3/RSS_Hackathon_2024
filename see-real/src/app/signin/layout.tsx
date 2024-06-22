import React from 'react';
import Link from 'next/link';

const SignInLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <section className="min-h-screen bg-gray-100 flex flex-col">
      <nav className="bg-white p-4 shadow-md flex justify-between items-center">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" legacyBehavior>
            <a className="text-xl font-bold text-blue-600">see-real</a>
          </Link>
          <Link href="/signup" legacyBehavior>
            <a className="text-blue-600">新規登録</a>
          </Link>
        </div>
      </nav>
      <div className="container mx-auto py-6 flex-grow flex items-center justify-center">
        {children}
      </div>
    </section>
  );
};

export default SignInLayout;




