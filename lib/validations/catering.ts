import { z } from "zod";

/**
 * Allowed event types for a catering request. Values are stable keys that map
 * to translated labels in the message catalogue.
 * @public
 */
export const cateringEventTypes = [
	"birthday",
	"wedding",
	"corporate",
	"privateParty",
	"exhibition",
	"wake",
	"other",
] as const;

/**
 * How the catering should be delivered / served.
 * @public
 */
export const cateringServiceTypes = [
	"delivery",
	"fullService",
	"pickup",
] as const;

/**
 * Validation schema for the catering request form.
 *
 * All values are strings so the schema matches the `FormData` flow used by the
 * server action. Optional fields are normalised to empty strings by the client.
 * @public
 */
export const cateringFormSchema = z.object({
	name: z.string().min(2, "Please enter your name"),
	email: z.string().email("Please enter a valid email address"),
	phone: z.string().min(6, "Please enter a contact phone number"),
	company: z.string().optional(),
	eventType: z.enum(cateringEventTypes, {
		errorMap: () => ({ message: "Please select an event type" }),
	}),
	eventDate: z.string().min(1, "Please choose a date for your event"),
	eventTime: z.string().optional(),
	guestCount: z
		.string()
		.min(1, "Please tell us how many guests")
		.regex(/^\d+$/, "Please enter a valid number of guests"),
	serviceType: z.enum(cateringServiceTypes, {
		errorMap: () => ({ message: "Please select a service type" }),
	}),
	venueAddress: z.string().optional(),
	menuPreferences: z.string().optional(),
	dietaryRequirements: z.string().optional(),
	budget: z.string().optional(),
	additionalServices: z.string().optional(),
	hearAbout: z.string().optional(),
	message: z.string().optional(),
});

/**
 * Inferred type for validated catering form data.
 * @public
 */
export type CateringFormData = z.infer<typeof cateringFormSchema>;
