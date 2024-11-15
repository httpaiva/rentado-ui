"use client";

import withAuth from "@/hooks/withAuth";
import { DocumentForm } from "../components/DocumentForm";
import { templateSchema } from "../schema";
import { z } from "zod";
import { Template } from "@/types/Template";
import { H2, PageWithHeaderAndSidebar } from "@/components";
import { API_BASE_URL } from "@/constants";
import { useRouter } from "next/navigation";

function NewTemplate() {
  const router = useRouter();
  const onSubmit = async (values: z.infer<typeof templateSchema>) => {
    const token = localStorage.getItem("access_token");
    const newValues = {
      ...values,
      content: JSON.stringify(values.content),
    }

    const response = await fetch(`${API_BASE_URL}/template`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newValues),
    });

    const responseData = await response.json();
    if (response.ok) {
      alert("Template criado com sucesso!");
      router.push("/templates");
    } else {
      const { _error, message } = responseData;
      alert(message);
    }
  };

  const template: Template = {
    title: "",
    content: [
      {
        type: "paragraph",
        children: [{ text: "Digite seu texto aqui..." }],
      },
    ],
  };

  return (
    <PageWithHeaderAndSidebar>
      <main className="flex min-h-screen flex-col items-center gap-20 p-20">
        <H2>Novo template</H2>
        <div className="w-full flex justify-center items-center">
          <DocumentForm onSubmit={onSubmit} template={template} />
        </div>
      </main>
    </PageWithHeaderAndSidebar>
  );
}

export default withAuth(NewTemplate);
