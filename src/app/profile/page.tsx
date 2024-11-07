"use client";

import {
  Button,
  Form,
  FormControl,
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
import { DatePicker } from "@/components/ui/datepicker";

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

    // Informações adicionais
    document_cpf: z.preprocess((val) => val ?? "", z.string().optional()),
    document_rg: z.preprocess((val) => val ?? "", z.string().optional()),
    nationality: z.preprocess((val) => val ?? "", z.string().optional()),
    birthDate: z.preprocess(
      (val: any) => (val ? new Date(val) : null),
      z.coerce.date().nullable(),
    ),
    maritalStatus: z.preprocess((val) => val ?? "", z.string().optional()),
    ocupation: z.preprocess((val) => val ?? "", z.string().optional()),
    country: z.preprocess((val) => val ?? "", z.string().optional()),
    state: z.preprocess((val) => val ?? "", z.string().optional()),
    city: z.preprocess((val) => val ?? "", z.string().optional()),
    neighborhood: z.preprocess((val) => val ?? "", z.string().optional()),
    street: z.preprocess((val) => val ?? "", z.string().optional()),
    number: z.preprocess((val) => val ?? "", z.string().optional()),
    complement: z.preprocess((val) => val ?? "", z.string().optional()),
    postalCode: z.preprocess((val) => val ?? "", z.string().optional()),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      document_cpf: "",
      document_rg: "",
      nationality: "",
      birthDate: new Date(),
      maritalStatus: "",
      ocupation: "",
      country: "",
      state: "",
      city: "",
      neighborhood: "",
      street: "",
      number: "",
      complement: "",
      postalCode: "",
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
      <main className="flex min-h-screen flex-col items-center gap-8 p-20">
        <H2>Editar Perfil</H2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full max-w-4xl"
          >
            <section>
              <H2>Informações Básicas</H2>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Primeiro Nome</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Insira seu primeiro nome"
                          {...field}
                        />
                      </FormControl>
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirmar Senha</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Confirme sua senha"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </section>

            <section>
              <H2>Informações Adicionais</H2>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="document_cpf"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CPF</FormLabel>
                      <FormControl>
                        <Input placeholder="Insira seu CPF" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="document_rg"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>RG</FormLabel>
                      <FormControl>
                        <Input placeholder="Insira seu RG" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="nationality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nacionalidade</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Insira sua nacionalidade"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="birthDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col py-3">
                      <FormLabel>Data de Nascimento</FormLabel>
                      <FormControl>
                        <DatePicker
                          field={field}
                          placeholder="Insira a Data de Nascimento"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="maritalStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estado Civil</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Insira seu estado civil"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ocupation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ocupação</FormLabel>
                      <FormControl>
                        <Input placeholder="Insira sua ocupação" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </section>

            <section>
              <H2>Endereço</H2>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>País</FormLabel>
                      <FormControl>
                        <Input placeholder="Insira seu país" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estado</FormLabel>
                      <FormControl>
                        <Input placeholder="Insira seu estado" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cidade</FormLabel>
                      <FormControl>
                        <Input placeholder="Insira sua cidade" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="neighborhood"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bairro</FormLabel>
                      <FormControl>
                        <Input placeholder="Insira seu bairro" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rua</FormLabel>
                      <FormControl>
                        <Input placeholder="Insira sua rua" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número</FormLabel>
                      <FormControl>
                        <Input placeholder="Insira o número" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="complement"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Complemento</FormLabel>
                      <FormControl>
                        <Input placeholder="Insira um complemento" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CEP</FormLabel>
                      <FormControl>
                        <Input placeholder="Insira seu CEP" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </section>

            <div className="flex justify-center w-full">
              <Button type="submit">Atualizar informações</Button>
            </div>
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
