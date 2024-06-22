"use client";

import Button from "@/components/Button";
import PrivateHeader from "@/components/Headers/PrivateHeader";
import Heading from "@/components/Typography/Heading";
import { Flex, Form, TextField } from "@adobe/react-spectrum";

export default function Locations() {
  return (
    <>
      <PrivateHeader />
      <main className="flex min-h-screen flex-col items-center gap-20 p-20">
        <Flex direction="column">
          <Heading>Seus Imóveis</Heading>
        </Flex>
      </main>
    </>
  );
}
