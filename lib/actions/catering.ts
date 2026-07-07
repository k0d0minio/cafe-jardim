"use server";

import { Resend } from "resend";
import { reportActionError } from "@/lib/actions/report-error";
import {
	type CateringFormData,
	cateringFormSchema,
} from "@/lib/validations/catering";

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Result type for catering form submission actions.
 * @public
 */
export type CateringActionResult =
	| { success: true; message: string; id?: string }
	| { success: false; error: string };

/**
 * Escape a value for safe interpolation into an HTML email body.
 * @internal
 */
function escapeHtml(value: string): string {
	return value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;");
}

/**
 * Server Action to handle catering request submissions.
 *
 * Validates the form data, emails the request to the café via Resend, and
 * reports failures to Linear in production. Designed to be called from client
 * components using React Server Actions.
 *
 * @param data - The catering request data to submit
 * @returns A promise resolving to a {@link CateringActionResult}
 */
export async function submitCateringForm(
	data: CateringFormData,
): Promise<CateringActionResult> {
	try {
		const validationResult = cateringFormSchema.safeParse(data);

		if (!validationResult.success) {
			return { success: false, error: "Invalid form data" };
		}

		const v = validationResult.data;

		if (!process.env.RESEND_API_KEY) {
			console.error("RESEND_API_KEY is not configured");
			await reportActionError(new Error("RESEND_API_KEY is not configured"), {
				form: "catering",
				formData: { name: v.name, email: v.email },
			});
			return { success: false, error: "Email service is not configured" };
		}

		const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
		const toEmail = process.env.RESEND_TO_EMAIL || "delivered@resend.dev";

		// Rows are only rendered when the underlying value is present, so the
		// email stays concise regardless of which optional fields were filled in.
		const rows: Array<[string, string | undefined]> = [
			["Name", v.name],
			["Email", v.email],
			["Phone", v.phone],
			["Company / Organisation", v.company],
			["Event type", v.eventType],
			["Event date", v.eventDate],
			["Event time", v.eventTime],
			["Number of guests", v.guestCount],
			["Service type", v.serviceType],
			["Venue / delivery address", v.venueAddress],
			["Menu preferences", v.menuPreferences],
			["Dietary requirements", v.dietaryRequirements],
			["Budget", v.budget],
			["Additional services", v.additionalServices],
			["How they heard about us", v.hearAbout],
			["Additional details", v.message],
		];

		const htmlRows = rows
			.filter(([, value]) => value && value.trim().length > 0)
			.map(
				([label, value]) =>
					`<tr><td style="padding:6px 12px;font-weight:600;vertical-align:top;white-space:nowrap;">${escapeHtml(
						label,
					)}</td><td style="padding:6px 12px;">${escapeHtml(
						value as string,
					).replace(/\n/g, "<br>")}</td></tr>`,
			)
			.join("");

		const textBody = rows
			.filter(([, value]) => value && value.trim().length > 0)
			.map(([label, value]) => `${label}: ${value}`)
			.join("\n");

		const { data: emailData, error } = await resend.emails.send({
			from: fromEmail,
			to: toEmail,
			replyTo: v.email,
			subject: `Catering Request from ${v.name} — ${v.eventType} (${v.guestCount} guests)`,
			html: `
        <h2>New Catering Request</h2>
        <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
          ${htmlRows}
        </table>
      `,
			text: `New Catering Request\n\n${textBody}`,
		});

		if (error) {
			console.error("Resend error:", error);
			await reportActionError(
				new Error(`Resend API error: ${JSON.stringify(error)}`),
				{
					form: "catering",
					resendError: error,
					formData: { name: v.name, email: v.email },
				},
			);
			return { success: false, error: "Failed to send request" };
		}

		return {
			success: true,
			message: "Request sent successfully",
			id: emailData?.id,
		};
	} catch (error) {
		console.error("Unexpected error in submitCateringForm:", error);
		await reportActionError(error, { form: "catering", formData: data });
		return {
			success: false,
			error: "An unexpected error occurred. Our team has been notified.",
		};
	}
}
