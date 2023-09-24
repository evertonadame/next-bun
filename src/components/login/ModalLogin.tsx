"use client";
import React from "react";
import ModalUI from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { useAppSelector, useAppDispatch } from "@/app/provider";
import { handleLoginModalState } from "@/app/slices/modalLogin";
import { handleUserLogin } from "@/app/slices/auth/user";
import Image from "next/image";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

const ModalLogin = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { isOpen } = useAppSelector((state) => state.modalLoginState);

  const dispatch = useAppDispatch();

  const handleLoginModalClose = () => {
    dispatch(handleLoginModalState(false));
  };

  const onSubmit = async (data: FieldValues) => {
    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorResponseFromApi = await response.json();

      return alert(errorResponseFromApi);
    }

    reset();

    const { user } = await response.json();

    dispatch(handleUserLogin(user));

    window.location.reload();
  };

  return (
    <ModalUI open={isOpen} title="Entrar" handleClose={handleLoginModalClose}>
      <Image
        src="/logo.jpg"
        width={100}
        height={100}
        alt="login logo"
        className="mx-auto"
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-6 mt-10"
      >
        <Input
          {...register("email")}
          error={errors.email}
          placeholder="Email"
          type="email"
          id="email-login-form"
        />
        <Input
          {...register("password")}
          error={errors.password}
          placeholder="Senha"
          type="password"
          id="password-login-form"
        />
        <Button variant="primary" fluid size="default" loading={isSubmitting}>
          Entrar
        </Button>
      </form>
    </ModalUI>
  );
};

export default ModalLogin;
