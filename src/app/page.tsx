"use client";

import Button from "@/components/Button";
import PublicHeader from "@/components/Headers/PublicHeader";
import Heading from "@/components/Typography/Heading";
import Link from "@/components/Typography/Link";
import Subtitle from "@/components/Typography/Subtitle";
import Text from "@/components/Typography/Text";
import { BASE_URL } from "@/constants";
import withoutAuth from "@/hooks/withoutAuth";
import { useRouter } from "next/navigation";

function Home() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center gap-20 p-20">
      <PublicHeader />
      <h1>Home</h1>
    </main>
  );
}

export default withoutAuth(Home);
