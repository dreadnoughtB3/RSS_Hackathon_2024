'use client';

import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import RegisterForm from '@/app/components/RegisterForm';
import Background from '@/app/components/Background';

const RegisterPage: React.FC = () => {
  const [errMsg, setErrMsg] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const handleFormSubmit = async (data: { name: string; email: string; password: string; company_code: string }) => {
    setIsProcessing(true);
    try {
      const response = await fetch("/api/v1/user", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const jsonData = await response.json();
      console.log(jsonData)
      if (response.statusText === "Failed") {
        setErrMsg(jsonData.message);
      } else if(response.statusText === "Success") {
        router.push("/login");
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <div className="max-w-md w-full z-10">
        <RegisterForm  onSubmit={handleFormSubmit} isProcessing={isProcessing} />
        {errMsg ?
        <div className="mt-2 px-3 py-2 rounded-md max-w-md w-full flex-row bg-neutral-800">
          <p className="text-red-500">登録失敗:</p>
          <p className="text-gray-300">{errMsg}</p>
        </div>
        :
        <div></div>
        }
      </div>
      <Background />
    </div>
  );
};

export default RegisterPage