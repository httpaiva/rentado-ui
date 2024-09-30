"use client";

import { Logo } from "@/components";
import withoutAuth from "@/hooks/withoutAuth";
import { useRouter } from "next/navigation";

function SignIn() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen">
      <section className="flex grow min-h-screen bg-zinc-50 justify-center">
        <Logo width={490} height={110} variant="black" />
      </section>

      <section className="flex grow min-h-screen bg-zinc-800 rounded-3xl justify-center"></section>
    </main>
  );
}

export default withoutAuth(SignIn);
