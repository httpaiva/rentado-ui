import Image from "next/image";

export default function PublicHeader() {
  return (
    <div className="flex flex-col items-center gap-2">
      <Image
        src="/rentado-logo.svg"
        alt="Rentado Logo"
        height={70}
        width={250}
        priority
      />
    </div>
  );
}
