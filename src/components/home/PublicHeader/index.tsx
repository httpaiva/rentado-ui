import Image from "next/image";

import { HeaderAnchor, HeaderWrapper, HeaderGroup } from "./styles";

export default function PublicHeader() {
  return (
    <HeaderWrapper style={{zIndex: 2}}>
      <Image
        src="/rentado-logo.svg"
        alt="Rentado Logo"
        height={70}
        width={250}
        priority
      />
      <HeaderGroup>
        <HeaderAnchor href="#start">Inicio</HeaderAnchor>
        <HeaderAnchor href="#what-is">O que é o Rentado</HeaderAnchor>
        <HeaderAnchor href="#benefits">Benefícios</HeaderAnchor>
        <HeaderAnchor href="#how-it-works">Como funciona</HeaderAnchor>
        <HeaderAnchor href="#contact">Contato</HeaderAnchor>
        <HeaderAnchor href="/signin">Entrar</HeaderAnchor>
      </HeaderGroup>
    </HeaderWrapper>
  );
}
