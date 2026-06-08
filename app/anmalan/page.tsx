import { ANMALAN_OPEN } from "@/lib/registration";
import RegistrationClosed from "@/components/RegistrationClosed";
import AnmalanForm from "./AnmalanForm";

export default function AnmalanPage() {
  if (!ANMALAN_OPEN) return <RegistrationClosed />;
  return <AnmalanForm />;
}
