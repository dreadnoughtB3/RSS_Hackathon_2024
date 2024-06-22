import React from 'react';
import SignInLayout from './layout';
import Link from 'next/link';

const SignInPage: React.FC = () => {
  return (
    <SignInLayout>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">see-realにログイン</h1>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="電話番号、メールアドレスまたはユーザー名"
            className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="password"
            placeholder="パスワード"
            className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Link href="#" legacyBehavior>
            <a className="block text-center text-blue-500 hover:underline">パスワードを忘れた場合はこちら</a>
          </Link>
          <button className="w-full py-2 px-4 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600">
            ログイン
          </button>
        </div>
      </div>
    </SignInLayout>
  );
};

export default SignInPage;




