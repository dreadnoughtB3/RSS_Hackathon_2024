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
      const TOKEN = localStorage.getItem("token");

      //2:トークンがあるかどうか
      if (!TOKEN) {
        router.push("/");
      }

      try {
        const secretKey = new TextEncoder().encode("rss2024-burend-swift");
        const decodedJWT = await jwtVerify(TOKEN, secretKey);

        setLoginUser(decodedJWT.payload);
        
      } catch (error) {
        router.push("/login");
      }
    };
    checkToken();
  }, [router]);

  return loginUser;
};

export default useAuth;