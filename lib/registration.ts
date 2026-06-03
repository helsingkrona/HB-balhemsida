/**
 * På/av-knapp för alla anmälningsformulär (anmälan, inbjudan, anmodan).
 *
 * Sätt till `true` först när ni är klara med allt och ska skicka ut anmodan.
 * Så länge värdet är `false` visas ett "öppnar snart"-meddelande istället för
 * formulären, och inga nya rader kan skickas in i kalkylarket.
 *
 * OBS: Befintlig data i Google Sheet påverkas inte av detta – det styr bara
 * om nya anmälningar går att skicka in.
 */
export const REGISTRATION_OPEN = false;
