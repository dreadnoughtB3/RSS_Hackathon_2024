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
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
      }

      try {
        const secretKey = new TextEncoder().encode("prisma-supabase");
        const decodedJWT = await jwtVerify(token, secretKey);

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