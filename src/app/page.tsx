"use client";

import Button from "@/components/Button";
import PublicHeader from "@/components/Headers/PublicHeader";
import Heading from "@/components/Typography/Heading";
import Link from "@/components/Typography/Link";
import Subtitle from "@/components/Typography/Subtitle";
import Text from "@/components/Typography/Text";
import { Flex, Form, TextField } from "@adobe/react-spectrum";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-20 p-20">
      <PublicHeader />
      <Flex direction="column">
        <Heading>Cadastrar</Heading>
        <Subtitle>
          Cadastre-se e comece a gerenciar seus aluguéis de forma fácil.
        </Subtitle>
        <Text>
          Já tem uma conta? <Link href="/signin">Entrar</Link>
        </Text>
        <Form isRequired width="size-4600">
          <TextField label="First Name" />
          <TextField label="Last Name" />
          <TextField label="Email" />
          <TextField type="password" label="Password" />
          <TextField type="password" label="Confirm Password" />
          <Button type="submit">Cadastrar</Button>
        </Form>
      </Flex>
    </main>
  );
}
