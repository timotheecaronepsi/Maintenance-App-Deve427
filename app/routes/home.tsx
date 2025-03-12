import type { Route } from "./+types/home";
import { Accueil } from "~/Composants/Accueil.jsx";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Acceuil to React Router!" },
  ];
}

export default function Home() {
  return <Accueil   />;
}
