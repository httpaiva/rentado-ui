"use client";

import Button from "@/components/Button";
import Heading from "@/components/Typography/Heading";
import Link from "@/components/Typography/Link";
import Subtitle from "@/components/Typography/Subtitle";
import Text from "@/components/Typography/Text";
import { BASE_URL } from "@/constants";
import withoutAuth from "@/hooks/withoutAuth";
import { Flex, Form, TextField } from "@adobe/react-spectrum";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";

function SignUp() {
  const router = useRouter();

  let { handleSubmit, control } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  let onSubmit = async (data: any) => {
    if (data.password !== data.confirmPassword) {
      alert("As senhas não coincidem");
      return;
    }

    const response = await fetch(`${BASE_URL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    if (response.ok) {
      alert("Usuário criado com sucesso!");
      router.push("/signin");
    } else {
      const { error, message } = responseData;
      alert(message);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center gap-20 p-20">
      <Flex direction="column">
        <Heading>Cadastrar</Heading>
        <Subtitle>
          Cadastre-se e comece a gerenciar seus aluguéis de forma fácil.
        </Subtitle>
        <Text>
          Já tem uma conta? <Link href="/signin">Entrar</Link>
        </Text>

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
            rules={{ required: "Senha é obrigatória" }}
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
                isRequired
                type="password"
                errorMessage={error?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            rules={{ required: "Confirmação de senha é obrigatória" }}
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
                isRequired
                type="password"
                errorMessage={error?.message}
              />
            )}
          />

          <Button type="submit">Cadastrar</Button>
        </Form>
      </Flex>
    </main>
  );
}

export default withoutAuth(SignUp);
