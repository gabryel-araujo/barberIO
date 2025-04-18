"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loading } from "../../components/Loading";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("auth-token");

    if (token) {
      let tokenJson = JSON.parse(token);
      if (tokenJson.expiresIn < new Date().getTime()) {
        localStorage.removeItem("auth-token");
        setTimeout(() => {
          router.replace("/login");
        });
      } else {
        router.replace("/home");
      }
    } else {
      router.replace("/login");
    }
  }, []);

  return <Loading label={"Carregando"} width={50} height={50} color="gray" />;
}
