"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { SignUpFormData } from "@/google_sheets/helper";
import { useRouter } from "next/navigation";

export default function AnmalanPage() {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  //Hanterar hurvida den öppna anmälan ska vara öppen eller inte
  useEffect(() => {
    const now = new Date();
    const openDate = new Date("2025-08-25T00:00:00"); // Datum anmälan ska öppna
    if (now >= openDate) {
      setIsVisible(true);
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>();

  const onSubmit = async (data: SignUpFormData) => {

    //Hanterar matpreferenser
    const selectedOptions = data.food_preference_options || [];
    const custom = data.food_preference_custom || "";
    const allPreferences = [...selectedOptions, custom.trim()]
      .filter(Boolean) // remove empty strings
      .join(", ");
    data.food_preference = allPreferences;

    //Skickar formulärsvaret till ´consollen i webläsaren för felsökning, plocka bort innan prod.
    console.log("Formulärdata:", data);

    //Skickar formulärsvaret till apiet
    const response = await fetch("/api/signupAnmalan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    //Skickar användaren till tack-sidan
    if (response.ok) {
      router.push("/tack");
    } else {
      alert("Något har gått fel, försök igen. Om felet kvarstår kontakta it@helsingkrona.se");
    }
  };

  
  if (!isVisible) {
    return (
      <div className="p-2">
        <div className="text-center p-6 bg-darkerGreen max-w-2xl shadow-lg rounded-lg mx-auto">
          <p className="text-lg font-medium">
            Formuläret öppnar den 18 augusti 2025. Välkommen tillbaka då!
          </p>
        </div>
      </div>
    );
  }

  return (
    <main>
      <div className="p-2"></div>
      <div className="max-w-2xl mx-auto p-6 bg-darkerGreen shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-textGreen text-center mb-4">Anmälan Snörsjöaorden</h1>
        <small className="form-answer-tip">Obligatoriska fält markeras med *</small>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Personuppgifter och annat */}
          <div className="form-group">
            {/* Namn */}
            <div>
              <label className="form-label">Förnamn *</label>
              <input
                {...register("first_name", { required: "Förnamn är obligatoriskt" })}
                className="border p-2 w-full rounded"
              />
              {errors.first_name && <p className="text-red-500">{errors.first_name.message}</p>}
            </div>

            <div>
              <label className="form-label">Efternamn *</label>
              <input
                {...register("last_name", { required: "Efternamn är obligatoriskt" })}
                className="border p-2 w-full rounded"
              />
              {errors.last_name && <p className="text-red-500">{errors.last_name.message}</p>}
            </div>

            {/* Titel */}
            <div>
              <label className="form-label">Titel</label>
              <input {...register("title")} className="border p-2 w-full rounded" />
              <small className="form-answer-tip">Exempelvis: kurator emeritus/emerita, PQS XX nation, m.m.</small>
            </div>

            {/* E-post */}
            <div>
              <label className="form-label">E-postadress *</label>
              <input
                type="email"
                {...register("email", { required: "E-post är obligatoriskt" })}
                className="border p-2 w-full rounded"
              />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>



            {/* Adress */}
            <div>
              <label className="form-label">Adress *</label>
              <input
                {...register("address", { required: "Adress är obligatoriskt" })}
                className="border p-2 w-full rounded"
              />
              {errors.address && <p className="text-red-500">{errors.address.message}</p>}
            </div>

            {/* Postnummer & Stad */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="form-label">Postnummer *</label>
                <input
                  {...register("postal_code", { required: "Postnummer är obligatoriskt" })}
                  className="border p-2 w-full rounded"
                />
                {errors.postal_code && <p className="text-red-500">{errors.postal_code.message}</p>}
              </div>

              <div className="flex-1">
                <label className="form-label">Ort *</label>
                <input
                  {...register("city", { required: "Ort är obligatoriskt" })}
                  className="border p-2 w-full rounded"
                />
                {errors.city && <p className="text-red-500">{errors.city.message}</p>}
              </div>
            </div>

            {/* Relation till nationen */}
            <div>
              <label className="form-label">Relation till nationen *</label>
              <input {...register("relationship_to_nation", { required: "Relation till nationen är obligatoriskt" })}
                className="border p-2 w-full rounded" />
              <small className="form-answer-tip">Exempelvis: förman, kurator emeritus/emerita, boende m.m.</small>
              {errors.relationship_to_nation && <p className="text-red-500">{errors.relationship_to_nation.message}</p>}
            </div>

            {/* Respektive */}
            <div>
              <label className="form-label">Respektive</label>
              <input {...register("companion")} className="border p-2 w-full rounded" />
              <small className="form-answer-tip">Observera att din respektive också måste skicka in en anmälan till balen för att få möjlighet till en plats.</small>
            </div>

            {/* Sällskap */}
            <div>
              <label className="form-label">Bordssällskap under middagen</label>
              <input {...register("group")} className="border p-2 w-full rounded" />
              <small className="form-answer-tip">Observera att vi kommer göra vårt bästa för att tillfredsställa alla sällskap.</small>
            </div>

            {/* Matpreferenser */}
            <div>
              <label className="form-label">Matpreferens</label>

              <div className="form-answer-box">
                {["Vegetarian", "Vegan", "Gluten", "Laktos"].map((option) => (
                  <label key={option} className="form-answer-alternative">
                    <input
                      type="checkbox"
                      value={option}
                      {...register("food_preference_options")}
                      className="accent-deepForestGreen"
                    />
                    {option}
                  </label>
                ))}
              </div>
              <label className="form-answer-tip">Ange andra preferenser (t.ex. inga nötter)</label>
              <input {...register("food_preference_custom")} className="border p-2 w-full rounded" />

            </div>
          </div>
          {/* Anmälan till fredagssittningen */}
          <div className="form-group">
            <label className="form-section">Fredag 3/10</label>
            <div className="form-question">
              <label className="form-label">Vill du gå på Snörsjöasittningen (230 kr)?</label>
              <div className="form-answer-box">
                <label className="form-answer-alternative">
                  <input type="radio" {...register("friday_dinner")} value="Ja" />
                  <span>Ja</span>
                </label>
                <label className="form-answer-alternative">
                  <input type="radio" {...register("friday_dinner")} value="Nej" />
                  <span>Nej</span>
                </label>
              </div>
            </div>
            <div className="form-question">
              <label className="form-answer-alternative">
                <input type="checkbox" {...register("nation_songbook")} />
                <span>Jag vill köpa till en sångbok (70 kr)</span>
              </label>
              <small className="form-answer-tip">Sångboken delas ut under snörsjöasittningen på fredagen</small>
            </div>
          </div>
          {/* Anmälan till balen */}
          <div className=" rounded-md">
            <label className="form-section">Lördag 4/10</label>
            <div className="form-question">
              <label className="form-label">Prisgrupp *</label>
              <div className="form-answer-box">
                <label className="form-answer-alternative">
                  <input type="radio" {...register("saturday_dinner", { required: "Välj ett alternativ" })} value="Student" />
                  <span>Student 915 kr</span>
                </label>
                <label className="form-answer-alternative ">
                  <input type="radio" {...register("saturday_dinner", { required: "Välj ett alternativ" })} value="Icke-student" />
                  <span>Icke-student 1070 kr</span>
                </label>
                {errors.saturday_dinner && <p className="text-red-500">{errors.saturday_dinner.message}</p>}
              </div>
            </div>


            <div className="form-question">
              <label className="form-answer-alternative">
                <input type="checkbox" {...register("alumni_drink")} />
                <span>Jag vill anmäla mig till alumnifördrinken</span>
              </label>
            </div>


            <div className="form-question">
              <label className="form-label">Dryckespreferens *</label>
              <div className="form-answer-box">
                <label className="form-answer-alternative">
                  <input type="radio" {...register("saturday_drink_preference", { required: "Välj ett alternativ" })} value="Öl" />
                  <span>Öl</span>
                </label>
                <label className="form-answer-alternative">
                  <input type="radio" {...register("saturday_drink_preference", { required: "Välj ett alternativ" })} value="Cider" />
                  <span>Cider</span>
                </label>
                <label className="form-answer-alternative">
                  <input type="radio" {...register("saturday_drink_preference", { required: "Välj ett alternativ" })} value="Alkfri öl" />
                  <span>Alkoholfri öl</span>
                </label>
                <label className="form-answer-alternative">
                  <input type="radio" {...register("saturday_drink_preference", { required: "Välj ett alternativ" })} value="Alkfri cider" />
                  <span>Alkohholfri cider</span>
                </label>
                {errors.saturday_drink_preference && <p className="text-red-500">{errors.saturday_drink_preference.message}</p>}
              </div>
            </div>
            {/* Extra snapsbiljetter */}
            <div className="form-question">
              <label className="form-label">Extra snapsbiljetter (50 kr/st) *</label>
              <small className="form-answer-tip">En snaps och en punch ingår i middagspriset. Du kan köpa till upp till 3 extra snaps.</small>
              <div className="form-answer-box">
                <label className="form-answer-alternative">
                  <input type="radio" {...register("extra_snaps_tickets", { required: "Välj ett alternativ" })} value="0" />
                  <span>0</span>
                </label>
                <label className="form-answer-alternative">
                  <input type="radio" {...register("extra_snaps_tickets", { required: "Välj ett alternativ" })} value="1" />
                  <span>1</span>
                </label>
                <label className="form-answer-alternative">
                  <input type="radio" {...register("extra_snaps_tickets", { required: "Välj ett alternativ" })} value="2" />
                  <span>2</span>
                </label>
                <label className="form-answer-alternative">
                  <input type="radio" {...register("extra_snaps_tickets", { required: "Välj ett alternativ" })} value="3" />
                  <span>3</span>
                </label>
                {errors.extra_snaps_tickets && <p className="text-red-500">{errors.extra_snaps_tickets.message}</p>}
              </div>
            </div>


            <div className="form-question">
              <label className="form-label">Ordensmedalj (95 kr) *</label>
              <div className="form-answer-box">
                <label className="form-answer-alternative">
                  <input type="radio" {...register("medal", { required: "Välj ett alternativ" })} value="ja" />
                  <span>Ja</span>
                </label>
                <label className="form-answer-alternative">
                  <input type="radio" {...register("medal", { required: "Välj ett alternativ" })} value="nej" />
                  <span>Nej</span>
                </label>
                <label className="form-answer-alternative">
                  <input type="radio" {...register("medal", { required: "Välj ett alternativ" })} value="byta in" />
                  <span>Byta in</span>
                </label>
              </div>
              <small className="form-answer-tip">Det är ditt egna ansvar att byta in din medalj under <a target="_blank"
                href="https://helsingkrona.se/sv/kontakta-oss" className="text-blue-500 underline">expeditionstid</a>. Väljer du att köpa en medalj så kommer du få den i ditt kuvert på balen. OBS femte medaljen är den sista medaljen man kan få.</small>

              {errors.medal && <p className="text-red-500">{errors.medal.message}</p>}
            </div>

            <div className="form-question">
              <label className="form-label">Grad - Den du uppnår på denna bal *</label>
              <div className="space-y-2">
                {[
                  { value: "1", label: "5:e Ståndet Torvvändare (1:a balen)" },
                  { value: "2", label: "4:e Ståndet Stigfinnare (2:a balen)" },
                  { value: "3", label: "3:e Ståndet Flottare (3:e balen)" },
                  { value: "4", label: "2:a Ståndet Rallare (4:e balen)" },
                  { value: "5", label: "1:a Ståndet Jägare (5:e balen)" },
                  { value: "6", label: "Äldre" },
                ].map((option) => (
                  <div key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      id={`grad${option.value}`}
                      value={option.value}
                      {...register("baler", { required: "Välj din grad" })}
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label
                      htmlFor={`grad${option.value}`}
                      className="ml-2 text-deepForestGreen"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
              {errors.baler && (
                <p className="text-red-500 text-sm mt-1">{errors.baler.message}</p>
              )}
              <small className="form-answer-tip">
                Ska du bli jägare? Kontakta Övermarskalk på{" "}
                <a
                  href="mailto:overmarskalk@helsingkrona.se"
                  className="text-blue-500 underline"
                >
                  overmarskalk@helsingkrona.se
                </a>{" "}
                för att anmäla dig till jägarmiddagen. Ska du plantera träd, skicka in bevis till addressen ovan.
              </small>
            </div>
            <div className="form-question">
              <label className="form-label">Helsingkrona pin</label>
              <label className="form-answer-alternative">
                <input type="checkbox" {...register("nation_pin")} />
                <span>Ja (40 kr)</span>
              </label>
              <small className="form-answer-tip">Väljer du att köpa en pin så kommer du få den i ditt kuvert på balen.</small>
            </div>
          </div>

          <div className="form-question">
            <label className="form-label">Sexa (100 kr)</label>
            <div className="form-answer-box">
              <label className="form-answer-alternative">
                <input type="radio" {...register("sexa")} value="Öl" />
                <span>Ja - Öl</span>
              </label>
              <label className="form-answer-alternative">
                <input type="radio" {...register("sexa")} value="Cider" />
                <span>Ja - Cider</span>
              </label>
              <label className="form-answer-alternative">
                <input type="radio" {...register("sexa")} value="nej" />
                <span>Nej</span>
              </label>
            </div>
          </div>

          {/* Anmälan till söndagsbrunchen */}
          <div className="form-group">
            <label className="form-section">Söndag 5/10</label>
            <label className="form-label">Vill du gå på Snörsjöbrunchen? (100 kr)</label>
            <div className="form-answer-box">
              <label className="form-answer-alternative">
                <input type="radio" {...register("brunch")} value="Ja" />
                <span>Ja</span>
              </label>
              <label className="form-answer-alternative">
                <input type="radio" {...register("brunch")} value="Nej" />
                <span>Nej</span>
              </label>
            </div>
          </div>

          {/* Övriga val */}
          <div className="form-group">
            <label className="form-section">Övriga tillägg</label>


            <div className="form-question">
              <label className="form-label">Donation
                <input
                  type="number"
                  {...register("donation", {
                    valueAsNumber: true,
                  })}
                  className="border p-2 w-full rounded"
                />
              </label>
              <small className="form-answer-tip">Beloppet skrivs enbart med siffror och läggs till på den totala kostnaden.</small>
            </div>
            <div>
            </div>
          </div>
          <div>
            {/* GDPR Checkbox */}
            <label className="form-answer-alternative">
              <input
                type="checkbox"
                {...register("gdpr", { required: "Du måste godkänna GDPR-policyn" })}
              />
              <span>Jag godkänner att Helsingkrona nation sparar mina uppgifter i enlighet med GDPR *</span>
            </label>
            {errors.gdpr && <p className="text-red-500">{errors.gdpr.message}</p>}
          </div>

          {/* Submit */}
          <button type="submit" className="bg-primaryBlue text-white py-2 px-4 rounded hover:bg-blue-600">
            Skicka anmälan
          </button>
        </form >
      </div >
    </main>
  );
}