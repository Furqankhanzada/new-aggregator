import type { Route } from "./+types/home";
import { UserPreference } from "~/settings/UserPreference";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "News From The World" },
    { name: "Settings", content: "User Preference" },
  ];
}

export default function Preference() {
  return <UserPreference  />;
}
