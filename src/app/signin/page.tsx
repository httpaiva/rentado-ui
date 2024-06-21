"use client";

import PublicHeader from "@/components/Headers/PublicHeader";
import Heading from "@/components/Typography/Heading";
import Link from "@/components/Typography/Link";
import Subtitle from "@/components/Typography/Subtitle";
import Text from "@/components/Typography/Text";
import { Button, Flex, Form, TextField } from "@adobe/react-spectrum";

export default function SignIn() {
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
        <Form isRequired>
          <TextField label="Email" />
          <TextField type="password" label="Password" />
          <Button variant="cta" type="submit" marginTop="size-300">
            Entrar
          </Button>
        </Form>
      </Flex>
    </main>
  );
}
