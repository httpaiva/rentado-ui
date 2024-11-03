"use client";

import withoutAuth from "@/hooks/withoutAuth";
import { DocumentForm } from "./components/DocumentForm";
import { templateSchema } from "./schema";
import { z } from "zod";
import { Template } from "@/types/Template";

function Profile() {
  const onSubmit = async (values: z.infer<typeof templateSchema>) => {
    const token = localStorage.getItem("access_token");
    console.log({ values });

    // const response = await fetch(`${API_BASE_URL}/rents/${rent.id}`, {
    //   method: "PATCH",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token}`,
    //   },
    //   body: JSON.stringify(values),
    // });

    // const responseData = await response.json();
    // if (response.ok) {
    //   alert("Aluguél atualizado com sucesso!");
    //   window.location.reload();
    // } else {
    //   const { _error, message } = responseData;
    //   alert(message);
    // }
  };

  const template: Template = {
    title: "Teste",
    content: [
      {
        type: "paragraph",
        children: [{ text: "Digite seu texto aqui..." }],
      },
    ],
  };

  return (
      <div className="w-full flex justify-center items-center">
        <DocumentForm onSubmit={onSubmit} template={template} />
      </div>
  );
}

export default withoutAuth(Profile);
