import { headers } from "next/headers";
import { collectErrorContext } from "@/lib/errors/reporter";
import { getLinearErrorReporter } from "@/lib/linear/errors";

/**
 * Report an error from a server action to Linear (non-blocking, production only).
 *
 * Collects request context from the incoming headers and forwards the error to
 * the Linear reporter. Any failure while reporting is swallowed and logged so it
 * never masks the original error path. This is a no-op outside production.
 *
 * @param error - The error (or unknown thrown value) to report
 * @param additionalData - Extra structured data to attach to the report
 * @internal
 */
export async function reportActionError(
	error: unknown,
	additionalData?: Record<string, unknown>,
): Promise<void> {
	if (process.env.NODE_ENV !== "production") {
		return;
	}

	try {
		const headersList = await headers();
		const url =
			headersList.get("referer") || headersList.get("x-url") || undefined;
		const userAgent = headersList.get("user-agent") || undefined;

		const context = collectErrorContext(
			error instanceof Error ? error : new Error(String(error)),
			{
				url,
				userAgent,
				requestMethod: "POST",
				additionalData,
			},
		);

		const reporter = getLinearErrorReporter();
		reporter.reportError(context).catch((reportError) => {
			console.error("Failed to report error to Linear:", reportError);
		});
	} catch (reportError) {
		console.error("Failed to collect error context:", reportError);
	}
}
