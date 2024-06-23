"use client"
import useAuth from '@/app/lib/useAuth';
import React, { useState, FormEvent, use } from 'react';
import { useRouter } from "next/navigation";
import Link from 'next/link';
import Background from '@/app/components/Background';

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email:"",
    password:""
  });

  const loginUser = useAuth();
  const router = useRouter();

  if(loginUser.email){
    router.push("/home")
  }

  let flag = false;
  let msg = "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/v1/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const jsonData = await response.json();
      flag = jsonData.flag;
      msg = jsonData.message;

      if (flag) {
        if("TOKEN" in jsonData) {
          localStorage.setItem("token", jsonData.TOKEN);
          router.push('/home')
        }
      } else {
        alert(msg);
      }
    } catch (error) {
      alert("ログイン失敗");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-neutral-800 p-8 rounded shadow-md z-10"
      >
        <h2 className="text-2xl font-bold text-gray-200 mb-6 text-center">ログイン</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
            メールアドレス
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="px-3 py-2 w-full bg-neutral-900 text-gray-300 rounded-md shadow-sm outline-none"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-2">
            パスワード
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="px-3 py-2 w-full bg-neutral-900 text-gray-300 rounded-md shadow-sm outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-0 hover:bg-blue-600 transition-colors"
        >
          ログイン
        </button>
        <Link href="/register">
          <div className='mt-4 text-gray-400 font-bold text-sm'>アカウントを持っていない場合</div>
        </Link>
      </form>
      <Background />
    </div>
  );
};

export default LoginPage