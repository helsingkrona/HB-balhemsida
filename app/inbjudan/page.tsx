import { INBJUDAN_OPEN } from "@/lib/registration";
import RegistrationClosed from "@/components/RegistrationClosed";
import InbjudanForm from "./InbjudanForm";

export default function InbjudanPage() {
  if (!INBJUDAN_OPEN) return <RegistrationClosed />;
  return <InbjudanForm />;
}
