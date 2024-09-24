"use client";

import Button from "@/components/Button";
import withoutAuth from "@/hooks/withoutAuth";
import { colors } from "@/utils/tokens";
import { Section } from "@/components/Section";
import PublicHeader from "@/components/Headers/PublicHeader";
import { Footer } from "@/components/Footer";


function Home() {
  return (
    <main>
      <PublicHeader />
      <Section bgColor={colors.blue} id="start">
        <h1>Conteúdo centralizado</h1>
      </Section>
      <Section bgColor={colors.gray_dark} id="what-is">
        <h1>Conteúdo centralizado</h1>
      </Section>
      <Section bgColor={colors.white} id="how-it-works">
        <h1>Conteúdo centralizado</h1>
      </Section>
      <Section bgColor={colors.gray_dark} id="benefits">
        <h1>Conteúdo centralizado</h1>
      </Section>
      <Section bgColor={colors.blue} id="contact">
        <h1>Conteúdo centralizado</h1>
      </Section>
      <Footer />
    </main>
  );
}

export default withoutAuth(Home);
