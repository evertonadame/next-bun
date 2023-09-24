"use client";
import React from "react";
import ModalUI from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { useAppSelector, useAppDispatch } from "@/app/provider";
import Image from "next/image";
import { handleCreateModalState } from "@/app/slices/modalCreate";
import { handleLoginModalState } from "@/app/slices/modalLogin";
import toast from "react-hot-toast";

const createSchema = z
  .object({
    name: z.string().min(2, "O nome deve ter no mínimo 2 caracteres"),
    lastName: z.string().min(2, "O sobrenome deve ter no mínimo 2 caracteres"),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
    confirmPassword: z
      .string()
      .min(6, "A senha deve ter no mínimo 6 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas devem ser iguais",
    path: ["confirmPassword"],
  });

const ModalCreate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(createSchema),
  });

  const { isOpen } = useAppSelector((state) => state.modalCreateState);

  const dispatch = useAppDispatch();

  const handleCreateModalClose = () => {
    dispatch(handleCreateModalState(false));
  };

  const onSubmit = async (data: FieldValues) => {
    const { confirmPassword, ...rest } = data;
    const response = await fetch("/api/create", {
      method: "POST",
      body: JSON.stringify(rest),
    });

    if (!response.ok) {
      const errorResponseFromApi = await response.json();

      toast.error(errorResponseFromApi, {
        position: "top-center",
      });
      return;
    }

    reset();

    toast.success("Usuário criado com sucesso, faça o Login", {
      position: "top-center",
      duration: 2000,
    });

    setTimeout(() => {
      dispatch(handleCreateModalState(false));
    }, 1000);

    setTimeout(() => {
      dispatch(handleLoginModalState(true));
    }, 2000);
  };

  return (
    <ModalUI
      open={isOpen}
      title="Cadastre-se"
      handleClose={handleCreateModalClose}
    >
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
          {...register("name")}
          error={errors.name}
          placeholder="Nome"
          type="text"
          id="name-create-form"
        />
        <Input
          {...register("lastName")}
          error={errors.lastName}
          placeholder="Sobrenome"
          type="text"
          id="lastName-create-form"
        />
        <Input
          {...register("email")}
          error={errors.email}
          placeholder="Email"
          type="email"
          id="email-create-form"
        />
        <Input
          {...register("password")}
          error={errors.password}
          placeholder="Senha"
          type="password"
          id="password-create-form"
        />
        <Input
          {...register("confirmPassword")}
          error={errors.confirmPassword}
          placeholder="Confirme a senha"
          type="password"
          id="confirmPassword-create-form"
        />
        <Button variant="primary" fluid size="default" loading={isSubmitting}>
          Cadastrar
        </Button>
      </form>
    </ModalUI>
  );
};

export default ModalCreate;
