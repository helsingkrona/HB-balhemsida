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
          fields: ["first_name", "last_name", "email", "title"],
        },
        {
          groupName: "Adress",
          fields: ["address", "postal_code", "city"],
        },
      ],
    },
    {
      sectionName: "Evenemang",
      groups: [
        {
          groupName: "Middagar",
          fields: ["friday_dinner", "saturday_dinner"],
        },
        {
          groupName: "Övriga aktiviteter",
          fields: ["alumni_drink", "sexa", "brunch"],
        },
      ],
    },
    {
      sectionName: "Preferenser",
      fields: [
        "food_preference",
        "saturday_drink_preference",
        "companion",
        "group",
      ],
    },
    {
      sectionName: "Tillval",
      fields: [
        "extra_snaps_tickets",
        "baler",
        "medal",
        "nation_pin",
        "donation",
      ],
    },
    {
      sectionName: "Övrigt",
      fields: ["relationship_to_nation", "gdpr", "is_paying_guest"],
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
      type: "select",
      options: ["Aktiv", "Äldre", "Vän till nationen", "Annan"],
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
      ],
      required: false,
    },
    companion: {
      label: "Sällskap",
      type: "text",
      required: false,
      tip: "Namn på eventuell bordskamrat",
    },
    group: {
      label: "Grupp",
      type: "text",
      required: false,
      tip: "Om ni är flera som vill sitta tillsammans",
    },
    baler: {
      label: "Baler",
      type: "select",
      options: ["0", "1", "2", "3", "4", "5"],
      required: false,
      tip: "Antal baler (150 kr/st)",
    },
    extra_snaps_tickets: {
      label: "Extra snapskvitto",
      type: "select",
      options: ["0", "1", "2", "3"],
      required: false,
      tip: "Antal extra snapskvitton (120 kr/st)",
    },
    friday_dinner: {
      label: "Fredagsmiddag",
      type: "checkbox",
      required: false,
    },
    saturday_dinner: {
      label: "Lördagsmiddag",
      type: "checkbox",
      required: false,
    },
    alumni_drink: {
      label: "Alumnidrink",
      type: "checkbox",
      required: false,
    },
    saturday_drink_preference: {
      label: "Dryckesval lördag",
      type: "select",
      options: ["Alkoholhaltig", "Alkoholfri"],
      required: false,
    },
    sexa: {
      label: "Sexa efter middagen",
      type: "checkbox",
      required: false,
    },
    brunch: {
      label: "Brunch på söndag",
      type: "checkbox",
      required: false,
    },
    medal: {
      label: "Medalj",
      type: "checkbox",
      required: false,
      tip: "250 kr",
    },
    nation_pin: {
      label: "Nationsnål",
      type: "checkbox",
      required: false,
      tip: "100 kr",
    },
    donation: {
      label: "Donation",
      type: "select",
      options: [
        "0 kr",
        "100 kr",
        "200 kr",
        "500 kr",
        "1000 kr",
        "Annat belopp",
      ],
      required: false,
    },
    gdpr: {
      label: "Jag godkänner hantering av personuppgifter",
      type: "checkbox",
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

  const renderField = (fieldName: string) => {
    const config: FieldConfig = fieldConfig[fieldName] || {
      ...defaultConfig,
      label: formatLabel(fieldName),
    };

    switch (config.type) {
      case "select":
        return (
          <motion.div
            key={fieldName}
            className="form-question"
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
            className="form-question"
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

      default:
        return (
          <motion.div
            key={fieldName}
            className="form-question"
            variants={itemVariants}
          >
            <label className="form-label">{config.label}</label>
            <input
              type={config.type}
              {...register(fieldName as keyof SignUpFormData, {
                required: config.required && `${config.label} är obligatoriskt`,
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
          {group.fields.map((fieldName) => renderField(fieldName))}
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
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
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
                {section.fields?.map((fieldName) => renderField(fieldName))}
              </div>
            )}
          </motion.div>
        ))}

        <motion.button
          type="submit"
          disabled={isSubmitting}
          className={`bg-blue-500 text-white py-2 px-4 rounded ${
            isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-600"
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
    </motion.div>
  );
}
