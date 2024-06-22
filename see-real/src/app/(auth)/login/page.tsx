"use client"

import React, { useState, FormEvent } from 'react';

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email:"",
    password:""
  });

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
          localStorage.setItem("token", jsonData.token);
          alert(msg);
        }
      } else {
        alert(msg);
      }
    } catch (error) {
      alert("ログイン失敗");
    }
  };

  return (
    <div className="container">
      <h1>ログイン</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
           />
        </div>
        <div>
          <button type="submit">ログイン</button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage