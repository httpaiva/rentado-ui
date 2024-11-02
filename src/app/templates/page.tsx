"use client";

import { useRouter } from "next/navigation";

import withoutAuth from "@/hooks/withoutAuth";
import { DocumentEditor } from "@/components";

function Profile() {
  const router = useRouter();

  return (
    <DocumentEditor />
  );
}

export default withoutAuth(Profile);
