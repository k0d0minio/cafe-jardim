"use client";

import { useTranslations } from "next-intl";
import { ContactForm } from "@/components/contact-form";

export function ContactSection() {
	const t = useTranslations("contact");

	return (
		<section id="contact" className="py-20 md:py-32">
			<div className="container px-4">
				<div className="mx-auto max-w-2xl text-center">
					<span className="eyebrow">{t("eyebrow")}</span>
					<h2 className="mt-5 text-3xl font-semibold tracking-tight text-primary sm:text-4xl md:text-5xl">
						{t("title")}
					</h2>
					<p className="mt-4 text-lg text-muted-foreground">
						{t("description")}
					</p>
				</div>
				<div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-primary/10 bg-card p-6 shadow-sm md:p-8">
					<ContactForm />
				</div>
			</div>
		</section>
	);
}
