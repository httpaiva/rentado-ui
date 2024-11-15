"use client";

import withAuth from "@/hooks/withAuth";
import { useCallback, useEffect, useState } from "react";
import { API_BASE_URL } from "@/constants";
import { Template } from "@/types/Template";
import {
  Button,
  H1,
  P,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  PageWithHeaderAndSidebar,
} from "@/components";
import { useRouter } from "next/navigation";

function Templates() {
  const [templates, setTemplates] = useState<Template[]>([]);

  const fetchData = useCallback(async () => {
    const token = localStorage.getItem("access_token");
    const response = await fetch(`${API_BASE_URL}/template`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const responseData = await response.json();
    if (response.ok && responseData) {
      setTemplates(responseData);
    } else {
      alert("Erro ao carregar Templates");
    }
  }, []);

  useEffect(() => {
    console.log("Templates useEffect");

    fetchData();
  }, [fetchData]);

  const router = useRouter();

  const onDelete = async (template: Template) => {
    const token = localStorage.getItem("access_token");

    const confirmation = window.confirm(
      "Tem certeza que deseja deletar esse template?",
    );

    if (confirmation) {
      const response = await fetch(`${API_BASE_URL}/template/${template.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert("Template deletado com sucesso!");
        setTemplates((prevTemplates) =>
          prevTemplates.filter((t) => t.id !== template.id),
        );
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
        <H1>Seus Templates</H1>

        <Button
          onClick={() => {
            router.push("/templates/new");
          }}
        >
          Adicionar novo template
        </Button>

        {templates.length === 0 ? (
          <P>Você ainda não possui templates</P>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titulo</TableHead>
                <TableHead>Ação</TableHead>
                <TableHead>Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {templates.map((template) => (
                <TableRow key={template.id}>
                  <TableCell>{template.title}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        router.push(`/templates/${template.id}`);
                      }}
                    >
                      Ver template
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        onDelete(template);
                      }}
                    >
                      Deletar template
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </main>
    </PageWithHeaderAndSidebar>
  );
}

export default withAuth(Templates);
