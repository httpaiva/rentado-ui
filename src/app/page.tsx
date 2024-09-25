"use client";

import withoutAuth from "@/hooks/withoutAuth";
import { colors } from "@/utils/tokens";
import { Section } from "@/components/home/Section";
import PublicHeader from "@/components/home/PublicHeader";
import { Footer } from "@/components/Footer";
import { H1 } from "@/components/Typography/H1";
import { H2 } from "@/components/Typography/H2";
import { H3 } from "@/components/Typography/H3";
import Image from "next/image";
import { Card, CTAButton } from "@/components/home/styles";
import { P } from "@/components/Typography/P";

function Home() {
  return (
    <main>
      <PublicHeader />
      <Section bgColor={colors.blue} id="start">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 100,
            padding: 120,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              gap: 56,
            }}
          >
            <H1 color={colors.white}>
              Simplifique a Gestão de Seus Imóveis com o Rentado!
            </H1>
            <H3 color={colors.white}>
              Gerencie contratos, pagamentos e prazos em um só lugar
            </H3>
            <CTAButton>Cadastre-se agora</CTAButton>
          </div>

          <Image
            src="/tablet-couple.svg"
            alt="Couple seeing a tablet"
            height={500}
            width={500}
          />
        </div>
      </Section>
      <Section bgColor={colors.gray_dark} id="what-is">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: 550,
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            gap: 48,
          }}
        >
          <H1 color={colors.white}>O que é o Rentado?</H1>
          <H3 color={colors.white}>
            O Rentado é um software especializado em facilitar o gerenciamento
            de aluguéis. Ao contrário de plataformas como o Quinto Andar e
            Airbnb, que focam na divulgação, o Rentado permite que locadores
            tenham total controle sobre seus contratos, imóveis e locatários.
          </H3>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 60,
            padding: 60,
          }}
        >
          <Card maxWidth={220}>
            <P color={colors.white}>Cadastro de imóveis e locatários</P>
          </Card>

          <Card maxWidth={220}>
            <P color={colors.white}>
              Centralização de contas a pagar e a receber, e Serviços.
            </P>
          </Card>

          <Card maxWidth={220}>
            <P color={colors.white}>Notificações de prazos importantes</P>
          </Card>
        </div>
        <Image
          src="/house-searching.svg"
          alt="Boy searching for houses"
          height={300}
          width={300}
        />
      </Section>
      <Section bgColor={colors.white} id="how-it-works">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 60,
          }}
        >
          <H1 color={colors.blue}>Como Funciona?</H1>
          <Card
            bgColor={colors.white}
            borderColor={colors.blue}
            maxWidth={300}
            gap={24}
          >
            <H2 color={colors.blue}>Passo 1</H2>
            <P color={colors.blue}>Cadastre seus imóveis e locatários.</P>
          </Card>

          <Card
            bgColor={colors.white}
            borderColor={colors.blue}
            maxWidth={300}
            gap={24}
          >
            <H2 color={colors.blue}>Passo 2</H2>
            <P color={colors.blue}>
              Insira dados sobre contratos e pagamentos. e Serviços
            </P>
          </Card>

          <Card
            bgColor={colors.white}
            borderColor={colors.blue}
            maxWidth={300}
            gap={24}
          >
            <H2 color={colors.blue}>Passo 3</H2>
            <P color={colors.blue}>
              Receba notificações sobre vencimentos e eventos importantes.
            </P>
          </Card>

          <Card
            bgColor={colors.white}
            borderColor={colors.blue}
            maxWidth={300}
            gap={24}
          >
            <H2 color={colors.blue}>Passo 4</H2>
            <P color={colors.blue}>
              Acompanhe as movimentações financeiras e contratos de forma clara
              e centralizada.
            </P>
          </Card>
        </div>
      </Section>
      <Section bgColor={colors.gray_dark} id="benefits">
        <Card bgColor={colors.blue} gap={32}>
          <div style={{textAlign: 'initial', maxWidth: 500, display: 'flex', flexDirection: 'column', gap: 32, margin: 20}}>
          <H2 color={colors.white}>Benefícios de Usar o Rentado</H2>
            <P color={colors.white}>
              - Gerenciamento Completo: Controle total sobre seus imóveis e
              contratos.
            </P>
            <P color={colors.white}>
              - Notificações Inteligentes: Nunca perca uma data importante, como
              vencimento de aluguel ou término de contrato.
            </P>
            <P color={colors.white}>
              - Relatórios Simples: Tenha uma visão clara das contas e contratos
              em andamento.
            </P>
          </div>
        </Card>
        <div
            style={{
              position: "relative",
              top: -125,
              right: -320
            }}
          >
            <Image
              src="/device.svg"
              alt="Smartphone device"
              height={250}
              width={240}
            />
          </div>
      </Section>
      <Section bgColor={colors.blue} id="contact" minHeight={480}>
        <H2 color={colors.white}>
          Pronto para simplificar a gestão dos seus imóveis?
        </H2>
        <div
          style={{
            display: "flex",
            gap: 56,
            padding: 56,
          }}
        >
          <CTAButton>Comece agora</CTAButton>
          <CTAButton>Entre em contato</CTAButton>
        </div>
      </Section>
      <Footer />
    </main>
  );
}

export default withoutAuth(Home);
