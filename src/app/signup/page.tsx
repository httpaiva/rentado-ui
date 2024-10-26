"use client";

import {
  Logo,
  Button,
  H3,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  H2,
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
    firstName: z.string().min(1, { message: "This field has to be filled." }),
    lastName: z.string().min(1, { message: "This field has to be filled." }),
    email: z
      .string()
      .min(1, { message: "This field has to be filled." })
      .email("This is not a valid email."),
    password: z.string().min(1, { message: "This field has to be filled." }),
    confirmPassword: z
      .string()
      .min(1, { message: "This field has to be filled." }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (values.password !== values.confirmPassword) {
        alert("As senhas não coincidem");
        return;
      }
  
      const response = await fetch(`${API_BASE_URL}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
  
      const responseData = await response.json();
      if (response.ok) {
        alert("Usuário criado com sucesso!");
        router.push("/signin");
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
      <section className="flex flex-col grow min-h-screen bg-zinc-50 justify-center items-center gap-4 p-4">
        <Logo width={263} height={60} variant="black" />
        <H2>Crie sua conta</H2>
        <H3>É super rápido! Vamos começar?</H3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 flex flex-col justify-center items-center"
          >
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Insira seu primeiro nome" {...field} />
                  </FormControl>
                  <FormDescription>Insira seu primeiro nome</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sobrenome</FormLabel>
                  <FormControl>
                    <Input placeholder="Insira seu sobrenome" {...field} />
                  </FormControl>
                  <FormDescription>Insira seu sobrenome</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

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

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar senha</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Insira sua senha"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Confirme sua senha</FormDescription>
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

      <section className="flex flex-col grow min-h-screen bg-zinc-50 rounded-3xl justify-center items-center gap-4">
        <Image
          src="/couple-select-house.svg"
          alt="Casal navetando no computador"
          height={500}
          width={626}
        />
      </section>
    </main>
  );
}

export default withoutAuth(SignIn);
