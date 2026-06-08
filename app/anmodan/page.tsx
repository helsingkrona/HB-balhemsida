import { ANMODAN_OPEN } from "@/lib/registration";
import RegistrationClosed from "@/components/RegistrationClosed";
import AnmodanForm from "./AnmodanForm";

export default function AnmodanPage() {
  if (!ANMODAN_OPEN) return <RegistrationClosed />;
  return <AnmodanForm />;
}
