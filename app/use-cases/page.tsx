import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { pageMetadata } from "@/lib/metadata";
import { pages } from "@/lib/pages";

const page = pages["/use-cases/"];

export const metadata: Metadata = pageMetadata(page);

export default function Page() {
  return <PageShell page={page} />;
}
