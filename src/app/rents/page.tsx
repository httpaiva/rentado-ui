"use client";

import withAuth from "@/hooks/withAuth";
import { CreateRentModal } from "./components/CreateRentModal";
import { EditRentModal } from "./components/EditRentModal";
import { useCallback, useEffect, useState } from "react";
import { API_BASE_URL } from "@/constants";
import { Rent } from "@/types/Rent";
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
import { Location } from "@/types/Location";
import { Renter } from "@/types/Renter";

function Rents() {
  const [rents, setRents] = useState<Rent[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [renters, setRenters] = useState<Renter[]>([]);

  const fetchData = useCallback(async () => {
    const token = localStorage.getItem("access_token");

    try {
      // Executa todas as chamadas em paralelo
      const [rentsResponse, locationsResponse, rentersResponse] =
        await Promise.all([
          fetch(`${API_BASE_URL}/rents`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }),
          fetch(`${API_BASE_URL}/locations`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }),
          fetch(`${API_BASE_URL}/renters`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

      // Extrai o JSON das respostas
      const [rentsData, locationsData, rentersData] = await Promise.all([
        rentsResponse.json(),
        locationsResponse.json(),
        rentersResponse.json(),
      ]);

      // Verifica se as respostas foram bem-sucedidas antes de definir o estado
      if (rentsResponse.ok) setRents(rentsData);
      else alert("Erro ao carregar Aluguéis");

      if (locationsResponse.ok) setLocations(locationsData);
      else alert("Erro ao carregar Imóveis");

      if (rentersResponse.ok) setRenters(rentersData);
      else alert("Erro ao carregar Locatários");
    } catch (error) {
      console.error("Erro ao carregar dados", error);
      alert("Erro ao carregar dados");
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <PageWithHeaderAndSidebar>
      <main className="flex min-h-screen flex-col items-center gap-20 p-20">
        <H1>Seus Aluguéis</H1>

        <Dialog modal={false}>
          <DialogTrigger asChild>
            <Button>Adicionar novo aluguél</Button>
          </DialogTrigger>
          <CreateRentModal locations={locations} renters={renters} />
        </Dialog>

        {rents.length === 0 ? (
          <P>Você ainda não possui aluguéis</P>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Imóvel</TableHead>
                <TableHead>Locatário</TableHead>
                <TableHead>Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rents.map((rent) => (
                <TableRow key={rent.id}>
                  <TableCell>{rent.location?.name}</TableCell>
                  <TableCell>{`${rent.renter?.firstName} ${rent.renter?.lastName}`}</TableCell>
                  <TableCell>
                    <Dialog modal>
                      <DialogTrigger asChild>
                        <Button>Ver aluguél</Button>
                      </DialogTrigger>
                      <EditRentModal
                        rent={rent}
                        locations={locations}
                        renters={renters}
                      />
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

export default withAuth(Rents);
