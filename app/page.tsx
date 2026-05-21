import { redirect } from "next/navigation";

export default function RootPage() {
  // AR is canonical. EN is the mirror.
  redirect("/ar");
}
