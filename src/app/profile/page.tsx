"use client";

import Button from "@/components/Button";
import PrivateHeader from "@/components/Headers/PrivateHeader";
import Heading from "@/components/Typography/Heading";
import withAuth from "@/hooks/withAuth";
import { Flex, Form, TextField } from "@adobe/react-spectrum";

function Profile() {
  return (
    <>
      <PrivateHeader />
      <main className="flex min-h-screen flex-col items-center gap-20 p-20">
        <Flex direction="column">
          <Heading>Editar Perfil</Heading>
          <Form isRequired width="size-4600">
            <TextField label="First Name" />
            <TextField label="Last Name" />
            <TextField label="Email" />
            <TextField type="password" label="Password" />
            <TextField type="password" label="Confirm Password" />
            <Button type="submit">Editar</Button>
          </Form>
        </Flex>
      </main>
    </>
  );
}

export default withAuth(Profile);
