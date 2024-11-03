"use client";

import withAuth from "@/hooks/withAuth";
import { useCallback, useEffect, useMemo, useState } from "react";
import { API_BASE_URL } from "@/constants";
import { Rent } from "@/types/Rent";
import {
  Button,
  PageWithHeaderAndSidebar,
  H2,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components";
import { Template } from "@/types/Template";
import { useParams, useRouter } from "next/navigation";
import { SelectField } from "@/components/ui/select-field";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

function Rents() {
  const [rent, setRent] = useState<Rent>();
  const [templates, setTemplates] = useState<Template[]>([]);

  const params = useParams<{ id: string }>();
  const router = useRouter();

  const fetchData = useCallback(async () => {
    const token = localStorage.getItem("access_token");

    try {
      const [rentResponse, templatesResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/rents/${params.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }),
        fetch(`${API_BASE_URL}/template`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      // Extrai o JSON das respostas
      const [rentData, templatesData] = await Promise.all([
        rentResponse.json(),
        templatesResponse.json(),
      ]);

      // Verifica se as respostas foram bem-sucedidas antes de definir o estado
      if (rentResponse.ok) setRent(rentData);
      else alert("Erro ao carregar Aluguel");

      if (templatesResponse.ok) setTemplates(templatesData);
      else alert("Erro ao carregar Templates");
    } catch (error) {
      console.error("Erro ao carregar dados", error);
      alert("Erro ao carregar dados");
    }
  }, [params.id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const schema = z.object({
    template: z.string().min(1, { message: "This field has to be filled." }),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      template: '',
    },
  });

  const mappedTemplates = useMemo(() => {
    return templates?.map((template) => ({
      value: `${template.id}`,
      label: `${template.title}`,
    }));
  }, [templates]);

  const onSubmit = async (values: z.infer<typeof schema>) => {
    console.log({values})
    router.push(`/templates/preview/${values.template}?rent_id=${params.id}`);
    
  };

  return (
    <PageWithHeaderAndSidebar>
      <main className="flex min-h-screen flex-col items-center gap-20 p-20">
        <H2>Gerar documento para {rent?.location?.name}</H2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 flex flex-col justify-center items-center"
          >

            <FormField
              control={form.control}
              name="template"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Template</FormLabel>
                  <SelectField
                    {...field}
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    items={mappedTemplates || []}
                    placeholder="Selecione um template"
                  />
                  <FormDescription>Selecione um template</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Gerar documento</Button>
          </form>
        </Form>
      </main>
    </PageWithHeaderAndSidebar>
  );
}

export default withAuth(Rents);
