"use client"
import { jwtVerify } from "jose";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useAuth = () => {
  const [loginUser, setLoginUser] = useState({
    email: "",
    exp: 0,
    username: "",
  });

  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {

      //1:トークを取得する
      const token = localStorage.getItem("token");

      //2:トークンがあるかどうか
      if (!token) {
        router.push("/login");
      }

      //3:トークンがある場合は有効性をチェック
      try {
        const secretKey = new TextEncoder().encode("prisma-supabase");
        const decodedJWT = await jwtVerify(token, secretKey);

        //ログインユーザーをセット
        setLoginUser(decodedJWT.payload);
        
      } catch (error) {
        //トークンが不正な場合はログイン画面に遷移
        router.push("/login");
      }
    };

    checkToken();
  }, [router]);

  return loginUser;
};

export default useAuth;