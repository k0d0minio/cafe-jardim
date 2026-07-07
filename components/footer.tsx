"use client";

import {
	Facebook,
	Github,
	Instagram,
	Linkedin,
	Mail,
	MapPin,
	Phone,
	Twitter,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Logo } from "@/components/logo";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/i18n/routing";

const businessName = process.env.NEXT_PUBLIC_BUSINESS_NAME || "Jardim";
const siteDescription =
	process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
	"A café and art gallery in São Lourenço — botanical, warm, and always brewing something new.";
const businessEmail = process.env.NEXT_PUBLIC_BUSINESS_EMAIL || "";
const businessPhone = process.env.NEXT_PUBLIC_BUSINESS_PHONE || "";
const businessAddress = process.env.NEXT_PUBLIC_BUSINESS_ADDRESS || "";

const socialLinks = [
	{
		url: process.env.NEXT_PUBLIC_SOCIAL_TWITTER,
		icon: Twitter,
		label: "Twitter",
	},
	{
		url: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN,
		icon: Linkedin,
		label: "LinkedIn",
	},
	{ url: process.env.NEXT_PUBLIC_SOCIAL_GITHUB, icon: Github, label: "GitHub" },
	{
		url: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK,
		icon: Facebook,
		label: "Facebook",
	},
	{
		url: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM,
		icon: Instagram,
		label: "Instagram",
	},
].filter((link) => link.url);

export function Footer() {
	const t = useTranslations("footer");
	const currentYear = new Date().getFullYear();

	const footerLinks = {
		cafe: [
			{ href: "/#menu", label: t("menu") },
			{ href: "/#gallery", label: t("about") },
			{ href: "/#hours", label: t("hours") },
		],
		information: [
			{ href: "/#reviews", label: t("about") },
			{ href: "/#contact", label: t("location") },
			{ href: "/#contact", label: t("contact") },
		],
		legal: [
			{ href: "/privacy", label: t("privacy") },
			{ href: "/terms", label: t("terms") },
			{ href: "/cookies", label: t("cookies") },
		],
	};

	return (
		<footer className="bg-primary text-brand-cream">
			<div className="container px-4 py-14 md:py-16">
				<div className="grid grid-cols-1 gap-10 md:grid-cols-4">
					{/* Brand */}
					<div className="space-y-4">
						<Logo variant="white" height={40} className="mix-blend-screen" />
						<p className="text-sm text-brand-cream/70">{siteDescription}</p>
						{(businessEmail || businessPhone || businessAddress) && (
							<div className="space-y-2 text-sm text-brand-cream/80">
								{businessEmail && (
									<div className="flex items-center gap-2">
										<Mail className="h-4 w-4" aria-hidden="true" />
										<a
											href={`mailto:${businessEmail}`}
											className="text-brand-cream/80 hover:text-brand-cream transition-colors"
											aria-label={`Email us at ${businessEmail}`}
										>
											{businessEmail}
										</a>
									</div>
								)}
								{businessPhone && (
									<div className="flex items-center gap-2">
										<Phone className="h-4 w-4" aria-hidden="true" />
										<a
											href={`tel:${businessPhone.replace(/\s/g, "")}`}
											className="text-brand-cream/80 hover:text-brand-cream transition-colors"
											aria-label={`Call us at ${businessPhone}`}
										>
											{businessPhone}
										</a>
									</div>
								)}
								{businessAddress && (
									<div className="flex items-start gap-2">
										<MapPin className="h-4 w-4 mt-0.5" aria-hidden="true" />
										<span>{businessAddress}</span>
									</div>
								)}
							</div>
						)}
					</div>

					{/* Cafe Links */}
					<nav aria-label="Cafe navigation">
						<h4 className="mb-4 text-sm font-semibold text-brand-cream">{t("cafe")}</h4>
						<ul className="space-y-2">
							{footerLinks.cafe.map((link) => (
								<li key={link.href}>
									<Link
										href={link.href}
										className="text-sm text-brand-cream/70 hover:text-brand-cream transition-colors"
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</nav>

					{/* Information Links */}
					<nav aria-label="Information navigation">
						<h4 className="mb-4 text-sm font-semibold text-brand-cream">{t("information")}</h4>
						<ul className="space-y-2">
							{footerLinks.information.map((link) => (
								<li key={link.href}>
									<Link
										href={link.href}
										className="text-sm text-brand-cream/70 hover:text-brand-cream transition-colors"
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</nav>

					{/* Legal Links */}
					<nav aria-label="Legal navigation">
						<h4 className="mb-4 text-sm font-semibold text-brand-cream">{t("legal")}</h4>
						<ul className="space-y-2">
							{footerLinks.legal.map((link) => (
								<li key={link.href}>
									<Link
										href={link.href}
										className="text-sm text-brand-cream/70 hover:text-brand-cream transition-colors"
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</nav>
				</div>

				<Separator className="my-8 bg-brand-cream/15" />

				<div className="flex flex-col items-center justify-between gap-4 md:flex-row">
					<p className="text-sm text-brand-cream/70">
						© {currentYear} {businessName}. {t("allRightsReserved")}
					</p>
					{socialLinks.length > 0 && (
						<div className="flex items-center space-x-4">
							{socialLinks.map(({ url, icon: Icon, label }) => (
								<a
									key={label}
									href={url}
									target="_blank"
									rel="noopener noreferrer"
									className="text-brand-cream/70 hover:text-brand-cream transition-colors"
									aria-label={label}
								>
									<Icon className="h-5 w-5" />
								</a>
							))}
						</div>
					)}
				</div>
			</div>
		</footer>
	);
}
