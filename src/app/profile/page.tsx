"use client";

import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  H2,
  PageWithHeaderAndSidebar,
} from "@/components";
import { API_BASE_URL } from "@/constants";
import withAuth from "@/hooks/withAuth";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
import { useCallback, useEffect } from "react";
import { User } from "@/types/User.";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

function Profile() {
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

  const fetchUser = useCallback(
    async (userId: User["id"], token: string) => {
      const response = await fetch(`${API_BASE_URL}/user/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const user = await response.json();
      if (response.ok && user) {
        form.reset(user);
      } else {
        alert("Erro ao carregar informações do usuário");
      }
    },
    [form],
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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const token = localStorage.getItem("access_token");
    const decoded = jwtDecode(token!);
    const userId = decoded.sub;
    let newData = {};
    if (values.password !== values.confirmPassword) {
      alert("As senhas não coincidem");
      return;
    }
    let { password, confirmPassword, ...rest } = values;
    if (values.password) {
      newData = { ...rest, password };
    }

    const response = await fetch(`${API_BASE_URL}/user/${userId}`, {
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
      const response = await fetch(`${API_BASE_URL}/user/${userId}`, {
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
    <PageWithHeaderAndSidebar>
      <main className="flex min-h-screen flex-col items-center gap-20 p-20">
        <H2>Editar Perfil</H2>
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
                  <FormLabel>E-mail</FormLabel>
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
            <Button type="submit">Atualizar informações</Button>
          </form>
        </Form>
        <Button variant="destructive" onClick={onDelete}>
          Deletar conta
        </Button>
      </main>
    </PageWithHeaderAndSidebar>
  );
}

export default withAuth(Profile);
