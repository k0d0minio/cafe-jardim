import { z } from "zod";

/**
 * Allowed event types for a private space hire request.
 * @public
 */
export const eventHireTypes = [
	"birthday",
	"wedding",
	"corporate",
	"privateParty",
	"exhibition",
	"workshop",
	"filmingPhotoshoot",
	"other",
] as const;

/**
 * Which part of the venue the guest wishes to hire.
 * @public
 */
export const eventHireSpaces = [
	"wholeVenue",
	"gallery",
	"gardenTerrace",
	"partialArea",
] as const;

/**
 * Catering requirements for the hired event.
 * @public
 */
export const eventHireCateringOptions = [
	"inHouseFull",
	"drinksOnly",
	"external",
	"none",
] as const;

/**
 * Validation schema for the private event space hire form.
 *
 * All values are strings so the schema matches the `FormData` flow used by the
 * server action. Optional fields are normalised to empty strings by the client.
 * @public
 */
export const eventHireFormSchema = z.object({
	name: z.string().min(2, "Please enter your name"),
	email: z.string().email("Please enter a valid email address"),
	phone: z.string().min(6, "Please enter a contact phone number"),
	company: z.string().optional(),
	eventType: z.enum(eventHireTypes, {
		errorMap: () => ({ message: "Please select an event type" }),
	}),
	preferredDate: z.string().min(1, "Please choose a preferred date"),
	alternativeDate: z.string().optional(),
	startTime: z.string().optional(),
	endTime: z.string().optional(),
	guestCount: z
		.string()
		.min(1, "Please tell us how many guests")
		.regex(/^\d+$/, "Please enter a valid number of guests"),
	space: z.enum(eventHireSpaces, {
		errorMap: () => ({ message: "Please select which space you'd like" }),
	}),
	exclusiveHire: z.string().optional(),
	catering: z.enum(eventHireCateringOptions, {
		errorMap: () => ({ message: "Please select your catering needs" }),
	}),
	requirements: z.string().optional(),
	budget: z.string().optional(),
	hearAbout: z.string().optional(),
	message: z.string().optional(),
});

/**
 * Inferred type for validated event hire form data.
 * @public
 */
export type EventHireFormData = z.infer<typeof eventHireFormSchema>;
