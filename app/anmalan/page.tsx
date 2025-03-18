"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import BookOpeningOverlay from "@/components/BookOpeningOverlay";
import { SignUpFormData } from "@/google_sheets/helper";
import { motion } from "framer-motion";
import Image from "next/image";

export default function BookOpeningAnimation() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Define your form structure with nested groups
  const formStructure = [
    {
      sectionName: "Personuppgifter",
      groups: [
        {
          groupName: "Kontaktinformation",
          fields: ["first_name", "last_name", "title", "email",],
        },
        {
          groupName: "Adress",
          fields: ["address", "postal_code", "city"],
        },
      ],
    },
    {
      sectionName: "Fredag",
      groups: [
        {
          groupName: "Sittning",
          fields: ["friday_dinner"],
        },
      ],
    },
    {
      sectionName: "Lördag",
      groups: [
        {
          groupName: "Bal",
          fields: ["saturday_dinner"],
        },
        {
          groupName: "Preferenser",
          fields: [
            "food_preference",
            "saturday_drink_preference",
            "companion",
            "group",
            "grade",
          ],
        },
        {
          groupName: "Tillval",
          fields: [
            "alumni_drink",
            "sexa",
            "extra_snaps_tickets",
            "baler",
            "medal",
            "nation_pin",
          ],
        },
      ],
    },
    {
      sectionName: "Söndag",
      groups: [
        {
          groupName: "Brunch",
          fields: ["brunch"],
        },
      ],
    },
    {
      sectionName: "Övrigt",
      fields: ["relationship_to_nation", "gdpr", "donation"],
    },
  ];

  // Field configuration
  const fieldConfig: {
    [key: string]: {
      label: string;
      type: string;
      required: boolean;
      options?: string[];
      tip?: string;
      min?: number;
    };
  } = {
    first_name: { label: "Förnamn", type: "text", required: true },
    last_name: { label: "Efternamn", type: "text", required: true },
    email: {
      label: "E-post",
      type: "email",
      required: true,
      tip: "Vi använder denna för att kontakta dig",
    },
    title: { label: "Titel", type: "text", required: false },
    address: { label: "Gatuadress", type: "text", required: true },
    postal_code: {
      label: "Postnummer",
      type: "text",
      required: true,
      tip: "Skriv utan mellanslag",
    },
    city: { label: "Ort", type: "text", required: true },
    relationship_to_nation: {
      label: "Relation till nationen",
      type: "text",
      required: true,
    },
    food_preference: {
      label: "Matpreferenser",
      type: "select",
      options: [
        "Ingen särskild",
        "Vegetarisk",
        "Vegansk",
        "Glutenfri",
        "Laktosfri",
        "Annan",
      ],
      required: false,
    },
    companion: {
      label: "Respektive",
      type: "text",
      required: false,
      tip: "Namn på eventuell bordskamrat",
    },
    group: {
      label: "Sällskap",
      type: "text",
      required: false,
      tip: "Om ni är flera som vill sitta tillsammans",
    },
    baler: {
      label: "Baler",
      type: "number",
      required: false,
      tip: "Antal baler",
      min: 0,
    },
    extra_snaps_tickets: {
      label: "Extra snapskvitto",
      type: "select",
      options: ["0", "1", "2", "3"],
      required: false,
      tip: "Antal extra snapskvitton (40 kr/st)",
    },
    friday_dinner: {
      label: "Vill du gå på Snörsjöasittningen?",
      type: "radio",
      options: ["Ja", "Nej"],
      required: false,
    },
    saturday_dinner: {
      label: "Prisgrupp",
      type: "radio",
      options: ["Student", "Icke-student"],
      required: true,
    },
    grade: {
      label: "Grad - Den du uppnår denna bal",
      type: "select",
      options: [
        "5:e Ståndet Torvvändare (1:a balen)",
        "4:e Ståndet Stigfinnare (2:a balen)",
        "3:e Ståndet Flottare (3:e balen)",
        "2:e Ståndet Rallare (4:e balen)",
        "1:a Ståndet Jägare (5:e balen)",
        "Trädplanterare",
        "Äldre",
      ],
      required: true,
    },
    alumni_drink: {
      label: "Alumnidrink",
      type: "checkbox",
      required: false,
    },
    saturday_drink_preference: {
      label: "Dryckesval lördag",
      type: "select",
      options: ["Öl", "Alkoholfri Öl", "Cider", "Alkoholfri Cider"],
      required: true,
    },
    sexa: {
      label: "Sexa efter middagen",
      type: "checkbox",
      required: false,
    },
    brunch: {
      label: "Vill du gå på brunchen på söndag?",
      type: "radio",
      options: ["Ja", "Nej"],
      required: false,
    },
    medal: {
      label: "Medalj",
      type: "checkbox",
      required: false,
      tip: "250 kr",
    },
    nation_pin: {
      label: "Helsingkrona-pin",
      type: "checkbox",
      required: false,
      tip: "100 kr",
    },
    donation: {
      label: "Donation (minst 250kr)",
      type: "text",
      required: false,
      min: 250,
      tip: "Frivillig summa för att stödja nationen",
    },
    gdpr: {
      label: "Jag godkänner hantering av personuppgifter",
      type: "radio",
      options: ["Ja"],
      required: true,
    },
    is_paying_guest: {
      label: "Betalande gäst",
      type: "checkbox",
      required: false,
    },
  };

  const defaultConfig = { type: "text", required: false };

  const formatLabel = (name: string): string => {
    if (fieldConfig[name]?.label) return fieldConfig[name].label;
    return name
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Animation variants for form elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const onSubmit = async (data: SignUpFormData) => {
    try {
      setSubmitError(null);

      // Here you would implement the logic to submit to Google Sheets
      // For example:
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(
          "Det uppstod ett problem vid inskickning av formuläret"
        );
      }

      setIsSubmitted(true);
      // You might want to reset the form or redirect here
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitError(
        error instanceof Error ? error.message : "Ett okänt fel uppstod"
      );
    }
  };

  interface FieldConfig {
    label: string;
    type: string;
    required: boolean;
    options?: string[];
    tip?: string;
    min?: number;
  }

  interface Group {
    groupName: string;
    fields: string[];
  }

  interface Section {
    sectionName: string;
    groups?: Group[];
    fields?: string[];
  }

  const renderField = (fieldName: string, isSingleField: boolean) => {
    const config: FieldConfig = fieldConfig[fieldName] || {
      ...defaultConfig,
      label: formatLabel(fieldName),
    };

    switch (config.type) {
      case "select":
        return (
          <motion.div
            key={fieldName}
            className={`form-question ${
              isSingleField ? "form-full-width" : ""
            }`}
            variants={itemVariants}
          >
            <label className="form-label">{config.label}</label>
            <select
              {...register(fieldName as keyof SignUpFormData, {
                required: config.required && `${config.label} är obligatoriskt`,
              })}
              className="border p-2 w-full rounded"
            >
              <option value="">Välj {config.label.toLowerCase()}</option>
              {config.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors[fieldName as keyof SignUpFormData] && (
              <p className="text-red-500">
                {String(errors[fieldName as keyof SignUpFormData]?.message)}
              </p>
            )}
            {config.tip && <p className="form-answer-tip">{config.tip}</p>}
          </motion.div>
        );

      case "checkbox":
        return (
          <motion.div
            key={fieldName}
            className={`form-question ${
              isSingleField ? "form-full-width" : ""
            }`}
            variants={itemVariants}
          >
            <div className="form-answer-alternative">
              <input
                type="checkbox"
                {...register(fieldName as keyof SignUpFormData, {
                  required:
                    config.required && `${config.label} måste accepteras`,
                })}
                className="h-4 w-4"
              />
              <label className="form-label">{config.label}</label>
            </div>
            {errors[fieldName as keyof SignUpFormData] && (
              <p className="text-red-500">
                {String(errors[fieldName as keyof SignUpFormData]?.message)}
              </p>
            )}
            {config.tip && <p className="form-answer-tip">{config.tip}</p>}
          </motion.div>
        );
      case "radio":
        return (
          <motion.div
            key={fieldName}
            className={`form-question ${
              isSingleField ? "form-full-width" : ""
            }`}
            variants={itemVariants}
          >
            <label className="form-label">{config.label}</label>
            <div className="flex space-x-2">
              {config.options?.map((option) => (
                <div key={option} className="form-answer-alternative">
                  <input
                    type="radio"
                    value={option}
                    {...register(fieldName as keyof SignUpFormData, {
                      required:
                        config.required && `${config.label} är obligatoriskt`,
                    })}
                    className="h-4 w-4"
                  />
                  <label className="form-label">{option}</label>
                </div>
              ))}
            </div>
            {errors[fieldName as keyof SignUpFormData] && (
              <p className="text-red-500">
                {String(errors[fieldName as keyof SignUpFormData]?.message)}
              </p>
            )}
            {config.tip && <p className="form-answer-tip">{config.tip}</p>}
          </motion.div>
        );

      default:
        return (
          <motion.div
            key={fieldName}
            className={`form-question ${
              isSingleField ? "form-full-width" : ""
            }`}
            variants={itemVariants}
          >
            <label className="form-label">{config.label}</label>
            <input
              type={config.type}
              {...register(fieldName as keyof SignUpFormData, {
                required: config.required && `${config.label} är obligatoriskt`,
                min: config.min !== undefined ? config.min : undefined,
                validate: (value) => {
                  if (config.min !== undefined && Number(value) < config.min) {
                    return `${config.label} måste vara större än eller lika med ${config.min}`;
                  }
                  return true;
                },
              })}
              className="border p-2 w-full rounded"
            />
            {errors[fieldName as keyof SignUpFormData] && (
              <p className="text-red-500">
                {String(errors[fieldName as keyof SignUpFormData]?.message)}
              </p>
            )}
            {config.tip && <p className="form-answer-tip">{config.tip}</p>}
          </motion.div>
        );
    }
  };

  // Render a group of fields
  interface GroupProps {
    group: Group;
  }

  const renderGroup = ({ group }: GroupProps) => {
    const isSingleField = group.fields.length === 1;
    return (
      <motion.div
        key={group.groupName}
        className="mb-4"
        variants={itemVariants}
      >
        {group.groupName && (
          <h4 className="font-semibold text-sm text-gray-600 mb-2">
            {group.groupName}
          </h4>
        )}
        <div className="form-answer-box">
          {group.fields.map((fieldName) =>
            renderField(fieldName, isSingleField)
          )}
        </div>
      </motion.div>
    );
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-10">
        <BookOpeningOverlay
          onAnimationComplete={() => {
            /* handle animation complete */
          }}
        />
        <h2 className="text-2xl font-bold mb-4">Tack för din anmälan!</h2>
        <p className="mb-6">
          Vi har tagit emot din anmälan och återkommer med bekräftelse.
        </p>
        <Image
          src="/images/confirmation.png"
          alt="Bekräftelse"
          width={300}
          height={200}
          className="mx-auto"
        />
      </div>
    );
  }

  return (
    <div className="form-container">
      <div className="form-wrapper">
        {submitError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {submitError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {formStructure.map((section) => (
            <motion.div
              key={section.sectionName}
              className="form-group p-4"
              variants={itemVariants}
            >
              <h3 className="form-section">{section.sectionName}</h3>

              {section.groups ? (
                // Render nested groups if they exist
                section.groups.map((group) => renderGroup({ group }))
              ) : (
                // Otherwise render fields directly
                <div className="form-answer-box">
                  {section.fields?.map((fieldName) =>
                    renderField(fieldName, section.fields.length === 1)
                  )}
                </div>
              )}
            </motion.div>
          ))}

          <motion.button
            type="submit"
            disabled={isSubmitting}
            className={`bg-blue-500 text-white py-2 px-4 rounded ${
              isSubmitting
                ? "opacity-70 cursor-not-allowed"
                : "hover:bg-blue-600"
            }`}
            variants={itemVariants}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Skickar...
              </span>
            ) : (
              "Skicka anmälan"
            )}
          </motion.button>
        </form>
      </div>
    </div>
  );
}
