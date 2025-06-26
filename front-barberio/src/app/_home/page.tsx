"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AditionalInfo from "../../../components/AditionalInfo";

export default function Main() {
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

  return <AditionalInfo />;
}
