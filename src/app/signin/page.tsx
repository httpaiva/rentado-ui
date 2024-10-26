"use client";

import {
  Logo,
  Button,
  H3,
  H4,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  H2,
  P,
} from "@/components";
import withoutAuth from "@/hooks/withoutAuth";
import { ArrowRightFromLine } from "lucide-react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { API_BASE_URL } from "@/constants";
import Image from "next/image";

function SignIn() {
  const router = useRouter();

  const formSchema = z.object({
    email: z
      .string()
      .min(1, { message: "This field has to be filled." })
      .email("This is not a valid email."),
    password: z.string().min(1, { message: "This field has to be filled." }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const responseData = await response.json();
      if (response.ok) {
        localStorage.setItem("access_token", responseData.access_token);
        router.push("/locations");
      } else {
        const { error, message } = responseData;
        alert(message);
      }
    } catch (error) {
      alert(error);
    }
  }

  return (
    <main className="flex min-h-screen">
      <section className="flex flex-col grow min-h-screen bg-zinc-50 justify-center items-center gap-10">
        <Logo width={490} height={110} variant="black" />
        <H4>Bem-vindo</H4>
        <H3>Faça seu Login</H3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 flex flex-col justify-center items-center"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Insira seu e-mail"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Insira seu e-mail</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Insira sua senha"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Insira sua senha</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
              <ArrowRightFromLine className="mr-2 h-4 w-4" /> Acessar
            </Button>
          </form>
        </Form>
      </section>

      <section className="flex flex-col grow min-h-screen bg-zinc-800 rounded-3xl justify-center items-center gap-4">
        <Image
          src="/house-searching-2.svg"
          alt="Mulher procurando casas com uma lupa"
          height={444}
          width={587}
        />
        <H2 color="text-zinc-50">Gerenciamento de Alugueis</H2>
        <P color="text-zinc-50">
          A gestão de aluguel nunca ficou tão fácil. A Rentado te ajuda desde a
          concepção, até cobranças.
        </P>
      </section>
    </main>
  );
}

export default withoutAuth(SignIn);
