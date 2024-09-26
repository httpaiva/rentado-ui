import Image from "next/image";
import { FooterGroup, FooterWrapper } from "./styles";

export const Footer = () => {
  return (
    <FooterWrapper>
      <Image
        src="/rentado-logo.svg"
        alt="Rentado Logo"
        height={70}
        width={250}
        priority
      />
      <p style={{color: '#fff'}}>© 2024 Rentado. Todos os direitos reservados.</p>
      <FooterGroup>
      {/*<Image
        src="/gmail.svg"
        alt="Gmail Logo"
        height={40}
        width={40}
      />
      <Image
        src="/whatsapp.svg"
        alt="WhatsApp Logo"
        height={40}
        width={40}
      />
       <Image
        src="/instagram.svg"
        alt="Instagram Logo"
        height={40}
        width={40}
      />*/}
      </FooterGroup>
    </FooterWrapper>
  );
};
