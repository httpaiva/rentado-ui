"use client";

import PrivateHeader from "@/components/Headers/PrivateHeader";
import withoutAuth from "@/hooks/withoutAuth";
import {
  Cell,
  Column,
  Flex,
  Row,
  TableBody,
  TableHeader,
  TableView,
} from "@adobe/react-spectrum";
import CreateLocationModal from "./components/CreateLocationModal";
import EditLocationModal from "./components/EditLocationModal";
import { useCallback, useEffect, useState } from "react";
import { API_BASE_URL } from "@/constants";
import { Location } from "@/types/Location";
import { Button, H1, P, Dialog, DialogTrigger } from "@/components";

function Locations() {
  const [locations, setLocations] = useState<Location[]>([]);

  const fetchLocations = useCallback(async () => {
    const token = localStorage.getItem("access_token");
    const response = await fetch(`${API_BASE_URL}/locations`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const responseData = await response.json();
    console.log({ responseData });
    if (response.ok && responseData) {
      setLocations(responseData);
    } else {
      alert("Erro ao carregar Imóveis");
    }
  }, []);

  useEffect(() => {
    console.log("Locations useEffect");

    fetchLocations();
  }, [fetchLocations]);

  return (
    <>
      <PrivateHeader />
      <main className="flex min-h-screen flex-col items-center gap-20 p-20">
        <Flex height="100%" width="100%" direction="column" gap="size-150">
          <H1>Seus Imóveis</H1>

          <Dialog>
            <DialogTrigger asChild>
              <Button>Adicionar novo imóvel</Button>
            </DialogTrigger>
            <CreateLocationModal />
          </Dialog>

          {locations.length === 0 ? (
            <P>Você ainda não possui imóveis</P>
          ) : (
            <TableView flex aria-label="Locations table">
              <TableHeader>
                <Column>Nome</Column>
                <Column allowsResizing>Endereço</Column>
                <Column align="end">Ação</Column>
              </TableHeader>
              <TableBody>
                {locations.map((location) => (
                  <Row key={location.id}>
                    <Cell>{location.name}</Cell>
                    <Cell>
                      {location.street}, {location.number},{" "}
                      {location.neighborhood}, {location.city}, {location.state}
                      , {location.country}, {location.postalCode}
                    </Cell>
                    <Cell>
                      <Dialog modal>
                        <DialogTrigger asChild>
                          <Button>Ver imóvel</Button>
                        </DialogTrigger>
                        <EditLocationModal location={location} />
                      </Dialog>
                    </Cell>
                  </Row>
                ))}
              </TableBody>
            </TableView>
          )}
        </Flex>
      </main>
    </>
  );
}

export default withoutAuth(Locations);
