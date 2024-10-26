"use client";

import withAuth from "@/hooks/withAuth";
import { CreateRenterModal } from "./components/CreateRenterModal";
import { EditRenterModal } from "./components/EditRenterModal";
import { useCallback, useEffect, useState } from "react";
import { API_BASE_URL } from "@/constants";
import { Renter } from "@/types/Renter";
import {
  Button,
  H1,
  P,
  Dialog,
  DialogTrigger,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  PageWithHeaderAndSidebar,
} from "@/components";

function Renters() {
  const [renters, setRenters] = useState<Renter[]>([]);

  const fetchData = useCallback(async () => {
    const token = localStorage.getItem("access_token");
    const response = await fetch(`${API_BASE_URL}/renters`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const responseData = await response.json();
    if (response.ok && responseData) {
      setRenters(responseData);
    } else {
      alert("Erro ao carregar Locatários");
    }
  }, []);

  useEffect(() => {
    console.log("Renters useEffect");

    fetchData();
  }, [fetchData]);

  return (
    <PageWithHeaderAndSidebar>
      <main className="flex min-h-screen flex-col items-center gap-20 p-20">
        <H1>Seus Locatários</H1>

        <Dialog modal={false}>
          <DialogTrigger asChild>
            <Button>Adicionar novo locatário</Button>
          </DialogTrigger>
          <CreateRenterModal />
        </Dialog>

        {renters.length === 0 ? (
          <P>Você ainda não possui locatários</P>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>CPF</TableHead>
                <TableHead>Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {renters.map((renter) => (
                <TableRow key={renter.id}>
                  <TableCell>{`${renter.firstName} ${renter.lastName}`}</TableCell>
                  <TableCell>{renter.document_cpf}</TableCell>
                  <TableCell>
                    <Dialog modal>
                      <DialogTrigger asChild>
                        <Button>Ver locatário</Button>
                      </DialogTrigger>
                      <EditRenterModal renter={renter} />
                    </Dialog>
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

export default withAuth(Renters);
