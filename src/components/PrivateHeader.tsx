import Image from "next/image";
import { Button } from "@/components";
import { useRouter } from "next/navigation";

export const PrivateHeader = () => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between w-full h-20 bg-zinc-50 px-10">
      <Image
        src="/rentado-logo-black.svg"
        alt="Rentado Logo"
        height={33}
        width={115}
        priority
      />

      <div className="flex items-center h-20">
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
