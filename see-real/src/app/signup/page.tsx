import React from 'react';
import SignUpLayout from './layout';
import Link from 'next/link';

const SignUpPage: React.FC = () => {
  return (
    <SignUpLayout>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">see-realに登録</h1>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="ユーザー名"
            className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="email"
            placeholder="メールアドレス"
            className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="password"
            placeholder="パスワード"
            className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button className="w-full py-2 px-4 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600">
            登録
          </button>
          <Link href="/signin" legacyBehavior>
            <a className="block text-center text-blue-500 hover:underline">すでにアカウントをお持ちですか？ログイン</a>
          </Link>
        </div>
      </div>
    </SignUpLayout>
  );
};

export default SignUpPage;





