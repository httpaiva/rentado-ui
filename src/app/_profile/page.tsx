"use client";

import Button from "@/components/Button";
import PrivateHeader from "@/components/Headers/PrivateHeader";
import Heading from "@/components/Typography/Heading";
import { BASE_URL } from "@/constants";
import withAuth from "@/hooks/withAuth";
import { Flex, Form, TextField } from "@adobe/react-spectrum";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
import { useCallback, useEffect } from "react";
import { User } from "@/types/User.";

function Profile() {
  const router = useRouter();

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const fetchUser = useCallback(
    async (userId: User["id"], token: string) => {
      const response = await fetch(`${BASE_URL}/user/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const user = await response.json();
      if (response.ok && user) {
        reset(user);
      } else {
        alert("Erro ao carregar informações do usuário");
      }
    },
    [reset],
  );

  useEffect(() => {
    console.log("Profile useEffect");
    const token = localStorage.getItem("access_token");
    if (token) {
      const decoded = jwtDecode(token);
      const userId = decoded.sub;
      if (userId) {
        fetchUser(userId, token);
      }
    }
  }, [fetchUser]);

  const onSubmit = async (data: any) => {
    const token = localStorage.getItem("access_token");
    const decoded = jwtDecode(token!);
    const userId = decoded.sub;
    if (data.password !== data.confirmPassword) {
      alert("As senhas não coincidem");
      return;
    }
    let { password, confirmPassword, ...newData } = data;
    if (data.password) {
      newData = { ...newData, password };
    }

    const response = await fetch(`${BASE_URL}/user/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newData),
    });

    const responseData = await response.json();
    if (response.ok) {
      alert("Perfil atualizado com sucesso!");
      router.refresh();
    } else {
      const { error, message } = responseData;
      alert(message);
    }
  };

  const onDelete = async () => {
    const token = localStorage.getItem("access_token");
    const decoded = jwtDecode(token!);
    const userId = decoded.sub;

    const confirmation = window.confirm(
      "Tem certeza que deseja deletar sua conta?",
    );

    if (confirmation) {
      const response = await fetch(`${BASE_URL}/user/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert("Conta deletada com sucesso!");
        localStorage.removeItem("access_token");
        router.push("/signin");
      } else {
        const responseData = await response.json();
        const { error, message } = responseData;
        alert(message);
      }
    }
  };

  return (
    <>
      <PrivateHeader />
      <main className="flex min-h-screen flex-col items-center gap-20 p-20">
        <Flex direction="column">
          <Heading>Editar Perfil</Heading>
          <Form isRequired width="size-4600" onSubmit={handleSubmit(onSubmit)}>
            <Controller
              control={control}
              name="firstName"
              rules={{ required: "Nome é obrigatório" }}
              render={({
                field: { name, value, onChange, onBlur, ref },
                fieldState: { invalid, error },
              }) => (
                <TextField
                  label="Nome"
                  name={name}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  ref={ref}
                  isRequired
                  errorMessage={error?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="lastName"
              rules={{ required: "Sobrenome é obrigatório" }}
              render={({
                field: { name, value, onChange, onBlur, ref },
                fieldState: { invalid, error },
              }) => (
                <TextField
                  label="Sobrenome"
                  name={name}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  ref={ref}
                  isRequired
                  errorMessage={error?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              rules={{ required: "E-mail é obrigatório" }}
              render={({
                field: { name, value, onChange, onBlur, ref },
                fieldState: { invalid, error },
              }) => (
                <TextField
                  label="E-mail"
                  name={name}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  ref={ref}
                  isRequired
                  errorMessage={error?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({
                field: { name, value, onChange, onBlur, ref },
                fieldState: { invalid, error },
              }) => (
                <TextField
                  label="Senha"
                  name={name}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  ref={ref}
                  type="password"
                  errorMessage={error?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="confirmPassword"
              render={({
                field: { name, value, onChange, onBlur, ref },
                fieldState: { invalid, error },
              }) => (
                <TextField
                  label="Confirmar senha"
                  name={name}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  ref={ref}
                  type="password"
                  errorMessage={error?.message}
                />
              )}
            />

            <Button type="submit">Atualizar informações</Button>
          </Form>
          <Button type="submit" variant="danger" onClick={onDelete}>
            Deletar conta
          </Button>
        </Flex>
      </main>
    </>
  );
}

export default withAuth(Profile);
