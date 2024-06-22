import Image from "next/image";
import Button from "./components/Button";
import { useRouter } from "next/navigation";

export default function PrivateHeader() {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between w-full h-20 bg-green-200 px-10">
      <Image
        src="/rentado-logo.svg"
        alt="Rentado Logo"
        height={33}
        width={115}
        priority
      />

      <div className="flex items-center gap-4 h-20">
        <Button
          onClick={() => {
            router.push("/locations");
          }}
        >
          Seus imóveis
        </Button>
        <Button
          onClick={() => {
            router.push("/profile");
          }}
        >
          Perfil
        </Button>
        <Button
          onClick={() => {
            localStorage.removeItem("access_token");
            router.push("/signin");
          }}
        >
          Sair
        </Button>
      </div>
    </div>
  );
}
