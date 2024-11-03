"use client";

import withAuth from "@/hooks/withAuth";
import { DocumentForm } from "../components/DocumentForm";
import { templateSchema } from "../schema";
import { z } from "zod";
import { Template } from "@/types/Template";
import { H2, PageWithHeaderAndSidebar } from "@/components";
import { useCallback, useEffect, useState } from "react";
import { API_BASE_URL } from "@/constants";
import { useParams, useRouter } from "next/navigation";

function EditTemplate() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [template, setTemplate] = useState<Template>();

  const onSubmit = async (values: z.infer<typeof templateSchema>) => {
    const token = localStorage.getItem("access_token");

    const newValues = {
      ...values,
      content: JSON.stringify(values.content),
    };

    const response = await fetch(`${API_BASE_URL}/template/${params.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newValues),
    });

    const responseData = await response.json();
    if (response.ok) {
      alert("Template atualizado com sucesso!");
      router.push("/templates");
    } else {
      const { _error, message } = responseData;
      alert(message);
    }
  };

  console.log({template: JSON.stringify(template?.content)});

  const fetchData = useCallback(async () => {
    if (!template) {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`${API_BASE_URL}/template/${params.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const responseData = await response.json();
      if (response.ok && responseData) {
        if (responseData.content) {
          responseData.content = JSON.parse(responseData.content);
        }
        setTemplate(responseData);
      } else {
        alert("Erro ao carregar Template");
      }
    }
  }, []);

  useEffect(() => {
    console.log("Template useEffect");

    fetchData();
  }, [fetchData]);

  const emptyTemplate: Template = {
    title: "",
    content: [
      {
        type: "paragraph",
        children: [{ text: "" }],
      },
    ],
  };

  return (
    <PageWithHeaderAndSidebar>
      <main className="flex min-h-screen flex-col items-center gap-20 p-20">
        <H2>Editar template</H2>
        <div className="w-full flex justify-center items-center">
          {template && (
            <DocumentForm
              onSubmit={onSubmit}
              template={template || emptyTemplate}
            />
          )}
        </div>
      </main>
    </PageWithHeaderAndSidebar>
  );
}

export default withAuth(EditTemplate);
