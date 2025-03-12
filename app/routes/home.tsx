import type { Route } from "./+types/home";
import { Acceuil } from "~/Composants/acceuil";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Acceuil to React Router!" },
  ];
}

export default function Home() {
  return <Acceuil   />;
}
