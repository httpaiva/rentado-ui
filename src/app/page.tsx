"use client";

import Button from "@/components/Button";
import PublicHeader from "@/components/Headers/PublicHeader";
import Heading from "@/components/Typography/Heading";
import Link from "@/components/Typography/Link";
import Subtitle from "@/components/Typography/Subtitle";
import Text from "@/components/Typography/Text";
import { Flex, Form, TextField } from "@adobe/react-spectrum";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ e });
    // router.push("/locations");
  };

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
        <Form isRequired width="size-4600" onSubmit={handleSubmit}>
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
