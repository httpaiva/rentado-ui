"use client";

import PrivateHeader from "@/components/Headers/PrivateHeader";
import Heading from "@/components/Typography/Heading";
import withAuth from "@/hooks/withAuth";
import {
  ActionButton,
  Cell,
  Column,
  DialogTrigger,
  Flex,
  Row,
  TableBody,
  TableHeader,
  TableView,
} from "@adobe/react-spectrum";
import CreateLocationModal from "./comopnents/CreateLocationModal";
import EditLocationModal from "./comopnents/EditLocationModal";
import { useCallback, useEffect, useState } from "react";
import { BASE_URL } from "@/constants";
import Text from "@/components/Typography/Text";
import { Location } from "@/types/Location";

function Locations() {
  const [locations, setLocations] = useState<Location[]>([]);

  const fetchLocations = useCallback(async () => {
    const token = localStorage.getItem("access_token");
    const response = await fetch(`${BASE_URL}/locations`, {
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
          <Heading>Seus Imóveis</Heading>

          <DialogTrigger isDismissable type="modal">
            <ActionButton>Adicionar novo imóvel</ActionButton>
            <CreateLocationModal />
          </DialogTrigger>

          {locations.length === 0 ? (
            <Text>Você ainda não possui imóveis</Text>
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
                      <DialogTrigger isDismissable type="modal">
                        <ActionButton>Ver imóvel</ActionButton>
                        <EditLocationModal location={location} />
                      </DialogTrigger>
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

export default withAuth(Locations);
