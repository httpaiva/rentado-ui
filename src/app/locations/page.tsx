"use client";

import withAuth from "@/hooks/withAuth";
import { useCallback, useEffect, useState } from "react";
import { API_BASE_URL } from "@/constants";
import { Location } from "@/types/Location";
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

function Locations() {
  const [locations, setLocations] = useState<Location[]>([]);
  const router = useRouter();

  const fetchData = useCallback(async () => {
    const token = localStorage.getItem("access_token");
    try {
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
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    console.log("Locations useEffect");

    fetchData();
  }, [fetchData]);

  const onDelete = async (locationId: string) => {
    const token = localStorage.getItem("access_token");

    const confirmation = window.confirm(
      "Tem certeza que deseja deletar esse imóvel?",
    );

    if (confirmation) {
      const response = await fetch(`${API_BASE_URL}/locations/${locationId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert("Imóvel deletado com sucesso!");
        setLocations((prevLocations) =>
          prevLocations.filter((t) => t.id !== locationId),
        );
      } else {
        const responseData = await response.json();
        const { _error, message } = responseData;
        console.error(message);
      }
    }
  };

  return (
    <PageWithHeaderAndSidebar>
      <main className="flex min-h-screen flex-col items-center gap-20 p-20">
        <H1>Seus Imóveis</H1>

        <Button
          onClick={() => {
            router.push("/locations/new");
          }}
        >
          Adicionar novo imóvel
        </Button>

        {!locations.length ? (
          <P>Você ainda não possui imóveis</P>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Endereço</TableHead>
                <TableHead>Ação</TableHead>
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
                    <Button
                      onClick={() => {
                        router.push(`/locations/${location.id}`);
                      }}
                    >
                      Ver imóvel
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        onDelete(location.id!);
                      }}
                    >
                      Deletar imóvel
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
export default withAuth(Locations);
