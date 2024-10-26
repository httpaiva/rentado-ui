"use client";

import withAuth from "@/hooks/withAuth";
import { CreateLocationModal } from "./components/CreateLocationModal";
import { EditLocationModal } from "./components/EditLocationModal";
import { useCallback, useEffect, useState } from "react";
import { API_BASE_URL } from "@/constants";
import { Location } from "@/types/Location";
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

function Locations() {
  const [locations, setLocations] = useState<Location[]>([]);

  const fetchData = useCallback(async () => {
    const token = localStorage.getItem("access_token");
    const response = await fetch(`${API_BASE_URL}/locations`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const responseData = await response.json();
    if (response.ok && responseData) {
      setLocations(responseData);
    } else {
      alert("Erro ao carregar Imóveis");
    }
  }, []);

  useEffect(() => {
    console.log("Locations useEffect");

    fetchData();
  }, [fetchData]);

  return (
    <PageWithHeaderAndSidebar>
      <main className="flex min-h-screen flex-col items-center gap-20 p-20">
        <H1>Seus Imóveis</H1>

        <Dialog modal={false}>
          <DialogTrigger asChild>
            <Button>Adicionar novo imóvel</Button>
          </DialogTrigger>
          <CreateLocationModal />
        </Dialog>

        {locations.length === 0 ? (
          <P>Você ainda não possui imóveis</P>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Endereço</TableHead>
                <TableHead>Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {locations.map((location) => (
                <TableRow key={location.id}>
                  <TableCell>{location.name}</TableCell>
                  <TableCell>
                    {location.street}, {location.number},{" "}
                    {location.neighborhood}, {location.city}, {location.state},{" "}
                    {location.country}, {location.postalCode}
                  </TableCell>
                  <TableCell>
                    <Dialog modal>
                      <DialogTrigger asChild>
                        <Button>Ver imóvel</Button>
                      </DialogTrigger>
                      <EditLocationModal location={location} />
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

export default withAuth(Locations);
