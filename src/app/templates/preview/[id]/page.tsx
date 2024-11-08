"use client";

import withAuth from "@/hooks/withAuth";
import { DocumentForm } from "../../components/DocumentForm";
import { Template } from "@/types/Template";
import { H2, PageWithHeaderAndSidebar } from "@/components";
import { useCallback, useEffect, useState } from "react";
import { API_BASE_URL } from "@/constants";
import { useParams, useSearchParams } from "next/navigation";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { createQueryString } from "@/utils/createQueryString";

function PreviewTemplate() {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const [template, setTemplate] = useState<Template>();
  const rent_id = searchParams.get("rent_id");
  const query = createQueryString({ rent_id });


  const fetchData = useCallback(async () => {
    if (!template) {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `${API_BASE_URL}/template/translate/${params.id}${query}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
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
  }, [template, params.id, query]);

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

  const handleDocumentSubmit = async (values: any) => {
    const getTargetElement = () => document.getElementById("document-editor");
    const element = getTargetElement();
    if (element) {
      html2canvas(element, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "mm", "a4");

        // Defina as dimensões da imagem no PDF
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        // Adicione a imagem capturada ao PDF
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

        // Salve o PDF com um nome
        pdf.save(values.title);
      });
    }
  };

  return (
    <PageWithHeaderAndSidebar>
      <main className="flex min-h-screen flex-col items-center gap-20 p-20">
        <H2>Preview de template</H2>
        <div className="w-full flex justify-center items-center">
          {template && (
            <DocumentForm
              template={template || emptyTemplate}
              isReadOnly
              buttonText="Baixar documento"
              onSubmit={handleDocumentSubmit}
            />
          )}
        </div>
      </main>
    </PageWithHeaderAndSidebar>
  );
}

export default withAuth(PreviewTemplate);
