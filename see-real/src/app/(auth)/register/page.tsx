'use client';

import React, { useState } from 'react';
import RegisterForm from '@/app/components/RegisterForm';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState<{ name: string; email: string; password: string } | null>(null);

  const handleFormSubmit = (data: { name: string; email: string; password: string }) => {
    setFormData(data);
    console.log('フォームデータ:', data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full">
        <h1 className="text-xl font-bold mb-4 text-center">ユーザー登録</h1>
        <RegisterForm onSubmit={handleFormSubmit} />
        {formData && (
          <div className="mt-4 p-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-lg font-semibold mb-2">送信されたデータ:</h2>
            <p><strong>名前:</strong> {formData.name}</p>
            <p><strong>メールアドレス:</strong> {formData.email}</p>
            <p><strong>パスワード:</strong> {formData.password}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterPage