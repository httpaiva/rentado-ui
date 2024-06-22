"use client";

import Button from "@/components/Button";
import PrivateHeader from "@/components/Headers/PrivateHeader";
import Heading from "@/components/Typography/Heading";
import {
  ActionButton,
  Cell,
  Column,
  Content,
  Dialog,
  DialogTrigger,
  Divider,
  Flex,
  Row,
  TableBody,
  TableHeader,
  TableView,
  Text,
  Heading as SpectrumHeading,
} from "@adobe/react-spectrum";

export default function Locations() {
  return (
    <>
      <PrivateHeader />
      <main className="flex min-h-screen flex-col items-center gap-20 p-20">
        <Flex height="100%" width="100%" direction="column" gap="size-150">
          <Heading>Seus Imóveis</Heading>

          <DialogTrigger isDismissable type="modal">
            <ActionButton>Adicionar novo imóvel</ActionButton>
            <Dialog>
              <SpectrumHeading>Modal</SpectrumHeading>
              <Divider />
              <Content>
                <Text>This is a modal.</Text>
              </Content>
            </Dialog>
          </DialogTrigger>

          <TableView flex aria-label="Locations table">
            <TableHeader>
              <Column>Nome</Column>
              <Column>Endereço</Column>
              <Column>Ação</Column>
            </TableHeader>
            <TableBody>
              <Row>
                <Cell>Games</Cell>
                <Cell>File folder</Cell>
                <Cell>
                  <DialogTrigger isDismissable type="modal">
                    <ActionButton>Ver imóvel</ActionButton>
                    <Dialog>
                      <SpectrumHeading>Imóvel X</SpectrumHeading>
                      <Divider />
                      <Content>
                        <Text>This is a modal.</Text>
                      </Content>
                    </Dialog>
                  </DialogTrigger>
                </Cell>
              </Row>
              <Row>
                <Cell>Games 2</Cell>
                <Cell>File folder 2</Cell>
                <Cell>
                  <DialogTrigger isDismissable type="modal">
                    <ActionButton>Ver imóvel</ActionButton>
                    <Dialog>
                      <SpectrumHeading>Imóvel X</SpectrumHeading>
                      <Divider />
                      <Content>
                        <Text>This is a modal.</Text>
                      </Content>
                    </Dialog>
                  </DialogTrigger>
                </Cell>
              </Row>
            </TableBody>
          </TableView>
        </Flex>
      </main>
    </>
  );
}
