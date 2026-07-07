import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CateringForm } from "@/components/catering-form";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { createMetadata } from "@/lib/metadata";
import {
	createBreadcrumbListSchema,
	generateStructuredDataScript,
} from "@/lib/seo/structured-data";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "catering" });
	const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
	const siteName =
		process.env.NEXT_PUBLIC_SITE_NAME || "Jardim — Café · Galeria";

	return createMetadata({
		title: `${t("title")} | ${siteName}`,
		description: t("description"),
		openGraph: {
			title: `${t("title")} | ${siteName}`,
			description: t("description"),
			url: `${siteUrl}/${locale}/catering`,
		},
		twitter: {
			title: `${t("title")} | ${siteName}`,
			description: t("description"),
		},
	});
}

export default async function CateringPage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const t = await getTranslations();
	const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

	const breadcrumbSchema = createBreadcrumbListSchema([
		{ name: t("common.home"), url: `${siteUrl}/${locale}` },
		{ name: t("catering.breadcrumb"), url: `${siteUrl}/${locale}/catering` },
	]);

	const breadcrumbData = generateStructuredDataScript([breadcrumbSchema]);

	return (
		<>
			<script
				id="breadcrumb-structured-data"
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data is safe, controlled content
				dangerouslySetInnerHTML={{ __html: breadcrumbData }}
			/>
			<div className="flex min-h-screen flex-col">
				<Header />
				<main id="main-content" className="flex-1">
					<section className="py-16 md:py-24">
						<div className="container px-4">
							<div className="mx-auto max-w-2xl text-center">
								<span className="eyebrow">{t("catering.eyebrow")}</span>
								<h1 className="mt-5 text-3xl font-semibold tracking-tight text-primary sm:text-4xl md:text-5xl">
									{t("catering.title")}
								</h1>
								<p className="mt-4 text-lg text-muted-foreground">
									{t("catering.description")}
								</p>
							</div>
							<div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-primary/10 bg-card p-6 shadow-sm md:p-10">
								<CateringForm />
							</div>
						</div>
					</section>
				</main>
				<Footer />
			</div>
		</>
	);
}
