"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { useActionState, useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { submitCateringForm } from "@/lib/actions/catering";
import {
	type CateringFormData,
	cateringEventTypes,
	cateringFormSchema,
	cateringServiceTypes,
} from "@/lib/validations/catering";

type FormStatus = {
	type: "success" | "error" | null;
	message: string;
};

async function formAction(
	_prevState: FormStatus | null,
	formData: FormData,
): Promise<FormStatus> {
	try {
		const data = Object.fromEntries(formData.entries()) as CateringFormData;
		const result = await submitCateringForm(data);

		if (result.success) {
			return { type: "success", message: "success" };
		}
		return { type: "error", message: result.error || "error" };
	} catch (error) {
		return {
			type: "error",
			message: error instanceof Error ? error.message : "error",
		};
	}
}

/**
 * Catering request form.
 *
 * A detailed, accessible form that gathers everything the café needs to quote a
 * catering job: contact details, event particulars, service style, menu and
 * dietary preferences, budget and any extras. Uses React Hook Form with Zod for
 * client-side validation and a server action for submission.
 *
 * @returns The catering request form React component
 */
export function CateringForm() {
	const t = useTranslations("catering.form");
	const [state, formActionWithState] = useActionState(formAction, null);
	const [isPending, startTransition] = useTransition();

	const form = useForm<CateringFormData>({
		resolver: zodResolver(cateringFormSchema),
		defaultValues: {
			name: "",
			email: "",
			phone: "",
			company: "",
			eventType: undefined,
			eventDate: "",
			eventTime: "",
			guestCount: "",
			serviceType: undefined,
			venueAddress: "",
			menuPreferences: "",
			dietaryRequirements: "",
			budget: "",
			additionalServices: "",
			hearAbout: "",
			message: "",
		},
	});

	useEffect(() => {
		if (state?.type === "success") {
			form.reset();
		}
	}, [state, form]);

	async function onSubmit(data: CateringFormData) {
		const formData = new FormData();
		for (const [key, value] of Object.entries(data)) {
			formData.append(key, value ?? "");
		}
		startTransition(() => {
			formActionWithState(formData);
		});
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				{/* Your details */}
				<fieldset className="space-y-6">
					<legend className="text-lg font-semibold text-primary">
						{t("sections.contact")}
					</legend>
					<div className="grid gap-6 sm:grid-cols-2">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("name")}</FormLabel>
									<FormControl>
										<Input placeholder={t("namePlaceholder")} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="company"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("company")}</FormLabel>
									<FormControl>
										<Input placeholder={t("companyPlaceholder")} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("email")}</FormLabel>
									<FormControl>
										<Input
											type="email"
											placeholder={t("emailPlaceholder")}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="phone"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("phone")}</FormLabel>
									<FormControl>
										<Input
											type="tel"
											placeholder={t("phonePlaceholder")}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</fieldset>

				{/* Event details */}
				<fieldset className="space-y-6">
					<legend className="text-lg font-semibold text-primary">
						{t("sections.event")}
					</legend>
					<div className="grid gap-6 sm:grid-cols-2">
						<FormField
							control={form.control}
							name="eventType"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("eventType")}</FormLabel>
									<FormControl>
										<Select {...field} value={field.value ?? ""}>
											<option value="" disabled>
												{t("selectPlaceholder")}
											</option>
											{cateringEventTypes.map((type) => (
												<option key={type} value={type}>
													{t(`eventTypes.${type}`)}
												</option>
											))}
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="guestCount"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("guestCount")}</FormLabel>
									<FormControl>
										<Input
											type="number"
											min={1}
											inputMode="numeric"
											placeholder={t("guestCountPlaceholder")}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="eventDate"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("eventDate")}</FormLabel>
									<FormControl>
										<Input type="date" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="eventTime"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("eventTime")}</FormLabel>
									<FormControl>
										<Input type="time" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="serviceType"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("serviceType")}</FormLabel>
									<FormControl>
										<Select {...field} value={field.value ?? ""}>
											<option value="" disabled>
												{t("selectPlaceholder")}
											</option>
											{cateringServiceTypes.map((type) => (
												<option key={type} value={type}>
													{t(`serviceTypes.${type}`)}
												</option>
											))}
										</Select>
									</FormControl>
									<FormDescription>
										{t("serviceTypeDescription")}
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="venueAddress"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("venueAddress")}</FormLabel>
									<FormControl>
										<Input
											placeholder={t("venueAddressPlaceholder")}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</fieldset>

				{/* Food & preferences */}
				<fieldset className="space-y-6">
					<legend className="text-lg font-semibold text-primary">
						{t("sections.food")}
					</legend>
					<FormField
						control={form.control}
						name="menuPreferences"
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t("menuPreferences")}</FormLabel>
								<FormControl>
									<Textarea
										placeholder={t("menuPreferencesPlaceholder")}
										className="min-h-[100px]"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="dietaryRequirements"
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t("dietaryRequirements")}</FormLabel>
								<FormControl>
									<Textarea
										placeholder={t("dietaryRequirementsPlaceholder")}
										className="min-h-[80px]"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="additionalServices"
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t("additionalServices")}</FormLabel>
								<FormControl>
									<Textarea
										placeholder={t("additionalServicesPlaceholder")}
										className="min-h-[80px]"
										{...field}
									/>
								</FormControl>
								<FormDescription>
									{t("additionalServicesDescription")}
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
				</fieldset>

				{/* Extra details */}
				<fieldset className="space-y-6">
					<legend className="text-lg font-semibold text-primary">
						{t("sections.extra")}
					</legend>
					<div className="grid gap-6 sm:grid-cols-2">
						<FormField
							control={form.control}
							name="budget"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("budget")}</FormLabel>
									<FormControl>
										<Input placeholder={t("budgetPlaceholder")} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="hearAbout"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("hearAbout")}</FormLabel>
									<FormControl>
										<Input placeholder={t("hearAboutPlaceholder")} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormField
						control={form.control}
						name="message"
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t("message")}</FormLabel>
								<FormControl>
									<Textarea
										placeholder={t("messagePlaceholder")}
										className="min-h-[120px]"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</fieldset>

				{state?.type && (
					<Alert
						variant={state.type === "error" ? "destructive" : "default"}
						role="alert"
						aria-live={state.type === "error" ? "assertive" : "polite"}
					>
						{state.type === "success" ? (
							<CheckCircle2 className="h-4 w-4" aria-hidden="true" />
						) : (
							<AlertCircle className="h-4 w-4" aria-hidden="true" />
						)}
						<AlertDescription>
							{state.message === "success" || state.message === "error"
								? t(state.message as "success" | "error")
								: state.message}
						</AlertDescription>
					</Alert>
				)}

				<Button
					type="submit"
					disabled={isPending}
					className="w-full"
					aria-label={isPending ? t("sendingAriaLabel") : t("sendAriaLabel")}
				>
					{isPending ? (
						<>
							<Loader2
								className="mr-2 h-4 w-4 animate-spin"
								aria-hidden="true"
							/>
							{t("sending")}
						</>
					) : (
						<>
							<Send className="mr-2 h-4 w-4" aria-hidden="true" />
							{t("submit")}
						</>
					)}
				</Button>
			</form>
		</Form>
	);
}
