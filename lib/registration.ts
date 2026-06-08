/**
 * På/av-knappar per anmälningstyp.
 *
 * Sätt respektive värde till `true` när det flödet ska öppnas.
 * `false` visar ett "öppnar snart"-meddelande och blockerar nya inlämningar.
 *
 * OBS: Befintlig data i Google Sheet påverkas inte – det styr bara
 * om nya anmälningar går att skicka in.
 */
export const ANMALAN_OPEN = false;
export const ANMODAN_OPEN = false;
export const INBJUDAN_OPEN = false;
