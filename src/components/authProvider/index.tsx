"use client";
import { useEffect } from "react";
import { useAppDispatch } from "@/app/provider";
import { handleUserLogin } from "@/app/slices/auth/user";

const AuthProvider = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const isLogged = document?.cookie?.includes("npmu-id");
    (async () => {
      if (isLogged) {
        const user = localStorage.getItem("npmu-user");

        if (!user) {
          const response = await fetch("/api/getUserById", {
            method: "GET",
          });

          const { user } = await response.json();

          localStorage.setItem("npmu-user", JSON.stringify(user));
          dispatch(handleUserLogin(user));
        } else {
          dispatch(handleUserLogin(JSON.parse(user)));
        }
      }
    })();
  }, []);

  return null;
};

export default AuthProvider;
