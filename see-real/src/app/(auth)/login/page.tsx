"use client"

import React, { useState, FormEvent } from 'react';
import { useRouter } from "next/navigation";

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email:"",
    password:""
  });

  const router = useRouter();

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
          router.push('/')
        }
      } else {
        alert(msg);
      }
    } catch (error) {
      alert("ログイン失敗");
    }
  };

  return (
    // <div className="container">
    //   <h1>ログイン</h1>
    //   <form onSubmit={handleSubmit}>
    //     <div className="mb-4">
    //       <label htmlFor="email">Email</label>
    //       <input
    //         type="email"
    //         id="email"
    //         name="email"
    //         value={formData.email}
    //         onChange={handleChange}
    //       />
    //     </div>
    //     <div className="mb-4">
    //       <label htmlFor="password">Password</label>
    //       <input
    //         type="password"
    //         id="password"
    //         name="password"
    //         value={formData.password}
    //         onChange={handleChange}
    //        />
    //     </div>
    //     <div>
    //       <button type="submit">ログイン</button>
    //     </div>
    //   </form>
    // </div>
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-8 rounded shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">ログイン</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">
            メールアドレス
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 mb-2">
            パスワード
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          ログイン
        </button>
      </form>
    </div>
  );
};

export default LoginPage