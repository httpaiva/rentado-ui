"use client";

import Button from "@/components/Button";
import PublicHeader from "@/components/Headers/PublicHeader";
import Heading from "@/components/Typography/Heading";
import Link from "@/components/Typography/Link";
import Subtitle from "@/components/Typography/Subtitle";
import Text from "@/components/Typography/Text";
import { BASE_URL } from "@/constants";
import withoutAuth from "@/hooks/withoutAuth";
import { Flex, Form, TextField } from "@adobe/react-spectrum";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";

function SignIn() {
  const router = useRouter();

  let { handleSubmit, control } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  let onSubmit = async (data: any) => {
    const response = await fetch(`${BASE_URL}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    if (response.ok) {
      localStorage.setItem("access_token", responseData.access_token);
      router.push("/locations");
    } else {
      const { error, message } = responseData;
      alert(message);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center gap-20 p-20">
      <PublicHeader />
      <Flex direction="column">
        <Heading>Entrar</Heading>
        <Subtitle>
          Bem-vindo de volta! Insira seus dados para gerenciar seus aluguéis.
        </Subtitle>
        <Text>
          Não tem uma conta? <Link href="/">Cadastre-se!</Link>
        </Text>
        <Form width="size-4600" onSubmit={handleSubmit(onSubmit)}>
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
          <Button type="submit">Entrar</Button>
        </Form>
      </Flex>
    </main>
  );
}

export default withoutAuth(SignIn);
