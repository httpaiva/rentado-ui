import Image from "next/image";

type LogoProps = {
  width: number;
  height: number;
  variant?: 'black' | 'white'
};

export const Logo = ({ width, height, variant = 'white' }: LogoProps) => {
    const path = variant === 'white' ? '/rentado-logo.svg' : '/rentado-logo-black.svg'
  return (
    <Image
      src={path}
      alt="Rentado Logo"
      height={height}
      width={width}
      priority
    />
  );
};
